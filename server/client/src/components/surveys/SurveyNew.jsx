import { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyFormReview";

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);

  const renderContent = () => {
    if (showReview) {
      return <SurveyReview onSurveyCancel={() => setShowReview(false)} />;
    }

    return <SurveyForm onSurveySubmit={() => setShowReview(true)} />;
  };

  return <div>{renderContent()}</div>;
};

export default reduxForm({ form: "surveyForm" })(SurveyNew);
