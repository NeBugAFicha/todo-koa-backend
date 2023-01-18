export type Type = {
  registration: {
    body: {
      login: string;
      password: string;
    };
  };
  logIn: {
    body: {
      login: string;
      password: string;
    };
  };
};
