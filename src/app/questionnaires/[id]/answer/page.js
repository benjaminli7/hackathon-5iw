import { getUserAge } from "@/api/users";

import {
  getQuestionnaire,
  getUserAnswerQuestionnaire,
} from "@/api/questionnaire";

import QuestionnaireFormView from "@/app/questionnaires/components/QuestionnaireFormView";

async function QuestionnaireFormAnswer({ params, searchParams }) {
  const questionnaireId = params.id;
  const questionnaire = await getQuestionnaire(questionnaireId);
  const userAge = await getUserAge(searchParams.id);
  return <QuestionnaireFormView questionnaire={questionnaire} age={userAge} />;
}

export default QuestionnaireFormAnswer;
