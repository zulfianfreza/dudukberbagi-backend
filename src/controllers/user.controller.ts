import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { loginSchema, registerSchema } from "../validations/user";
import { StatusCodes } from "http-status-codes";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = loginSchema.parse(req.body);

        const user = await UserService.login(input);

        res.status(StatusCodes.OK).json({
            message: "login success",
            status_code: StatusCodes.OK,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = registerSchema.parse(req.body);

        const user = await UserService.register(input);

        res.status(StatusCodes.OK).json({
            message: "register success",
            status_code: StatusCodes.OK,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
