"use server";
import prisma from "@/../lib/prisma";

export async function addChoices(values) {
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: values[0].userId,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          id: values[0].userId,
        },
      });
    }

    values.map(async (value) => {
      const response = await prisma.response.findFirst({
        where: {
          userId: value.userId,
          choice: {
            questionId: value.questionId,
          },
        },
      });

      if(response) {
        await prisma.response.update({
          where: {
            id: response.id
          },
          data: {
            choice: {
              connect: {
                id: value.choiceId
              }
            }
          }
        })
      } else {

        await prisma.response.create({
            data: {
            user: {
                connect: {
                id: value.userId,
                },
            },
            choice: {
                connect: {
                id: value.choiceId,
                },
            },
            },
        });
      }

    });

    return {
      success: true,
    }
  } catch (e) {
    console.log(e.message);
    return {
      error: e.message,
    };
  }
}
