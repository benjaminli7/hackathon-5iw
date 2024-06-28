/*
  Warnings:

  - Added the required column `operation` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "operation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questionnaire" ADD COLUMN     "operation" TEXT;

-- CreateTable
CREATE TABLE "UserScriptProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "scriptId" INTEGER NOT NULL,
    "currentStep" INTEGER NOT NULL,

    CONSTRAINT "UserScriptProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserScriptProgress_userId_scriptId_key" ON "UserScriptProgress"("userId", "scriptId");

-- AddForeignKey
ALTER TABLE "UserScriptProgress" ADD CONSTRAINT "UserScriptProgress_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "ConversationScript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScriptProgress" ADD CONSTRAINT "UserScriptProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
