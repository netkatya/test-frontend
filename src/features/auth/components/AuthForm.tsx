import { useForm } from "react-hook-form";
import type { AuthForm as AuthFormType } from "../validation";
import { emailValidation, passwordValidation } from "../validation";
import toast from "react-hot-toast";

type Props = {
  mode: "login" | "register";
  onSubmit: (data: AuthFormType) => Promise<void>;
  serverError: string | null;
};

export function AuthForm({ mode, onSubmit, serverError }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormType>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex flex-col gap-5 w-full

        bg-white/95 lg:bg-transparent
        backdrop-blur-md lg:backdrop-blur-none

        p-6 rounded-2xl shadow-xl
        lg:p-0 lg:shadow-none
      "
    >
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          className="input w-full"
          placeholder="Email"
          autoComplete="email"
          {...register("email", emailValidation)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password", passwordValidation)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {serverError && (
        <div className="text-red-500 text-sm text-center">{serverError}</div>
      )}
      <button
        type="button"
        onClick={() => toast.success("Password reset link sent to your email")}
        className="font-semibold text-[14px] leading-[1.57] text-(--beige) hover:opacity-70 transition text-right"
      >
        Forgot password?
      </button>
      <button
        disabled={isSubmitting}
        className="button bg-(--beige) text-(--light-text) hover:bg-(--light-text) hover:text-(--beige)"
      >
        {isSubmitting
          ? "Please wait..."
          : mode === "login"
            ? "Sign In"
            : "Register"}
      </button>
    </form>
  );
}
