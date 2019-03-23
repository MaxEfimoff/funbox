import {
  GET_DESTINATIONS,
  DELETE_POST,
  NEW_DESTINATION
} from "../actions/types";

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DESTINATIONS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_DESTINATION:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
