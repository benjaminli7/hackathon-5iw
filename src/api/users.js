import { cache } from "react";
import prisma from "../../lib/prisma";

export const getUsers = cache(async () => {
  const users = await prisma.user.findMany();
  return users;
});

export const getUserAge = cache(async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return user.age;
});
