import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fecthSurveys } from "../../actions";

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys || []);

  console.log(surveys);

  useEffect(() => {
    dispatch(fecthSurveys());
  }, [dispatch]);

  return (
    <div>
      <h2>Survey List</h2>
      {surveys.reverse().map((survey) => (
        <div key={survey._id} className="card darken-1">
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
