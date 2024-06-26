import prisma from "../../lib/prisma";
import { cache } from "react";
// import useOpenAI from "@/hooks/useOpenAI";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getUsers = cache(async () => {
  const users = await prisma.user.findMany();
  return users;
});

// export const chatBotGPT = cache(async (messages) => {
//   return await openai.chat.completions.create({
//     messages: messages,
//     model: "gpt-3.5-turbo",
//   });
// });

export const getAgeFromPrompt = cache(async (discussion, name) => {
  return await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "Essais de déterminer la tranche d'âge de la personne en fonction de cette discussions" +
          discussion +
          " prend en compte que la personne s'appelle " +
          name +
          " dans tout les cas tu doit trancher et ne jamais dire que tu ne sais pas ou que tu ne peux pas le déterminer ne renvoie qu'un age et rien d'autre",
      },
    ],
    model: "gpt-3.5-turbo",
  });
});

// getAgeFromPrompt("Salut, comment ça va ?", "Robert").then((res) => {
//   console.log(res);
// });
