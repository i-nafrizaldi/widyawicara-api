import prisma from "../../prisma";
import { Prisma } from "@prisma/client";
import { PaginationQueryParams } from "../../types/pagination.type";

interface GetProductQuery extends PaginationQueryParams {
  search: string;
  userId?: number;
}

export const getProductsService = async (query: GetProductQuery) => {
  try {
    const { page, search, sortBy, sortOrder, take, userId } = query;

    const whereClause: Prisma.ProductWhereInput = {
      name: { contains: search },
      deletedAt: null,
    };

    if (userId) {
      whereClause.userId = userId;
    }

    const product = await prisma.product.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true },
    });

    const count = await prisma.product.count({
      where: whereClause,
    });

    return {
      data: product,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
