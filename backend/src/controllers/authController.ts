import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

// Endpoint logic for api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      console.error("authController: All fields are required.");
      return res.status(404).json({ message: "All fields are required" });
    }

    // Checks if a user with the username exists.
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.error("authController: Username is already taken");
      return res
        .status(400)
        .json({ message: "Username has already been taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Save the new user into the mongoDB database.
    const newUser = await user.save();

    // Return a 201 HTTP Response (201:  Created)
    res.status(201).json(newUser);
    console.log("User \'", newUser.username, "\' has been registered");
  } catch (error) {
    console.error("authController: Failed to register", error);
    return res.status(500).json({ message: "Error to register new user." });
  }
};

// Endpoint logic for api/auth/login.
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.error("authController: Email and password are required");
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Checks if the user exists in database.
    const user = await User.findOne({ username });
    if (!user) {
      console.error("authController: User does not exist.");
      return res
        .status(400)
        .json({ message: `User ${username} does not exist.` });
    }

    // Compares to check if the password stored in the database is equivalent to the one entered.
    const isMatch = await bcrypt.compare(password, user.password);
    // If not, return a 400 Bad Request status code.
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessSecretToken = process.env.ACCESS_SECRET_TOKEN;
    const refreshSecretToken = process.env.REFRESH_SECRET_TOKEN;

    // These two will check if the token environment variables were set, otherwise return a 500 Internal Server Error status code.
    if (!accessSecretToken) {
      console.error("ACCESS_SECRET_TOKEN not set in .env");
      return res.status(500).json({ message: "Missing access token" });
    }
    if (!refreshSecretToken) {
      console.error("REFRESH_SECRET_TOKEN not set in .env");
      return res.status(500).json({ message: "Missing refresh token" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      accessSecretToken,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      refreshSecretToken,
      { expiresIn: "7d" },
    );


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("authController: Error logging in user.", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token provided." });
    }

    const refreshSecretToken = process.env.REFRESH_SECRET_TOKEN;

    if (!refreshSecretToken) {
      console.error("REFRESH_SECRET_TOKEN not set in .env");
      return res.status(500).json({ message: "Missing refresh token" });
    }

    const decoded = jwt.verify(token, refreshSecretToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      console.error("authController.ts: User does not exist.");
      return res.status(404).json({ message: "User does not exist." });
    }

    const newAccessToken = jwt.sign(
      { 
        id: user._id, 
        role: user.role 
    },
      refreshSecretToken,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("authController: Error refreshing tokens.", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("authController: Error logging out the user", error);
    return res.status(500).json({ message: "Server error" });
  }
};
