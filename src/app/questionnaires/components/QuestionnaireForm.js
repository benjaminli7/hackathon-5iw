import QuestionAnswer from "@/app/questionnaires/components/QuestionAnswer";
import { Stack, Title } from "@mantine/core";

function QuestionnaireForm({ form, questionnaire }) {
  return (
    <Stack>
      <Title order={3}>{questionnaire.title}</Title>

      <Stack>
        {questionnaire.questions.map((question, index) => (
          <QuestionAnswer form={form} key={question.id} question={question} index={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default QuestionnaireForm;
