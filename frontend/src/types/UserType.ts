export enum RoleType {
    User = "user",
    Admin = "admin"
}

export type UserRegisterCredentialsType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type UserLoginCredentialsType = {
    email: string;
    password: string;
}

export type UserType = {
    token: string;
    registeredUser: {
        firstName: string;
        lastName: string;
        email: string;
        role: RoleType;
        vacationsFollowed: Object[] | [];
    }
}