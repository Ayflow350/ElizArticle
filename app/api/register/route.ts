import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer"; // Ensure you have nodemailer installed

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  let role: Role = Role.USER;
  if (email === "admin@example.com") {
    role = Role.ADMIN;
  }

  // Generate a unique email verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Create a new user in the database with the verification token
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      role,
      emailVerificationToken: verificationToken,
    },
  });

  console.log("User created:", user);

  // Send verification email with the token
  const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const emailContent = `
    <p>Hello ${name},</p>
    <p>Please click the link below to verify your email address:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: emailContent,
  });

  return NextResponse.json(user);
}
