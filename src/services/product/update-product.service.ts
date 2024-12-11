import { Product } from "@prisma/client";
import prisma from "../../prisma";
import { cloudinaryRemove, cloudinaryUpload } from "../../lib/cloudinary";

export const updateProductService = async (
  id: number,
  body: Partial<Product>,
  file?: Express.Multer.File
) => {
  try {
    const { name, stock, price } = body;

    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (file) {
      if (product.thumbnail) {
        await cloudinaryRemove(product.thumbnail);
      }

      const { secure_url } = await cloudinaryUpload(file);

      body.thumbnail = secure_url;
    }

    return await prisma.product.update({
      where: { id },
      data: { ...body, stock: Number(stock), price: Number(price) },
    });
  } catch (error) {
    throw error;
  }
};
