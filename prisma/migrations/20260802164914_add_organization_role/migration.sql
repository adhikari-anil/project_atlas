-- CreateEnum
CREATE TYPE "OrganizationRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "organization_members" ADD COLUMN     "role" "OrganizationRole" NOT NULL DEFAULT 'MEMBER';
