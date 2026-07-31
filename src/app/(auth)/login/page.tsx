"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginInput } from "@/validations/auth-schema";

import { loginUserAction } from "@/actions/auth/login-user";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await loginUserAction(data);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen w-screen flex flex-col gap-2 justify-center items-center"
    >
      <input {...register("email")} className="border-amber-50 border-2" />
      <input
        type="password"
        {...register("password")}
        className="border-amber-50 border-2"
      />
      <button type="submit">Register</button>
    </form>
  );
}
