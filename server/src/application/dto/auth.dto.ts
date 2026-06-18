export type LoginInput = {
    username: string;
    password: string;
};

export type RegisterInput = {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
};

export type AuthOutput = {
    accessToken: string;
};

export type SignInData = {
    id?: string;
    username: string;
};