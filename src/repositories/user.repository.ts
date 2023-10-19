import db from "../database";
import { IUser } from "../types/user";
import { LoginSchema, RegisterSchema } from "../validations/user";

const findUser = async (
    input: Partial<LoginSchema>
): Promise<IUser | undefined> => {
    const query = await db<IUser>("users")
        .where({ email: input.email })
        .first();

    return query;
};

const createUser = async (input: RegisterSchema): Promise<IUser> => {
    const query = await db<IUser>("users")
        .insert({
            name: input.name,
            email: input.email,
            password: input.password,
        })
        .returning("*")
        .then((row) => row[0]);

    return query;
};

export { findUser, createUser };
