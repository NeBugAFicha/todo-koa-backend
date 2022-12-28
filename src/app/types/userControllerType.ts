export type UserControllerType = {
    registration: {
        body: {
            login: string;
            password: string;
        }
    }
    logIn: {
        body: {
            login: string;
            password: string;
        }
    }
};