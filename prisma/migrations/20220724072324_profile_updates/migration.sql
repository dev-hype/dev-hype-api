-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_timezoneName_fkey";

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "timezoneName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_timezoneName_fkey" FOREIGN KEY ("timezoneName") REFERENCES "timezones"("name") ON DELETE SET NULL ON UPDATE CASCADE;
