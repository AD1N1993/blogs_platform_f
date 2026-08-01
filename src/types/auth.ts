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
