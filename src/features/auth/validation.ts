import type { RegisterOptions } from "react-hook-form";

export type AuthForm = {
  email: string;
  password: string;
};

export const emailValidation: RegisterOptions<AuthForm, "email"> = {
  required: "Email required",
  pattern: {
    value: /^\S+@\S+$/i,
    message: "Invalid email",
  },
};

export const passwordValidation: RegisterOptions<AuthForm, "password"> = {
  required: "Password required",
  minLength: {
    value: 6,
    message: "Min 6 characters",
  },
};
