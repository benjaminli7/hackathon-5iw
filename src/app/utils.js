import prisma from "../../lib/prisma";
import { cache } from "react";
// import useOpenAI from "@/hooks/useOpenAI";
import { OpenAI } from "openai";
const json = require("../../prisma/conversation.json");
const jeune = json[0];
const vieux = json[1];
// console.log(adulte);

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



export const setEstimatedAgeFromPrompt = cache(async (discussion, name) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        // response_format: { type: "json_object" },
        content: `Estime l'âge de la personne en fonction de cette discussions ${JSON.stringify(
          vieux
        )} ${
          name ? "dans cette conversation le client s'appelle " + name : ""
        } Répond obligatoirement par l'age de la personne ne dit pas que tu ne sais pas si tu ne sait pas éstime l'age de la personne, tu dois ne donner que l'age de la personne dans la réponse par exemple: 45`,
      },
    ],
    model: "gpt-4o",
  });
  const age = response.choices[0]?.message?.content;
  const ageMatch = age.match(/\b\d+\b ans/i);
  const estimatedAge = ageMatch ? parseInt(ageMatch[0]) : parseInt(age);
  

  return estimatedAge;
});

export const changeBotAnswerFromUserInfo = cache(async (answer, name) => {

  const client = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",

        content: `
          Voici la liste des informations du client ${name}:
          ${JSON.stringify(client)}
          La réponse prédéfinie qui devait être données par le bot était: ${answer}
          CHANGE la formulation de la réponse prédéfinie en fonction des informations du client ci-dessus.
          par exemple si la personne est plus agée que 50 ans tu utilise un vocabulaire plus formel et donne plus de détails sur la réponse.
          Si la personne est plus jeune que 50 ans tu utilise un vocabulaire plus familier et va droit au but.
        `,
      },
    ],
    model: "gpt-4o",
  });

});
// getAgeFromPrompt("Salut, comment ça va ?", "Robert").then((res) => {
//   console.log(res);
// });
