import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get("/", (req, res, next) => {
    const test = "Quoc Zuong";
    return res.status(200).json({ message: "hihihi", metadata: test.repeat(150000) });
});

// handle errors

export default app;
