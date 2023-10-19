import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { findUser } from "../repositories/user.repository";
import { verifyJwt } from "../utils/jwt";
import { IUserToken } from "../types/user";

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get the token
        let access_token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            access_token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }

        if (!access_token) {
            throw createHttpError(401, "you're not logged in");
        }

        // Validate Access Token
        const decoded = verifyJwt<IUserToken>(access_token);

        if (!decoded) {
            throw createHttpError(401, `Invalid token or user doesn't exist`);
        }

        // Check if user has a valid session

        // Check if user still exist
        const user = await findUser({ email: decoded.email });

        if (!user) {
            throw createHttpError(401, `User with that token no longer exist`);
        }

        // This is really important (Helps us know if the user is logged in from other controllers)
        // You can do: (req.user or res.locals.user)
        res.locals.user = user;

        next();
    } catch (err: any) {
        next(err);
    }
};
