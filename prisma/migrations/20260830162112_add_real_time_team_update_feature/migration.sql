-- CreateEnum
CREATE TYPE "TeamUpdateType" AS ENUM ('GENERAL', 'TASK_UPDATE', 'BLOCKER');

-- CreateTable
CREATE TABLE "team_updates" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "task_id" UUID,
    "type" "TeamUpdateType" NOT NULL DEFAULT 'GENERAL',
    "message" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "team_updates_organization_id_created_at_idx" ON "team_updates"("organization_id", "created_at");

-- CreateIndex
CREATE INDEX "team_updates_user_id_idx" ON "team_updates"("user_id");

-- CreateIndex
CREATE INDEX "team_updates_task_id_idx" ON "team_updates"("task_id");

-- AddForeignKey
ALTER TABLE "team_updates" ADD CONSTRAINT "team_updates_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_updates" ADD CONSTRAINT "team_updates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_updates" ADD CONSTRAINT "team_updates_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
