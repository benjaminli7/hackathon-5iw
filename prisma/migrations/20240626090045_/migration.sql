/*
  Warnings:

  - You are about to drop the column `fieldType` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `importance` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `predefinedAnswers` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaireId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionnaireUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `questionnaireId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `choiceId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionnaireId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionnaireUser" DROP CONSTRAINT "QuestionnaireUser_questionnaireId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionnaireUser" DROP CONSTRAINT "QuestionnaireUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionnaireId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "fieldType",
DROP COLUMN "importance",
DROP COLUMN "predefinedAnswers",
ALTER COLUMN "questionnaireId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answer",
DROP COLUMN "questionId",
DROP COLUMN "questionnaireId",
ADD COLUMN     "choiceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "QuestionnaireUser";

-- CreateTable
CREATE TABLE "Choice" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
