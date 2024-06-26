import QuestionnairesTable from "@/app/questionnaires/components/QuestionnairesTable";
import { Stack, Title } from "@mantine/core";

function QuestionnaireList() {
  return (
    <>
      <Stack>
        <Title>Liste des questionnaires</Title>
        <QuestionnairesTable />
      </Stack>
    </>
  );
}

export default QuestionnaireList;
