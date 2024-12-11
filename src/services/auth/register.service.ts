import { User } from "@prisma/client";
import { hashPassword } from "../../lib/bcrypt";
import prisma from "../../prisma";

interface RegisterProps
  extends Omit<User, "id" | "createdAt" | "profilePict"> {}

export const registerService = async (body: RegisterProps) => {
  try {
    const { email, username, password } = body;
    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("Email already exist !");
    }

    const existingUserName = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUserName) {
      throw new Error("User name already exist !");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    return { message: "Register success !", data: newUser };
  } catch (error) {
    throw error;
  }
};
