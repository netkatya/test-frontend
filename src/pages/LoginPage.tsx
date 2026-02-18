import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../shared/hooks/redux";
import { login, register, fetchMe } from "../features/auth/authSlice";
import { AuthForm } from "../features/auth/components/AuthForm";
import type { AuthForm as AuthFormType } from "../features/auth/validation";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const mode = search.get("mode") === "register" ? "register" : "login";
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (data: AuthFormType) => {
    setServerError(null);

    try {
      if (mode === "login") {
        await dispatch(login(data)).unwrap();
      } else {
        await dispatch(register(data)).unwrap();
      }

      await dispatch(fetchMe()).unwrap();
      navigate("/");
    } catch {
      setServerError(
        mode === "login"
          ? "Incorrect email or password"
          : "User with this email already exists",
      );
    }
  };

  return (
    <div className="container relative min-h-dvh grid lg:grid-cols-2">
      <div
        className="
          absolute inset-0 -z-10
          bg-[url('/images/login.jpg')] bg-cover bg-center
          lg:static lg:z-auto
        "
      />

      <div className="absolute inset-0 -z-10 bg-black/40 lg:hidden" />

      <div className="flex items-center justify-center px-6 xl:px-25">
        <div className="w-full max-w-md lg:max-w-137.5">
          <h1 className="font-second font-bold text-[28px] leading-[121%] mb-5 text-(--light-text) lg:text-(--foreground)">
            {mode === "login" ? "Login" : "Create an account"}
          </h1>

          <AuthForm
            mode={mode}
            onSubmit={handleSubmit}
            serverError={serverError}
          />

          <p className="font-semibold text-[14px] leading-[1.57] text-center mt-2.5 text-(--light-text) lg:text-(--foreground)">
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <button
              className="text-(--light-text) underline lg:text-(--beige) lg:no-underline font-semibold text-[14px] leading-[1.57] hover:opacity-80"
              onClick={() =>
                navigate(
                  `/login?mode=${mode === "login" ? "register" : "login"}`,
                )
              }
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
