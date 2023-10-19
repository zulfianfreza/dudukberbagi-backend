import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "../config";
import dotenv from "dotenv";
import UserRouter from "./routes/user.router";
import createHttpError, { isHttpError } from "http-errors";
dotenv.config();

const app: Express = express();

const PORT: number = Number(config.port) || 8000;
const v1: string = "/api/v1";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome");
});

app.use(`${v1}/auth`, UserRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
});
