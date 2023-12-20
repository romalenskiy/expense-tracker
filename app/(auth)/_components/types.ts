export type Credentials = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type CredentialsInvalid = Record<keyof Credentials, boolean>;
