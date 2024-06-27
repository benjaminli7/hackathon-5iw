/*
  Warnings:

  - A unique constraint covering the columns `[operation]` on the table `ConversationScript` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConversationScript_operation_key" ON "ConversationScript"("operation");
