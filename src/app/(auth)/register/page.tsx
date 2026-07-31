"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterInput } from "@/validations/auth-schema";

import { registerUserAction } from "@/actions/auth/register-user";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const result = await registerUserAction(data);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
      <input {...register("firstName")} className="border-amber-50 border-2"/>

      <input {...register("lastName")} className="border-amber-50 border-2"/>

      <input {...register("username")} className="border-amber-50 border-2"/>

      <input {...register("email")} className="border-amber-50 border-2"/>

      <input type="password" {...register("password")} className="border-amber-50 border-2"/>

      <input type="password" {...register("confirmPassword")} className="border-amber-50 border-2"/>

      <button type="submit">Register</button>
    </form>
  );
}
