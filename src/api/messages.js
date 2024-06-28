"use server";
import prisma from "../../lib/prisma";
import { cache } from "react";
import { changeBotAnswerFromUserInfo } from "@/app/utils";
import { cp } from "fs";

export const getMsg = cache(async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId, 10) },
    include: { messages: true },
  });
  return user;
});

export const postMsg = cache(async (userId, content, sender, operation) => {
  const message = await prisma.message.create({
    data: {
      userId: parseInt(userId, 10),
      sender: sender,
      operation: operation,
      content: content,
      contentIA: "",
    },
  });

  // get the script by operation
  const script = await prisma.conversationScript.findMany({
    where: {
      operation: operation,
    },
  });
  console.log("Le script", script);
  //check if the ConversationScript exist for the script/ user
  const userScript = await prisma.userScriptProgress.findFirst({
    where: {
      userId: parseInt(userId, 10),
      scriptId: script[0].id,
    },
  });
  console.log("Le userScript", userScript);
  let updatedUserScript = null;
  if (userScript) {
    console.log("on met a jour le script");
    //currentStep = currentStep + 1
    updatedUserScript = await prisma.userScriptProgress.update({
      where: {
        id: userScript.id,
      },
      data: {
        currentStep: userScript.currentStep + 1,
      },
    });
  } else {
    //create a new userScriptProgress
    console.log("on crée un nouveau script");
    updatedUserScript = await prisma.userScriptProgress.create({
      data: {
        userId: parseInt(userId, 10),
        scriptId: script[0].id,
        currentStep: 1,
      },
    });
  }

  console.log("On récupère le script de l'operation");
  // get the next step of the script where order = currentStep
  const nextStep = await prisma.conversationScript.findFirst({
    where: {
      operation: operation,
      order: updatedUserScript.currentStep,
    },
  });

  // push the next to the message
  if (!nextStep) {
    console.log("Pas de prochaine étape on envoie le questionnaire");

    //create the message with the link to the form and return
    console.log("On ajoute le lien du questionnaire a la conversation");
    const msgLink = `Merci de répondre a ce questionnaire <a href="http://localhost:3000/questionnaires/1/answer?id=${userId}">questionnaire</a>`;
    const botmsg = await prisma.message.create({
      data: {
        userId: parseInt(userId, 10),
        sender: "bot",
        operation: operation,
        content: msgLink,
        contentIA: "",
      },
    });
    return { message, botmsg };
  }

  // on adapte la réponse du bot en fonction des informations du client
  const newFormulation = await changeBotAnswerFromUserInfo(
    nextStep.content,
    userId
  );

  //On créé le message
  console.log("On créé le message du bot");
  const botmsg = await prisma.message.create({
    data: {
      userId: parseInt(userId, 10),
      sender: "bot",
      operation: operation,
      content: nextStep.content,
      contentIA: newFormulation,
    },
  });

  return { message, botmsg };
});
