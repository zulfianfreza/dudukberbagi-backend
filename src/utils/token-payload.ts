import { IUser } from "../types/user";

export const createUserToken = (user: IUser) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};
