import { combineReducers } from "redux";
import destinationReducer from "./destinationReducer";

export default combineReducers({
  posts: destinationReducer
});
