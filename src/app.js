import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import instanceMongoDB from "./db/init.mongodb.js";
import { checkOverload } from "./helper/check.connect.js";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
instanceMongoDB.connect();
checkOverload();

// init routes
app.get("/", (req, res, next) => {
    return res.status(200).json({ message: "hihihi" });
});

// handle errors

export default app;
