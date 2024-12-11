import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const uploader = () => {
  const storage = multer.memoryStorage();

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const extAllowed = /\.(jpg|jpeg|png|webp|avif)$/;
    const isExtMatch = file.originalname.toLowerCase().match(extAllowed);
    if (isExtMatch) {
      cb(null, true);
    } else {
      const error = new Error("Your file extension is denied");
      cb(null, false);
      cb(error);
    }
  };

  const limits = { fileSize: 7 * 1024 * 1024 }; // default 7mb

  return multer({ storage, fileFilter, limits });
};
