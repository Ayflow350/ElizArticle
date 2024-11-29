import prisma from "@/app/libs/prismadb"; // Adjust the path as necessary
import nodemailer from "nodemailer"; // For sending emails

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ message: "Valid email is required" }),
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "No user found with that email address" }),
        { status: 404 }
      );
    }

    // Generate a six-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiration = new Date(Date.now() + 3600000); // 1 hour from now

    // Update the user's reset code and expiration in the database
    await prisma.user.update({
      where: { email },
      data: {
        resetCode,
        resetCodeExpiration,
      },
    });

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail username
        pass: process.env.EMAIL_PASSWORD, // Gmail password or app-specific password
      },
    });

    // Send the email with the six-digit code
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Sender address
      to: email, // Recipient email
      subject: "Password Reset Code",
      html: `
        <p>Hi ${user.name || "User"},</p>
        <p>We received a request to reset your password. Use the code below to proceed:</p>
        <h2>${resetCode}</h2>
        <p>This code will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
        <p>Thank you!</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Password reset code sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot password handler:", error);
    return new Response(
      JSON.stringify({
        message:
          "An error occurred while processing your request. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
