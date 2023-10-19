import config from "../../config";
import jwt from "jsonwebtoken";
import { IUserToken } from "../types/user";

const createJwt = (payload: IUserToken) => {
    const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: "1m" });

    return token;
};

const verifyJwt = <T>(token: string): T | null => {
    return jwt.verify(token, config.jwtSecretKey) as T;
};

export { createJwt, verifyJwt };
