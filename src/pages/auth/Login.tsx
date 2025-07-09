import { NavLink } from "react-router";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { routes } from "../../routes";
import { useState } from "react";
import { TextInput, Checkbox, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginSchema } from "../../schema/AuthSchema";
import { useLoginMutation } from "../../api/mutation/authMutation";

export type LoginDataType = {
  email: string | null;
  password: string | null;
};

const Login = () => {
  const [checked, setChecked] = useState(false);
  const { mutate } = useLoginMutation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen">
      <div className="w-[500px] min-h-[500px] max-h-[650px] bg-surface shadow-2xl rounded-lg text-white p-10 py-10">
        <div className="text-4xl font-bold mb-10 text-center">Login</div>
        <div className="flex flex-col gap-8">
          <form
            className="auth-text-input"
            onSubmit={form.onSubmit((values) => mutate({ data: values }))}
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
            <PrimaryButton className="mt-5" type="submit" value="Submit" />
          </form>
        </div>
        <div className="flex justify-between mt-5">
          <div>
            <Checkbox
              checked={checked}
              label="Remember Me"
              color="var(--color-primary)"
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          </div>
          <NavLink
            to={"/" + routes.auth.forgotPassword}
            className="text-gray-300 text-sm"
          >
            Forgot Password?
          </NavLink>
        </div>
        <div className="mt-5 text-center text-sm">
          Don't have an account?{" "}
          <NavLink
            to={"/" + routes.auth.signup}
            className="text-blue-500 underline"
          >
            Sign up now
          </NavLink>
        </div>

        <NavLink
          to={"/" + routes.user.home}
          className="text-sm mt-5 flex items-center gap-2 ps-10 sm:ps-40 w-full text-muted"
        >
          Back To Home
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
