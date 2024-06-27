import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      email: 'patient@example.com',
      phoneNumber: '+33612345678',
      name: 'Jean Dupont'
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
      choiceId: (await prisma.choice.findFirst({ where: { text: '4', question: { text: 'Comment évalueriez-vous votre douleur sur une échelle de 1 à 4 ?' } } }))?.id!
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


  // creation d'un script de conversation pour une opération du genoux
  const script = [
    {
      "operation": "genoux",
      "order": 1,
      "content" :  "Bonjour, suite à votre opération du genoux nous souhaitons prendre de vos nouvelles. Ensuite nous vous enverrons un questionnaire pour évaluer votre état de santé."
    },
    {
      "operation": "genoux",
      "order": 2,
      "content" :  "Comment allez vous depuis votre opération ?"
    },
    {
      "operation": "genoux",
      "order": 3,
      "content" :  "Avez vous pris le rendez vous avec le kiné ?"
    }
  ]
  
  for(const content of script){
    await prisma.conversationScript.create({
      data: {
        operation: content.operation,
        order: content.order,
        content: content.content
      }
    })
  }


  console.log('La base de données a été initialisée. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
