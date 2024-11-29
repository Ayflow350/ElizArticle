import prisma from "@/app/libs/prismadb"; // Adjust the path as necessary

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, resetCode } = body;

    // Validate inputs
    if (!email || !resetCode) {
      return new Response(
        JSON.stringify({ message: "Email and reset code are required" }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists and the reset code matches
    if (!user || user.resetCode !== resetCode) {
      return new Response(
        JSON.stringify({ message: "Invalid email or reset code" }),
        { status: 400 }
      );
    }

    // Check if the reset code has expired
    if (user.resetCodeExpiration && new Date() > user.resetCodeExpiration) {
      return new Response(
        JSON.stringify({ message: "Reset code has expired" }),
        { status: 400 }
      );
    }

    // If validation is successful, return a success response
    return new Response(JSON.stringify({ message: "Reset code is valid" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in validateCode handler:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
