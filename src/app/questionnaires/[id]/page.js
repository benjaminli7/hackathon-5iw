import QuestionAnswer from "@/app/questionnaires/components/QuestionAnswer";
import { Stack, Title } from "@mantine/core";

function Questionnaire({ params }) {
  const questionnaireId = params.id;
  return (
    <>
      <Stack>
        <Title>Questionnaire {questionnaireId}</Title>

        <Stack>
          <QuestionAnswer />
          <QuestionAnswer />
          <QuestionAnswer />
        </Stack>
      </Stack>
    </>
  );
}

export default Questionnaire;
