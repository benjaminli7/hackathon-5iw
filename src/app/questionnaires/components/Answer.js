import {Radio} from "@mantine/core";


function Answer({ form, choice, index, isYoung }) {
  const radioClass = isYoung
    ? ""
    : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-8 px-9 rounded text-8xl";
  const labelClass = isYoung ? "" : "text-xl font-semibold text-black-800";
  return (
    <Radio
      classNames={{
        label: labelClass,
      }}
      className={radioClass}
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
