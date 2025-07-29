import { useForm } from "@mantine/form";
import { useVerifyOtpMutation } from "../../api/mutation/authMutation";
import { otpSchema } from "../../schema/AuthSchema";
import { zodResolver } from "mantine-form-zod-resolver";
import { PinInput } from "@mantine/core";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { NavLink } from "react-router";
import { routes } from "../../routes";
import Cookies from "js-cookie";

const OTP = () => {
  const { mutate } = useVerifyOtpMutation();
  const resetToken = Cookies.get("resetToken") || "";

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },
    validate: zodResolver(otpSchema),
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
        <div className="flex flex-col gap-8 max-w-[420px]">
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
              return mutate({ data: { otp: values.otp, token: resetToken } });
            })}
          >
            <PinInput
              oneTimeCode
              inputType="tel"
              length={6}
              inputMode="numeric"
              size="lg"
              value={form.values.otp || ""}
              onChange={(value) => form.setFieldValue("otp", value)}
              error={!!form.errors.otp}
              styles={{
                root: {
                  maxWidth: "420px",
                  display: "flex",
                  justifyContent: "space-between",
                },
              }}
            />

            <PrimaryButton className="mt-5" type="submit" value="Verify OTP" />
          </form>

          <div className="text-center text-blue-500 underline">
            <NavLink to={"/" + routes.auth.login}>Back To Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
