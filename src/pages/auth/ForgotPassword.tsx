import { useForm } from "@mantine/form";
import { useForgotPasswordMutation } from "../../api/mutation/authMutation";
import { forgotPasswordSchema } from "../../schema/AuthSchema";
import { zodResolver } from "mantine-form-zod-resolver";
import { TextInput } from "@mantine/core";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { NavLink } from "react-router";
import { routes } from "../../routes";

const ForgotPassword = () => {
  const { mutate } = useForgotPasswordMutation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: zodResolver(forgotPasswordSchema),
  });

  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen">
      <div className="w-[500px] min-h-[200px] max-h-[650px] bg-surface shadow-2xl rounded-lg text-white p-10 py-14">
        <div className="mb-5">
          <div className="text-3xl font-bold mb-5">Forgot Your Password?</div>
          <div className="text-sm text-muted">
            Enter your email and we will send you a code to reset you password.
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <form onSubmit={form.onSubmit((values) => mutate({ data: values }))}>
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
            <PrimaryButton className="mt-5" type="submit" value="Submit" />
          </form>

          <div className="text-center text-sm text-blue-500 underline">
            <NavLink to={routes.auth.login}>Back To Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
