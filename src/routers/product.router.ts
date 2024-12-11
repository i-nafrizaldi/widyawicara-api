import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { verifyToken } from "../lib/jwt";
import { uploader } from "../lib/uploader";

export class ProductRouter {
  private productController: ProductController;
  private router: Router;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get(
      "/",
      verifyToken,
      this.productController.getProductsController
    );
    this.router.get(
      "/:id",
      verifyToken,
      this.productController.getProductController
    );
    this.router.post(
      "/",
      verifyToken,
      uploader().array("thumbnail", 1),
      this.productController.createProductController
    );
    this.router.patch(
      "/:id",
      verifyToken,
      uploader().array("thumbnail", 1),
      this.productController.updateProductController
    );
    this.router.delete(
      "/:id",
      verifyToken,
      this.productController.deleteProductController
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
