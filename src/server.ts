import express, { Request } from "express";
import { Application, json } from "express";
import helmet from "helmet";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToMongo } from "./utils/connectDb";
import routes from "./routes";
import { errorHandler } from "./middlewares/handleError";

import swaggerDocument from "./routes/swagger";
const port: string = process.env.PORT || "5003";
const isDevelopment: string = process.env.NODE_ENV;
const app: Application = express();
if (!process.env.JWT_SECRET) process.exit();
//SECURETY MIDDLEWARE
app.use(helmet());
app.use(compression());
const whiteList = (path: any) => {
  const list = isDevelopment
    ? [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:50003",
      ]
    : [
        "http://localhost:3000", //temp
        "http://localhost:3001", //temp
      ];

  return list;
};
const corsOptionsDelegate = (req: Request, callback: any) => {
  const corsOptions: any = {
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ["Content-Disposition"],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  let error = null;
  try {
    if (
      whiteList(req.originalUrl).indexOf(req.header("Origin")) !== -1 ||
      !req.header("Origin")
    ) {
      corsOptions.origin = true;
    } else {
      corsOptions.origin = false;
    }
  } catch (e) {
    error = e;
  }
  callback(error, corsOptions);
};

app.use(cors(corsOptionsDelegate));
//Set Cookie parser
app.use(cookieParser());
app.use(json());
//CONFIG ROUTES
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", routes);

app.use(errorHandler);
//DB CONFIG

connectToMongo();
app.listen(port, () => console.log("start server : ", port));

export default app;
