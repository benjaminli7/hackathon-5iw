"use client";

import { addChoices } from "@/api/actions";
import QuestionnaireForm from "@/app/questionnaires/components/QuestionnaireForm";
import { Alert, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle } from "@tabler/icons-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

function QuestionnaireFormView({ questionnaire, userAge }) {
  const [id, setId] = useQueryState("id", parseAsInteger.withDefault(null));
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const questionsLength = questionnaire.questions.length;
  const form = useForm({
    initialValues: {
      responses: [],
    },
  });

  const handleSubmit = async (values) => {
    if (values.responses.length !== questionsLength) {
      setError({
        message: "Veuillez repondre à toutes les questions !",
      });
      return;
    } else {
      setError(null);
    }

    if (!id) {
      setError({
        message: "L'id de l'user est manquant",
      });
      return;
    }
    setLoading(true);
    const responses = values.responses.map((response) => {
      return {
        questionId: response.questionId,
        choiceId: response.choiceId,
        userId: id,
      };
    });
    let res = await addChoices(responses);
    if (res.success) {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Succès",
        message: "Vos retours ont bien été envoyés",
        color: "green",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <QuestionnaireForm form={form} questionnaire={questionnaire} />
        {error?.message && (
          <Alert
            variant="light"
            color="red"
            title={error.message}
            icon={<IconInfoCircle size={16} />}
          />
        )}
        <Button type="submit" mt={12} loading={loading}>
          Envoyer
        </Button>
      </Stack>
    </form>
  );
}

export default QuestionnaireFormView;
