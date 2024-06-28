import { PrismaClient } from '@prisma/client';
import fs from 'fs';


const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      email: 'patient@example.com',
      phoneNumber: '+33612345678',
      name: 'Timméo '
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'patient2@example.com',
      phoneNumber: '+3393032021',
      name: 'Jean-Jacques'
    },
  });

  // Créer un questionnaire
  const questionnaire = await prisma.questionnaire.create({
    data: {
      title: 'Questionnaire Post-Opératoire Chirurgie du Genou',
      description: 'Ce questionnaire vise à recueillir les retours des patients après une chirurgie du genou.',
      operation: 'genoux',
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


  // Création d'un script de conversation pour une opération du genou
  const script = [
    {
      operation: "genoux",
      order: 1,
      content: "Seriez vous apte a répondre a un formulaire plus détaillé ?"
    },
    {
      operation: "genoux",
      order: 2,
      content: "Votre plaie s'est elle bien refermé depuis l'opération ?"
    },
    {
      operation: "genoux",
      order: 3,
      content: "D'accord je note, avez vous d'autres remarques à faire ?"
    }
  ];

  for (const content of script) {
    await prisma.conversationScript.create({
      data: {
        operation: content.operation,
        order: content.order,
        content: content.content
      }
    });
  }

  // Exemples de messages de l'utilisateur

  const conversation =  fs.readFileSync('./prisma/conversation.json',  'utf8');
  
  for(const content of JSON.parse(conversation)){
    await prisma.message.create({
      data: {
        user: {
          connect: {
            id: content.userId
          }
        },
        sender: content.sender,
        operation: content.operation,
        content: content.content,
        contentIA: ""
      }
    });
  }

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
