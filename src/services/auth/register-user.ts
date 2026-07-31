import { RegisterInput } from "@/validations/auth-schema";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "@/repositories/index";
import { hashPassword } from "@/lib/hash";

export async function registerUser(data: RegisterInput) {
  const { firstName, lastName, username, email, password } = data;

  // Check email
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists.");
  }

  // Check username
  const existingUsername = await findUserByUsername(username);

  if (existingUsername) {
    throw new Error("Username already exists.");
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await createUser({
    firstName,
    lastName,
    username,
    email,
    passwordHash,
  });

  return user;
}
