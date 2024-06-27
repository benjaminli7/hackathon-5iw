"use server";
import prisma from "../../lib/prisma";
import { cache } from "react";

export const getMsg = cache(async (phoneNumber) => {
  const user = await prisma.user.findUnique({
    where: { phoneNumber },
    include: { messages: true },
  });
  return user;
});

export const postMsg = cache(async (phoneNumber, content, sender) => {
  let user = await prisma.user.findUnique({
    where: { phoneNumber },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { phoneNumber, name: 'Anonymous' },
    });
  }

  const message = await prisma.message.create({
    data: {
      userId: user.id,
      sender,
      content,
      contentIA: '',
    },
  });

  return message;
});
