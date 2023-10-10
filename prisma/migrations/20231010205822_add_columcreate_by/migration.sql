/*
  Warnings:

  - Added the required column `created_by` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rides" ADD COLUMN     "created_by" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
