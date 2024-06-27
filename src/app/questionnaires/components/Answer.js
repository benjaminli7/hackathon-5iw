import { Radio } from "@mantine/core";

function Answer({ form, choice, index }) {
  return (
    <Radio
      value={`${choice.id}`}
      label={choice.text}
      onChange={() => {
        form.setFieldValue(`responses.${index}`, {
          questionId: choice.questionId,
          answer: choice.text,
          choiceId: choice.id,
        });
      }}
    />
  );
}

export default Answer;
