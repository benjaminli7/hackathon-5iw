"use client";

import QuestionnaireForm from "@/app/questionnaires/components/QuestionnaireForm";
import { Alert, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

function QuestionnaireFormView({ questionnaire }) {
  const [error, setError] = useState(null);
  const questionsLength = questionnaire.questions.length;
  const form = useForm({
    initialValues: {
      responses: [],
    },
  });

  const handleSubmit = async (values) => {
    if (values.responses.length !== questionsLength) {
      setError(true);
    } else {
      setError(false);
    }
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <QuestionnaireForm form={form} questionnaire={questionnaire} />
        {error && (
          <Alert
            variant="light"
            color="red"
            title="Vous n'avez pas répondu à toutes les questions !"
            icon={<IconInfoCircle size={16} />}
            withCloseButton
          />
        )}
        <Button type="submit" mt={12}>
          Envoyer
        </Button>
      </Stack>
    </form>
  );
}

export default QuestionnaireFormView;
