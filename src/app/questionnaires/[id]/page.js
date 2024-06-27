import { getQuestionnaire } from "@/api/questionnaire";
import QuestionnaireForm from "@/app/questionnaires/components/QuestionnaireForm";


async function Questionnaire({ params }) {
  const questionnaireId = params.id;
  const questionnaire = await getQuestionnaire(questionnaireId);

  return <QuestionnaireForm questionnaire={questionnaire} />;
}

export default Questionnaire;
