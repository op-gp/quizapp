import { mailConfig, mailTransporter, isMailConfigured } from '../configs/nodemailer.js';
import sgMail from '@sendgrid/mail';

export const sendOTPEmail = async (email: string, otp: string, type: 'VERIFICATION' | '2FA') => {
  const subject = type === 'VERIFICATION' 
    ? 'Verify Your Quiz Web App Account' 
    : 'Your Login Verification Code (2FA)';

  const textContent = type === 'VERIFICATION'
    ? `Thank you for signing up! Your verification code is: ${otp}. This code is valid for 10 minutes.`
    : `Your login verification code is: ${otp}. This code is valid for 10 minutes.`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #2563eb; text-align: center;">Quiz Web App</h2>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 16px; color: #334155;">Hello,</p>
      <p style="font-size: 16px; color: #334155;">
        ${type === 'VERIFICATION' 
          ? 'Thank you for registering! Please use the following One-Time Password (OTP) to verify and activate your account:' 
          : 'Please use the following One-Time Password (OTP) to complete your login attempt (2-Factor Authentication):'}
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; text-align: center; margin: 25px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0f172a; font-family: monospace;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #64748b; text-align: center;">
        This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.
      </p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center;">
        Quiz Web App © ${new Date().getFullYear()}
      </p>
    </div>
  `;

  console.log(`[EMAIL DEBUG] Provider=${mailConfig.provider} to=${email} type=${type}`);

  if (mailConfig.provider === 'sendgrid') {
    if (!isMailConfigured) {
      console.error('[EMAIL CONFIG ERROR] EMAIL_PROVIDER is set to sendgrid but SENDGRID_API_KEY is missing or invalid.');
      throw new Error('SendGrid configuration is incomplete. OTP email cannot be delivered.');
    }

    try {
      await sgMail.send({
        from: mailConfig.sendgridSender,
        to: email,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[EMAIL SENT] OTP ${type} successfully delivered to ${email} via SendGrid`);
      return;
    } catch (error: any) {
      console.error(`[EMAIL ERROR] Failed to send SendGrid email to ${email}:`, error);
      console.error('[SENDGRID RESPONSE BODY]', JSON.stringify(error?.response?.body ?? error?.body ?? error, null, 2));
      throw new Error('Failed to send OTP email via SendGrid.');
    }
  }

  if (mailConfig.provider === 'nodemailer') {
    if (!isMailConfigured || !mailTransporter) {
      console.error('[EMAIL CONFIG ERROR] EMAIL_PROVIDER is set to nodemailer but SMTP configuration is incomplete or invalid. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in Render environment variables.');
      throw new Error('SMTP configuration is incomplete. OTP email cannot be delivered.');
    }

    try {
      await mailTransporter.sendMail({
        from: mailConfig.from,
        to: email,
        subject: subject,
        text: textContent,
        html: htmlContent
      });
      console.log(`[EMAIL SENT] OTP ${type} successfully delivered to ${email}`);
      return;
    } catch (error) {
      console.error(`[EMAIL ERROR] Failed to send email to ${email}:`, error);
      throw new Error('Failed to send OTP email.');
    }
  }

  // Fallback: Console print
  console.log('\n' + '='.repeat(60));
  console.log(`[DEVELOPMENT EMAIL MOCK] SMTP Server details not fully configured or email send failed.`);
  console.log(`[DEVELOPMENT EMAIL MOCK] Simulated Email Sent to: ${email}`);
  console.log(`[DEVELOPMENT EMAIL MOCK] Subject: ${subject}`);
  console.log(`[DEVELOPMENT EMAIL MOCK] OTP CODE: ${otp}`);
  console.log('='.repeat(60) + '\n');
};
