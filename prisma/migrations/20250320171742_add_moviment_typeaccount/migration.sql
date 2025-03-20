/*
  Warnings:

  - Added the required column `typeAccount` to the `Moviment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('DEBIT', 'CREDIT', 'WALLET');

-- AlterTable
ALTER TABLE "Moviment" ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "typeAccount" "AccountType" NOT NULL;
