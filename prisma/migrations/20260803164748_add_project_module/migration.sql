-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "projects_organization_id_idx" ON "projects"("organization_id");

-- CreateIndex
CREATE INDEX "projects_created_by_id_idx" ON "projects"("created_by_id");

-- CreateIndex
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
CREATE UNIQUE INDEX "projects_organization_id_slug_key" ON "projects"("organization_id", "slug");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
