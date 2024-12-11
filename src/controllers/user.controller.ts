import { NextFunction, Request, Response } from "express";
import { getUserService } from "../services/user/get-users.service";
import { updateUserService } from "../services/user/update-user.service";

export class UserController {
  async getUsersController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUserService();
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user.id;
      const files = req.files as Express.Multer.File[];
      const result = await updateUserService(user, req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
