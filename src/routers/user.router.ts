import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  private userController: UserController;
  private router: Router;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get("/", this.userController.getUsersController);
    this.router.patch("/:id", this.userController.updateUserController);
  }

  getRouter(): Router {
    return this.router;
  }
}
