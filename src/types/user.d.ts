export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface IUserToken {
    id: number;
    name: string;
    email: string;
}
