"use server";
import prisma from "../../lib/prisma";
import { cache } from "react";
// import useOpenAI from "@/hooks/useOpenAI";
import { OpenAI } from "openai";
// const json = require("../../prisma/conversation.json");
// const jeune = json[0];
// const vieux = json[1];
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

export const setEstimatedAgeFromPrompt = cache(async (discussion, userId) => {
  let responsePerName = null;
  let responsePerVocabulary = null;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  if (!user) {
    return;
  }

  if (user.age && !user.isEstimated) {
    return user.age;
  }

  if (user.name) {
    responsePerName = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Estime l'âge supérieur a 18 ans de la personne en fonction de son nom : ${user.name} Répond obligatoirement par l'age de la personne ne dit pas que tu ne sais pas si tu ne sait pas éstime l'age de la personne, tu dois ne donner que l'age de la personne dans la réponse par exemple: 45 '
          `,
        },
      ],
      model: "gpt-4o",
    });
  }
  responsePerVocabulary = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Estime l'âge de la personne en fonction de cette discussions ${JSON.stringify(
          discussion.map((message) => message.client)
        )}  Répond obligatoirement par l'age de la personne ne dit pas que tu ne sais pas si tu ne sait pas éstime l'age de la personne, tu dois ne donner que l'age de la personne dans la réponse par exemple: 45
        `,
      },
    ],
    model: "gpt-4o",
  });

  const agePerName = responsePerName?.choices[0]?.message?.content
    ? parseInt(responsePerName?.choices[0]?.message?.content)
    : responsePerVocabulary?.choices[0]?.message?.content;
  const agePerVocabulary = responsePerVocabulary.choices[0]?.message?.content;
  console.log("agePerName", agePerName);
  console.log("agePerVocabulary", agePerVocabulary);
  console.log("agePerName", agePerName * 0.75);
  console.log("agePerVocabulary", agePerVocabulary * 1.25);

  const estimatedAge = Math.round(
    (parseInt(agePerName) * 0.75 + parseInt(agePerVocabulary) * 1.25) / 2
  );

  return estimatedAge;
});

export const changeBotAnswerFromUserInfo = cache(async (answer, userId) => {
  const client = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
            Voici la liste des informations du client :
            ${JSON.stringify({
              age: client.age ? client.age : "non défini",
              name: client.name ? client.name : "non défini",
            })}
            La réponse prédéfinie qui devait être données par le bot était: ${answer}
            CHANGE la formulation de la réponse prédéfinie en fonction des informations du client ci-dessus.
            N'hésite pas a personnalisé le message 
            par exemple si la personne est plus agée que 45 ans tu utilise un vocabulaire plus formel et donne plus de détails sur la réponse.
            Si la personne est plus jeune que 45 ans tu utilise un vocabulaire plus familier et va droit au but. n'inclut aucune formule de politesse ou de signature dans la réponse.
          `,
        },
      ],
      model: "gpt-4o",
    });

    const botAnswer = response.choices[0]?.message?.content;

    // add this message to the database

    return botAnswer;
  } catch (error) {
    await prisma.message.create({
      data: {
        userId: client.id,
        sender: "bot",
        content: answer,
        contentIA: "",
      },
    });
  }
});

export const fakeScenario = cache(async (phone) => {
  // Une conversation à déja été enregistrée pour ce client avant son opération du genoux
  const conv = vieux;
  // A partir de cette conversation et vu que notre utilisateur n'as pas encore d'age on database on va essayer d'estimer son age
  const user = await setEstimatedAgeFromPrompt(conv, phone);
  console.log(
    `L'age ${user.isEstimated ? "éstimé " : ""} du client est ${user.age}`
  );
  // Récupérons notre scénario de suivi post-opératoire
  const scenario = await prisma.conversationScript.findMany({
    where: {
      operation: "genoux",
    },
  });
  console.log(
    "Le scénario de suivi post-opératoire est pour une opération du genoux"
  );
  // On va maintenant générer une conversation entre le bot et le client en utilisant le scénario de suivi post-opératoire en modifiant les réponses du bot en fonction des informations du client

  for (const message of scenario) {
    console.log("Le bot doit normalement envoyer: ", message.content);
    const answer = await changeBotAnswerFromUserInfo(message.content, user);
    console.log("Le bot aidé par l'IA a répondu  ", answer);
  }

  console.log("localhost:3000/questionnaires/1/answer?id=" + user.id);
});

// getAgeFromPrompt("Salut, comment ça va ?", "Robert").then((res) => {
//   console.log(res);
// });
