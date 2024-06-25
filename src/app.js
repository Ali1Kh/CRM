import { mainRouter } from "./main-router.js";

import express from "express";
import cors from "cors";
import { I18n } from "i18n";
import * as path from "path";
import { errorHandlerController } from "./middlewares/globalError.middleware.js";

import cookieParser from "cookie-parser";

const app = express();

const i18n = new I18n({
  locales: ["en", "ar"],
  defaultLocale: "ar",
  api: {
    __: "t",
  },
  directory: path.join(__dirname, "locales"),
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(i18n.init);
app.use(cookieParser());

app.use(
  "/assets/advert",
  express.static(path.join(__dirname, "public/storage/images/advert/images"))
);

app.use("/api/v1", mainRouter);

app.use(errorHandlerController);

export default app;
