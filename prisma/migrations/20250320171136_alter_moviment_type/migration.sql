/*
  Warnings:

  - You are about to drop the column `incomeType` on the `Moviment` table. All the data in the column will be lost.
  - You are about to drop the column `outcomeType` on the `Moviment` table. All the data in the column will be lost.
  - Added the required column `movimentType` to the `Moviment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Moviment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Moviment" DROP COLUMN "incomeType",
DROP COLUMN "outcomeType",
ADD COLUMN     "movimentType" "MovimentType" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" VARCHAR(50) NOT NULL;

-- DropEnum
DROP TYPE "IncomeType";

-- DropEnum
DROP TYPE "OutcomeType";
