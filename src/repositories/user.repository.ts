import db from "../database";
import { LoginSchema, RegisterSchema } from "../types/user";

const findUser = async (input: LoginSchema) => {
    const query = await db.raw(
        "select * from users where email = ? and password = ?",
        [input.email, input.password]
    );

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
