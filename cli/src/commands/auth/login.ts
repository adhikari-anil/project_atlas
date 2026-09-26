import { ApiError } from "../../lib/api.js";
import { login } from "../../lib/auth.js";
import { prompt, promptPassword } from "../../lib/prompt.js";

export async function loginCommand() {
  const email = await prompt("Email");
  const password = await promptPassword("Password");

  try {
    const user = await login(email, password);
    console.log("✓ Logged in successfully.");
    console.log(`\nSigned in as: ${user.email}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new Error("Invalid email or password.");
    }
    throw error;
  }
}