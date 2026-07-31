import { prisma } from "../src/lib/prisma";
import { UserStatus } from "../generated/prisma/enums";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Seeding Identity Module...");

  // Clear existing data
  await prisma.session.deleteMany();
  await prisma.passwordResets.deleteMany();
  await prisma.emailVerificationToken.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const passwordHash = await bcrypt.hash("Password@123", 12);

  // Create User
  const user = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      username: "johndoe",

      passwordHash,

      firstName: "John",
      lastName: "Doe",

      phone: "+9779800000000",

      timezone: "Asia/Kathmandu",
      language: "en",

      status: UserStatus.ACTIVE,

      emailVerifiedAt: new Date(),
      lastLoginAt: new Date(),
    },
  });

  // Create Session
  await prisma.session.create({
    data: {
      userId: user.id,

      refreshTokenHash: "hashed_refresh_token_example_123456789",

      ipAddress: "127.0.0.1",

      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)",

      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),

      lastUsedAt: new Date(),
    },
  });

  // Email Verification History
  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,

      tokenHash: "hashed_email_verification_token",

      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),

      verifiedAt: new Date(),
    },
  });

  // Password Reset Request
  await prisma.passwordResets.create({
    data: {
      userId: user.id,

      tokenHash: "hashed_password_reset_token",

      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    },
  });

  console.log("✅ Identity module seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
