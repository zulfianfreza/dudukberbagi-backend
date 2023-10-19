import db from "../database";
import { IUser } from "../types/user";
import { LoginSchema, RegisterSchema } from "../validations/user";

const findUser = async (input: Partial<LoginSchema>): Promise<IUser> => {
    const query = await db.raw("select * from users where email = ? ", [
        input.email,
    ]);

    return query.rows;
};

const createUser = async (input: RegisterSchema) => {
    const query = await db.raw(
        "insert into users(name, email, password) values(?, ?, ?)",
        [input.name, input.email, input.password]
    );

    return query.rows;
};

export { findUser, createUser };
