export type SignUpInput = {
    login: string;
    email: string;
    password: string;
};

export type ConfirmEmailInput = {
    code: string;
};

export type ResendEmailInput = {
    email: string;
};

export type LoginInput = {
    loginOrEmail: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

export type CurrentUser = {
    email: string;
    login: string;
    userId: string;
};
