import prisma from "../../prisma";

export const getProductService = async (id: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });

    if (!product) {
      throw new Error("Product not found !");
    }

    return product;
  } catch (error) {
    throw error;
  }
};
