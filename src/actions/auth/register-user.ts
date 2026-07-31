"use server";

import { registerUser } from "@/services";
import { registerSchema, RegisterInput } from "@/validations/auth-schema";

// export async function registerUserAction(formData: FormData) {
//   const data = {
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//     username: formData.get("username"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//   };

//   const validated = registerSchema.parse(data);

//   const user = await registerUser(validated);

//   return {
//     success: true,
//     user,
//   };
// }

export async function registerUserAction(data: RegisterInput) {
  const validated = registerSchema.parse(data);

  const user = await registerUser(validated);

  return {
    success: true,
    user,
  };
}
