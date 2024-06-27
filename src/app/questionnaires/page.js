import { getQuestionnaires } from "@/api/questionnaire";
import QuestionnairesTable from "@/app/questionnaires/components/QuestionnairesTable";
import { Stack, Title } from "@mantine/core";


async function QuestionnaireList() {
  const questionnaires = await getQuestionnaires();

  return (
    <>
      <Stack>
        <Title>Liste des questionnaires</Title>
        <QuestionnairesTable questionnaires={questionnaires} />
      </Stack>
    </>
  );
}

export default QuestionnaireList;
