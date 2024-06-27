import {
  getQuestionnaire,
  getUserAnswerQuestionnaire,
} from "@/api/questionnaire";
import QuestionnaireFormView from "@/app/questionnaires/components/QuestionnaireFormView";

async function QuestionnaireFormAnswer({ params }) {
  const questionnaireId = params.id;
  const questionnaire = await getQuestionnaire(questionnaireId);


  return (
    <QuestionnaireFormView
      questionnaire={questionnaire}
    />
  );
}

export default QuestionnaireFormAnswer;
