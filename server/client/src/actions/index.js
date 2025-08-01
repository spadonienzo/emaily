import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/current_user");
    return dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  };
};

export const handleToken = (token) => {
  return async function (dispatch) {
    const response = await axios.post("/api/stripe", token);
    return dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  };
};

export const fecthSurveys = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/api/surveys");
      console.log(response);
      return dispatch({
        type: FETCH_SURVEYS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createSurvey = (surveyData, history) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/api/surveys", surveyData);
      console.log(response);
      history.push("/surveys");
      return dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
