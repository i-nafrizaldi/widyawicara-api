import { User } from "@prisma/client";
import prisma from "../../prisma";
import { cloudinaryRemove, cloudinaryUpload } from "../../lib/cloudinary";

interface UpdateUser extends Partial<User> {}

export const updateUserService = async (
  userId: number,
  body: UpdateUser,
  file?: Express.Multer.File
) => {
  const { email, username, gender } = body;

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingUserName = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUserName) {
      throw new Error("User name already exsit !");
    }

    if (email && user.email !== email) {
      const userEmail = await prisma.user.findFirst({
        where: { email: { equals: email } },
      });

      if (userEmail) {
        throw new Error("Email already exist");
      }

      if (file) {
        if (user.profilePict) {
          await cloudinaryRemove(user.profilePict);
        }

        const { secure_url } = await cloudinaryUpload(file);

        body.profilePict = secure_url;
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          username: username,
          email: email,
          gender: gender,
          profilePict: body.profilePict,
        },
      });

      return user;
    }
  } catch (error) {
    throw error;
  }
};
