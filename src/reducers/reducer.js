import { START_APP } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_APP:
    default:
      return state;
  }
}
