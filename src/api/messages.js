import { cache } from "react";
import prisma from "../../lib/prisma";

export const getMessages = cache(async () => {
  const messages = await prisma.user.findMany();
  return messages;
});