import createHttpError from "http-errors";
import * as UserRepository from "../repositories/user.repository";
import { LoginSchema, RegisterSchema } from "../validations/user";
import bcrypt from "bcrypt";

const login = async (input: LoginSchema) => {
    const user = await UserRepository.findUser(input);

    if (!user) {
        throw createHttpError(404, "user not found");
    }

    const isPasswordMatch = bcrypt.compare(input.password, user.password);

    if (!isPasswordMatch) {
        throw createHttpError(401, "password doesn't match");
    }

    return user;
};

const register = async (input: RegisterSchema) => {
    const { name, email, password } = input;

    const isEmailExist = await UserRepository.findUser({ email });

    if (!isEmailExist) {
        createHttpError(
            409,
            "user with this email already exists, please login instead"
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await UserRepository.createUser({
        name,
        email,
        password: passwordHash,
    });

    return newUser;
};

export { login, register };
