// app/api/sendCode/route.ts

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Initialize Redis client
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(redisUrl);
// Function to generate a 6-digit random code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send the verification code
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const verificationCode = generateCode();

    // Store the code in Redis with a 10-minute expiration (600 seconds)
    await redis.setex(`verification:${email}`, 600, verificationCode);

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the code to the user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${verificationCode}. It will expire in 10 minutes.`,
    });

    return NextResponse.json({
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return NextResponse.json(
      { message: "Failed to send verification code." },
      { status: 500 }
    );
  }
}
