import Answer from "@/app/questionnaires/components/Answer";
import Question from "@/app/questionnaires/components/Question";
import { Paper } from "@mantine/core";

function QuestionAnswer() {
  return (
    <Paper withBorder shadow="xs" p="xl">
      <Question />

      <Answer />
      <Answer />
      <Answer />
      <Answer />
    </Paper>
  );
}

export default QuestionAnswer;
