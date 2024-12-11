import { NextFunction, Request, Response } from "express";
import { KeepLoginService } from "../services/auth/keep-login.service";
import { loginService } from "../services/auth/login.service";
import { registerService } from "../services/auth/register.service";

export class AuthController {
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //login
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // keep login
  async keepLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.user.id;

      const result = await KeepLoginService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
