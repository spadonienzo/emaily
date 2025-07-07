import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return async function (dispatch) {
    const response = await axios.get("/api/current_user");
    return dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  };
};
