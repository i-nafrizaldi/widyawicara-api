import { NextFunction, Request, Response } from "express";
import { getProductService } from "../services/product/get-product.service";
import { updateProductService } from "../services/product/update-product.service";
import { deleteProductService } from "../services/product/delete-product.service";
import { createProductService } from "../services/product/create-product.service";
import { getProductsService } from "../services/product/get-products.service";

export class ProductController {
  // create product
  async createProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const files = req.files as Express.Multer.File[];
      const userId = res.locals.user.id;

      if (!files?.length) {
        throw new Error("No File Uploaded");
      }
      const result = await createProductService(userId, req.body, files[0]);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  //get product list
  async getProductsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as string) || "desc",
        search: req.query.search as string,
        userId: parseInt(req.query.userId as string) || 0,
      };

      const result = await getProductsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //get product
  async getProductController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getProductService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //update product
  async updateProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const files = req.files as Express.Multer.File[];
      const result = await updateProductService(Number(id), req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //update product
  async deleteProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const result = await deleteProductService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
