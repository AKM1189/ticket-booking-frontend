import { NavLink, useNavigate } from "react-router";
import { routes } from "../../routes";
import { useEffect, useState } from "react";
import {
  TextInput,
  Checkbox,
  PasswordInput,
  Button,
  Loader,
  // Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginSchema } from "../../schema/AuthSchema";
import { useLoginMutation } from "../../api/mutation/authMutation";
import { getCurrentUser } from "@/api/function/authApi";
import { useAuthStore } from "@/store/authStore";

export type LoginDataType = {
  email: string | null;
  password: string | null;
};

const Login = () => {
  const [checked, setChecked] = useState(false);
  const { mutate } = useLoginMutation();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: null,
      password: null,
    },
    validate: zodResolver(loginSchema),
  });

  const handleLogin = (values: LoginDataType) => {
    setIsLoading(true);
    mutate(
      { data: values },
      {
        onSuccess: async (data) => {
          console.log("login", data);
          const user = await getCurrentUser();
          if (user) setUser(user);

          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  };
  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen">
      <div className="w-[500px] min-h-[500px] max-h-[650px] bg-surface shadow-2xl rounded-lg text-white p-10 py-14">
        <div className="text-4xl font-bold mb-10 text-center text-text">
          Login
        </div>
        <div className="flex flex-col gap-8">
          <form
            className="auth-text-input"
            onSubmit={form.onSubmit((values) => handleLogin(values))}
          >
            <TextInput
              label="Email"
              placeholder="Enter Your Email"
              key={form.key("email")}
              classNames={{
                root: "mt-5",
                label: "text-[16px]",
                input: twMerge(
                  "login-input",
                  form.errors.email && "border-red-500",
                ),
                error: "text-red-500",
              }}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter Your Password"
              key={form.key("password")}
              classNames={{
                root: "mt-5",
                label: "text-[16px]",
                input: twMerge(
                  "login-input",
                  form.errors.password && "border-red-500",
                ),
                error: "text-red-500",
              }}
              {...form.getInputProps("password")}
            />
            <Button type="submit" className="dashboard-btn mt-5 !w-full">
              {isLoading && <Loader color="white" size="sm" me={10} />}
              Login
            </Button>
          </form>
        </div>
        <div className="flex justify-between flex-wrap mt-5">
          <NavLink to={routes.user.home} className="text-sm text-muted">
            Back To Home
          </NavLink>
          <NavLink
            to={routes.auth.forgotPassword}
            className="text-muted text-sm"
          >
            Forgot Password?
          </NavLink>
        </div>
        <div className="mt-5 text-center text-sm text-muted">
          Don't have an account?{" "}
          <NavLink to={routes.auth.signup} className="text-blue-500 underline">
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
