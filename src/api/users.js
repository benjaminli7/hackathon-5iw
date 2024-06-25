import { cache } from "react";
import prisma from "../../lib/prisma";

export const getUsers = cache(async () => {
  const users = await prisma.user.findMany();
  return users;
});
