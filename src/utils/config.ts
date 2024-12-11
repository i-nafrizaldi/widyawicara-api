import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  jwtSecretKey: process.env.JWT_SECRET_KEY || "secret",
  port: process.env.PORT || 8080,
  cloudinaryCloudname: process.env.CLOUDINARY_CLOUDNAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};
