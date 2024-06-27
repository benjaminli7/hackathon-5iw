"use client";
import Answer from "@/app/questionnaires/components/Answer";
import { Flex, Paper, Radio, Stack } from "@mantine/core";

function QuestionAnswer({ form, question, index }) {
  return (
    <Paper withBorder shadow="xs" p="xl">
      <Stack>
        <Radio.Group name={question.text} label={question.text} withAsterisk>
          <Flex direction="column" mt="xs" gap={12}>
            {question.choices.map((choice) => (
              <Answer key={choice.id} choice={choice} form={form} index={index} />
            ))}
          </Flex>
        </Radio.Group>
      </Stack>
    </Paper>
  );
}

export default QuestionAnswer;
