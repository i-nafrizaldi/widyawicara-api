import prisma from "../../prisma";

export const getUserService = async () => {
  try {
    const user = await prisma.user.findMany();

    return {
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
