import prisma from "@/app/libs/prismadb"; // Adjust the path as necessary
import bcrypt from "bcryptjs";

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    // Validate inputs
    if (!email || !newPassword) {
      return new Response(
        JSON.stringify({ message: "Email and new password are required" }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password and clear reset fields
    await prisma.user.update({
      where: { email },
      data: {
        hashedPassword,
        resetCode: null,
        resetCodeExpiration: null,
      },
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in resetPassword handler:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
