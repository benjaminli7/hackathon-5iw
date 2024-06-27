"use client";
import Answer from "@/app/questionnaires/components/Answer";
import { Flex, Paper, Radio, Stack } from "@mantine/core";

function QuestionAnswer({ form, question, index, isYoung }) {
  const paperClass = isYoung ? "border border-solid border-2 border-orange-300 p-4" : "border-solid border-2 border-white-300 shadow-xs p-4";
  const radioClass = isYoung? "text-xl" : "text-4xl text-white-800 font-bold py-8 px-9 rounded ";
  console.log("radioClass", radioClass)
  return (
    <Paper className={paperClass}>
      <Stack>
        <Radio.Group classNames={{
          label: radioClass
        
        }} name={question.text} label={question.text} withAsterisk>
          <Flex direction="column" mt="xs" gap={12}>
            {question.choices.map((choice) => (
              <Answer key={choice.id} choice={choice} form={form} index={index}  isYoung={isYoung}/>
            ))}
          </Flex>
        </Radio.Group>
      </Stack>
    </Paper>
  );
}

export default QuestionAnswer;
