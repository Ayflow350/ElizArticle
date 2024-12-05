import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;

  // Ensure password is provided
  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  // Concatenate firstName and lastName to create the full name
  const name = `${firstName} ${lastName || ""}`.trim(); // Trim to remove any unnecessary spaces if lastName is empty

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    let role: Role = Role.USER;
    if (email === "eliz@elizbright.com") {
      role = Role.ADMIN;
    }

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role,
      },
    });

    console.log("User created:", user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
