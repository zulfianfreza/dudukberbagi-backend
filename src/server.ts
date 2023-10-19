import express, { Application } from "express";
import cors from "cors";
import config from "../config";
import dotenv from "dotenv";
import UserRouter from "./routes/user.router";
dotenv.config();

const app: Application = express();

const PORT: number = Number(config.port) || 8000;
const v1: string = "/api/v1";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome");
});

app.use(`${v1}/auth`, UserRouter);

app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
});
