import { NavLink } from "react-router";
import { routes } from "../../routes";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "mantine-form-zod-resolver";
import { signupSchema } from "../../schema/AuthSchema";
import { useSignupMutation } from "../../api/mutation/authMutation";
import { Notifications } from "@mantine/notifications";
import PrimaryButton from "../../ui/button/PrimaryButton";

export type SignupDataType = {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};
const Signup = () => {
  const { mutate } = useSignupMutation();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(signupSchema),
  });

  const handleLogin = (data: SignupDataType) => {
    mutate({ data });
  };

  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen py-20">
      <Notifications />
      <div className="w-[500px] min-h-[500px] bg-surface shadow-2xl rounded-lg text-white p-10 py-14">
        <div className="text-4xl font-bold mb-10 text-center">Signup</div>
        <div className="flex flex-col gap-8">
          <form
            className="auth-text-input"
            onSubmit={form.onSubmit((values) => handleLogin(values))}
          >
            <TextInput
              label="Name"
              placeholder="Enter Your Name"
              key={form.key("name")}
              classNames={{
                root: "mt-5",
                label: "text-[16px]",
                input: twMerge(
                  "login-input",
                  form.errors.name && "border-red-500",
                ),
                error: "text-red-500",
              }}
              {...form.getInputProps("name")}
            />
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
            <TextInput
              label="Password"
              placeholder="Enter Your Password"
              key={form.key("password")}
              classNames={{
                root: "mt-5",
                label: "text-[16px]",
                input: twMerge(
                  "login-input bg-green-500",
                  form.errors.password && "border-red-500",
                ),
                error: "text-red-500",
              }}
              {...form.getInputProps("password")}
            />
            <TextInput
              label="Confirm Password"
              placeholder="Retype Your Password"
              key={form.key("confirmPassword")}
              classNames={{
                root: "mt-5",
                label: "text-[16px]",
                input: twMerge(
                  "login-input",
                  form.errors.confirmPassword && "border-red-500",
                ),
                error: "text-red-500",
              }}
              {...form.getInputProps("confirmPassword")}
            />
            {/* <Group className="w-full"> */}
            <PrimaryButton className="mt-5" type="submit" value="Submit" />
          </form>
        </div>
        <div className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <NavLink
            to={"/" + routes.auth.login}
            className="text-blue-500 underline"
          >
            Login now
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

export default Signup;
