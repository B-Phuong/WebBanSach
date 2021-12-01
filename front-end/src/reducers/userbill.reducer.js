import { userBillConstants } from "../actions/constants";

const initState = {
  data: [],
  billFetching: false,
  error: null,
};
export default (state = initState, action) => {
    switch (action.type) {
        case userBillConstants.USER_BILL_REQUEST:
            state ={
                ...state,
                billFetching: true
            }
        break;
        case userBillConstants.USER_BILL_SUCCESS:
            state={
                ...state,
                data: action.payload.data,
                billFetching: false
            }
        break;
        case userBillConstants.USER_BILL_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                billFetching: false
            }

    }
    return state;
}