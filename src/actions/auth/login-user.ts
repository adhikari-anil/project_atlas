"use server";
import { loginUser } from "@/services";

import { loginSchema, LoginInput } from "@/validations/auth-schema";

export async function loginUserAction(data: LoginInput) {
  const validated = loginSchema.parse(data);

  const { user } = await loginUser(validated);

  return {
    success: true,
    user,
  };
}
