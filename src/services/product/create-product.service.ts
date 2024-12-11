import { Product } from "@prisma/client";
import prisma from "../../prisma";
import { cloudinaryUpload } from "../../lib/cloudinary";

interface CreateProduct extends Omit<Product, "id" | "createdAt"> {
  userId: number;
}

export const createProductService = async (
  userId: number,
  body: CreateProduct,
  file: Express.Multer.File
) => {
  try {
    const { name, price, stock } = body;

    const existingProduct = await prisma.product.findFirst({
      where: { name, deletedAt: null },
    });

    if (existingProduct) {
      throw new Error("Product already exist !");
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User Not Found !");
    }

    const { secure_url } = await cloudinaryUpload(file);

    const result = await prisma.product.create({
      data: {
        ...body,
        thumbnail: secure_url,
        price: Number(price),
        stock: Number(stock),
        userId: Number(userId),
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
