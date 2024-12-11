import cors from "cors";
import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { AuthRouter } from "./routers/auth.router";
import { ProductRouter } from "./routers/product.router";
import { UserRouter } from "./routers/user.router";
import { appConfig } from "./utils/config";

export default class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        // 404
        res.status(500).send("Not found !");
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          console.error("Error : ", err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const userRouter = new UserRouter();
    const productRouter = new ProductRouter();

    this.app.get("/api", (req: Request, res: Response) => {
      res.send(`Hello, Welcome to Laptop API !`);
    });

    this.app.use("/api/auth", authRouter.getRouter());
    this.app.use("/api/users", userRouter.getRouter());
    this.app.use("/api/products", productRouter.getRouter());
  }

  public start(): void {
    this.app.listen(appConfig.port, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${appConfig.port}`);
    });
  }
}
