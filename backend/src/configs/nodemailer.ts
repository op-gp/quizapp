import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

export const mailConfig = {
  provider: (process.env.EMAIL_PROVIDER || 'mock').toLowerCase(),
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  from: process.env.SMTP_FROM || '"Quiz Web App" <noreply@quizapp.com>',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  sendgridSender: process.env.SENDGRID_FROM || process.env.SMTP_FROM || '"Quiz Web App" <noreply@quizapp.com>',
};

export const isMailConfigured =
  (mailConfig.provider === 'nodemailer' &&
    !!(mailConfig.host && mailConfig.auth.user && mailConfig.auth.pass)) ||
  (mailConfig.provider === 'sendgrid' && !!mailConfig.sendgridApiKey);

export const mailTransporter =
  mailConfig.provider === 'nodemailer' && isMailConfigured
    ? nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
        auth: mailConfig.auth,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      })
    : null;

if (mailConfig.provider === 'sendgrid' && mailConfig.sendgridApiKey) {
  sgMail.setApiKey(mailConfig.sendgridApiKey);
}

export const verifyEmailTransporter = async (): Promise<void> => {
  if (mailConfig.provider === 'sendgrid') {
    if (!isMailConfigured) {
      throw new Error('SendGrid is enabled but SENDGRID_API_KEY is missing or invalid.');
    }
    return;
  }

  if (mailConfig.provider !== 'nodemailer') {
    return;
  }

  if (!isMailConfigured || !mailTransporter) {
    throw new Error('Nodemailer is enabled but SMTP configuration is missing or invalid.');
  }

  await mailTransporter.verify();
};
