"use server";
import prisma from "../../lib/prisma";
import { cache } from "react";

export const getMsg = cache(async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId, 10) },
    include: { messages: true },
  });
  return user;
});

export const postMsg = cache(async (userId, content, sender) => {
  const message = await prisma.message.create({
    data: {
      userId: parseInt(userId, 10),
      sender: sender,
      content: content,
      contentIA: '',
    },
  });

  return message;
});
