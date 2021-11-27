import { orderConstants } from "../actions/constants";

const initState = {
  bills: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        bills: action.payload.bills,
      };
      break;
  }

  return state;
};