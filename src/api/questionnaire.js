import { cache } from "react";
import prisma from "../../lib/prisma";

export const getQuestionnaires = cache(async () => {
  const questionnaires = await prisma.questionnaire.findMany({
    include: {
      questions: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  return questionnaires;
});

export const getQuestionnaire = cache(async (id) => {
  const questionnaire = await prisma.questionnaire.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      questions: {
        include: {
          choices: true,
        },
      },
    },
  });
  return questionnaire;
})