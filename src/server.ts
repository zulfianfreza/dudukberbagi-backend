import express, { Application } from "express";
import cors from "cors";
import config from "../config";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

const PORT = config.port || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome");
});

app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
});
