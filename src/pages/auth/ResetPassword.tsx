import PrimaryButton from "../../ui/button/PrimaryButton";
import { TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "mantine-form-zod-resolver";
import { changePasswordSchema } from "../../schema/AuthSchema";
import { useResetPasswordMutation } from "../../api/mutation/authMutation";
import { NavLink } from "react-router";
import { routes } from "../../routes";

const ResetPassword = () => {
  const { mutate } = useResetPasswordMutation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: null,
      confirmPassword: null,
    },
    validate: zodResolver(changePasswordSchema),
  });

  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen">
      <div className="w-[500px] min-h-[500px] max-h-[650px] bg-surface shadow-2xl rounded-lg text-white p-10 py-14">
        <div className="text-4xl font-bold mb-10 text-center">
          Change Password
        </div>
        <div className="flex flex-col gap-8">
          <form
            onSubmit={form.onSubmit((values) =>
              mutate({ data: { password: values.password || "" } }),
            )}
          >
            <PasswordInput
              label="Password"
              placeholder="Enter New Password"
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

            <PasswordInput
              label="Password"
              placeholder="Retype New Password"
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
            <PrimaryButton className="mt-5" type="submit" value="Submit" />
          </form>
          <div className="flex justify-between">
            <NavLink to={"/" + routes.auth.forgotPassword}>Resend OTP</NavLink>
            <NavLink
              to={"/" + routes.auth.login}
              className={"text-blue-500 underline"}
            >
              Go To Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
