import axios from "axios";
import {
  GET_DESTINATIONS,
  NEW_DESTINATION,
  DELETE_DESTINATION,
  GET_ERRORS,
  DESTINATION_LOADING,
  CLEAR_ERRORS
} from "./types";

//Get locations
export const fetchPosts = () => dispatch => {
  dispatch(setDestinationLoading());
  axios
    .get("/api/locations")
    .then(res =>
      dispatch({
        type: GET_DESTINATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DESTINATIONS,
        payload: null
      })
    );
};

//Create location
export const createDestination = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/locations", postData)
    .then(res =>
      dispatch({
        type: NEW_DESTINATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete location
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/locations/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_DESTINATION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set loading state
export const setDestinationLoading = () => {
  return {
    type: DESTINATION_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
