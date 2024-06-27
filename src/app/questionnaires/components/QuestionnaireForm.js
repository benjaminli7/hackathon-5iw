import QuestionAnswer from "@/app/questionnaires/components/QuestionAnswer";
import { Stack, Title } from "@mantine/core";

function QuestionnaireForm({ form, questionnaire, isYoung }) {
  isYoung = true;


  const titleClass = isYoung ? 'm-4 text-4xl' : 'text-6xl font-semibold text-white-800 m-8';
  return (
    <Stack>
      <Title order={3} className={titleClass}>{questionnaire.title}</Title>

      <Stack>

        {questionnaire.questions.map((question, index) => (
          <QuestionAnswer form={form} key={question.id} question={question} index={index} isYoung={isYoung} />
        ))}
      </Stack>
    </Stack>
  );
}

export default QuestionnaireForm;
