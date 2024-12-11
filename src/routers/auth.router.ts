import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { uploader } from "../lib/uploader";
import { verifyToken } from "../lib/jwt";

export class AuthRouter {
  private authController: AuthController;
  private router: Router;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get(
      "/keep-login",
      verifyToken,
      this.authController.keepLoginController
    );
    this.router.post("/register", this.authController.registerController);
    this.router.post("/login", this.authController.loginController);
  }

  getRouter(): Router {
    return this.router;
  }
}
