import React from "react";
import { useDispatch, useSelector } from "react-redux";
import formFields from "./formFields";
import { createSurvey } from "../../actions/index";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const SurveyReview = ({ onSurveyCancel, history }) => {
  const dispatch = useDispatch();
  const formValues = useSelector(
    (state) => state.form.surveyForm?.values || {}
  );

  const handlecreateSurvey = async (event) => {
    event.preventDefault();
    dispatch(createSurvey(formValues, history));
  };

  const reviewFields = formFields.map((field) => (
    <div key={field.name}>
      <label>{field.label}</label>
      <div>{formValues[field.name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onSurveyCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={handlecreateSurvey}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default withRouter(SurveyReview);
