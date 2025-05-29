import { NavLink } from "react-router";
import PrimaryButton from "../../components/button/PrimaryButton";
import Input from "../../components/input/Input";
import { routes } from "../../routes";
import { useState } from "react";
import { TextInput, Group, Button, Checkbox } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginSchema, signupSchema } from "../../schema/AuthSchema";

const Signup = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    validate: zodResolver(signupSchema),
  });

  const handleLogin = () => {
    // validateForm();
    window.alert("Validation Success");
  };
  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen py-20">
      <div className="w-[500px] min-h-[500px] bg-surface shadow-2xl rounded-lg text-white p-10 py-14">
        <div className="text-4xl font-bold mb-10 text-center">Signup</div>
        <div className="flex flex-col gap-8">
          <form
            onSubmit={form.onSubmit((values) => console.log("values", values))}
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
                  form.errors.name && "border-red-500"
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
                  form.errors.email && "border-red-500"
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
                  "login-input",
                  form.errors.password && "border-red-500"
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
                  form.errors.confirmPassword && "border-red-500"
                ),
                error: "text-red-500",
              }}
              {...form.getInputProps("confirmPassword")}
            />
            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                className="primary-button mt-5 transition-300"
              >
                Submit
              </Button>
            </Group>
          </form>
        </div>
        <div className="mt-5 text-center">
          Already have an account?{" "}
          <NavLink to={routes.auth.login} className="text-blue-500 underline">
            Login now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
