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

export const getUserAnswerQuestionnaire = cache(async (userId, questionnaireId) => {
  const responses = await prisma.response.findMany({
    where: {
      userId: userId,
      choice: {
        question: {
          questionnaireId: questionnaireId,
        },
      },
    },
    include: {
      choice: {
        include: {
          question: true,
        },
      },
    },
  });

  return responses.map((response) => ({
    questionId: response.choice.question.id,
    choiceId: response.choice.id,
  }));
})