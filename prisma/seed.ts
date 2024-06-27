import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      email: 'patient1@example.com',
      name: 'John Doe',
      phoneNumber: '123-456-7890'
    },
  });

  // Créer un questionnaire
  const questionnaire = await prisma.questionnaire.create({
    data: {
      title: 'Questionnaire Post-Opératoire Chirurgie du Genou',
      description: 'Ce questionnaire vise à recueillir les retours des patients après une chirurgie du genou.',
      questions: {
        create: [
          {
            text: 'Comment évalueriez-vous votre douleur sur une échelle de 1 à 4 ?',
            choices: {
              create: [
                { text: '1' },
                { text: '2' },
                { text: '3' },
                { text: '4' },
              ]
            }
          },
          {
            text: 'Êtes-vous satisfait de l\'amplitude de mouvement de votre genou ?',
            choices: {
              create: [
                { text: 'Très insatisfait' },
                { text: 'Insatisfait' },
                { text: 'Neutre' },
                { text: 'Satisfait' },
                { text: 'Très satisfait' }
              ]
            }
          },
          {
            text: 'Avez-vous ressenti un gonflement du genou ?',
            choices: {
              create: [
                { text: 'Oui' },
                { text: 'Non' }
              ]
            }
          },
          {
            text: 'Pouvez-vous marcher sans assistance ?',
            choices: {
              create: [
                { text: 'Oui' },
                { text: 'Non' }
              ]
            }
          }
        ]
      }
    },
  });

  // Exemples de réponses de l'utilisateur
  await prisma.response.create({
    data: {
      userId: user.id,
      choiceId: (await prisma.choice.findFirst({ where: { text: '1', question: { text: 'Comment évalueriez-vous votre douleur sur une échelle de 1 à 4 ?' } } }))?.id!
    },
  });

  await prisma.response.create({
    data: {
      userId: user.id,
      choiceId: (await prisma.choice.findFirst({ where: { text: 'Satisfait', question: { text: 'Êtes-vous satisfait de l\'amplitude de mouvement de votre genou ?' } } }))?.id!
    },
  });

  await prisma.response.create({
    data: {
      userId: user.id,
      choiceId: (await prisma.choice.findFirst({ where: { text: 'Non', question: { text: 'Avez-vous ressenti un gonflement du genou ?' } } }))?.id!
    },
  });

  await prisma.response.create({
    data: {
      userId: user.id,
      choiceId: (await prisma.choice.findFirst({ where: { text: 'Oui', question: { text: 'Pouvez-vous marcher sans assistance ?' } } }))?.id!
    },
  });

  // Exemples de messages de l'utilisateur
  await prisma.message.createMany({
    data: [
      {
        userId: user.id,
        sender: 'John Doe',
        content: 'Bonjour, j\'ai quelques questions concernant mon traitement.',
        timestamp: new Date()
      },
      {
        userId: user.id,
        sender: 'John Doe',
        content: 'Je ressens encore une douleur après l\'opération.',
        timestamp: new Date()
      },
      {
        userId: user.id,
        sender: 'Bot',
        content: 'Bonjour John, pouvez-vous préciser l\'intensité de la douleur sur une échelle de 1 à 10 ?',
        timestamp: new Date()
      },
      {
        userId: user.id,
        sender: 'John Doe',
        content: 'Je dirais que c\'est environ 7.',
        timestamp: new Date()
      },
      {
        userId: user.id,
        sender: 'Bot',
        content: 'Merci pour votre retour, nous allons ajuster votre traitement en conséquence.',
        timestamp: new Date()
      }
    ]
  });

  console.log('La base de données a été initialisée avec des utilisateurs, des réponses et des messages. 🌱');
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
