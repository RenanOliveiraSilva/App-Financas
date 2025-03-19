/*
  Warnings:

  - You are about to drop the column `cycleStartDay` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MovimentType" AS ENUM ('INCOME', 'OUTCOME');

-- CreateEnum
CREATE TYPE "IncomeType" AS ENUM ('SALARY', 'UNIQUE', 'OTHER');

-- CreateEnum
CREATE TYPE "OutcomeType" AS ENUM ('BILLS', 'FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID');

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cycleStartDay";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Income";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moviment" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MovimentType" NOT NULL,
    "incomeType" "IncomeType",
    "outcomeType" "OutcomeType",
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "Moviment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" SERIAL NOT NULL,
    "movimentId" INTEGER NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Moviment" ADD CONSTRAINT "Moviment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moviment" ADD CONSTRAINT "Moviment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_movimentId_fkey" FOREIGN KEY ("movimentId") REFERENCES "Moviment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
