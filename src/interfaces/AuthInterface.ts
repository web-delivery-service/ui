export interface IRegisterUser {
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface JWT {
    accessToken: string;
    refreshToken: string | null;
    tokenType: string;
}