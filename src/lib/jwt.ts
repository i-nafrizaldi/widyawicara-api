import { appConfig } from "../utils/config";
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

const secretKey = appConfig.jwtSecretKey!;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({
      message: "Authentication failed, token is missing",
    });
    return;
  }

  verify(token, secretKey!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).send({ message: "Token expired" });
        return;
      } else {
        res.status(401).send({ message: "Invalid token" });
        return;
      }
    }

    res.locals.user = payload;

    next();
  });
};
