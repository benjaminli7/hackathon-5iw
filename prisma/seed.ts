import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  try {
    // Read questions from JSON file
    const data = await fs.readFile(__dirname+'/questionnaire.json', 'utf8');
    const questions = JSON.parse(data);

    // Seed users
    const users = [
      {
        email: "test@test.fr",
        name: "Test",
        age: 25,
      },
    ];

    for (const user of users) {
      await prisma.user.create({ data: user });
    }

    // Seed questions
    // create a questionnaire
    await prisma.questionnaire.create({
      data: {
        title: "Questionnaire de santé",
        description: "Questionnaire de santé pour évaluer la douleur au genou",
        questions: {
          create: questions,
        },
      },
    });


    // Seed responses
    // const responses = [
    //   {
    //     questionId: 1,
    //     questionnaireId: 1,
    //     userId: 1,
    //     answer: "Légère douleur",
    //   },
    //   {
    //     questionId: 2,
    //     questionnaireId: 1,
    //     userId: 1,
    //     answer: "Oui, je peux plier mon genou sans douleur",
    //   },
    //   {
    //     questionId: 3,
    //     questionnaireId: 1,
    //     userId: 1,
    //     answer: "Non, pas de gonflement",
    //   }
    // ];

    // for (const response of responses) {
    //   await prisma.response.create({
    //     data: {
    //       questionId: response.questionId,
    //       questionnaireId: response.questionnaireId,
    //       userId: response.userId,
    //       answer: response.answer,
    //     },
    //   });
    // }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error; // Ensure process exits with non-zero code on error
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
