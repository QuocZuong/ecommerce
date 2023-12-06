import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "dotenv/config";
import instanceMongoDB from "./db/init.mongodb.js";
import router from "./routes/index.js";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
instanceMongoDB.connect();

// init routes
app.use("", router);

// handle errors

export default app;
