import { comparePassword } from "../../lib/bcrypt";
import prisma from "../../prisma";
import { appConfig } from "../../utils/config";
import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const loginService = async (
  body: Pick<User, "username" | "password">
) => {
  try {
    const { password, username } = body;

    const user = await prisma.user.findFirst({
      where: { username: username },
    });

    if (!user) {
      throw new Error("Incorrect Username !");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Incorrect Password !");
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: "2h",
    });

    const { password: pass, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
};
