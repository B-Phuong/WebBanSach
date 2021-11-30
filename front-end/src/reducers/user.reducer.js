import { act } from "react-dom/test-utils";
import { userContants } from "../actions/constants"

const initState = {
    error: null,
    bills: [],
    message: '',
    loading: false,
    userinfor: null,
    totalCurrentBill: null,
    paypal: null,
    orderFetching:false
    
}
export default (state = initState, action) => {
    switch (action.type) {
        case userContants.USER_REGISTER:
            state = {
                ...state,
                message: action.payload
            }
            break;
        case userContants.GET_USER_INFO:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userContants.GET_USER_INFO_SUCCESS:
            state = {
                ...state,
                userinfor: action.payload,
            }
            break;
        case userContants.GET_USER_INFO_FAIL:
            state = {
                ...state,
                error: action.payload.error

            }
            break;
        case userContants.UPDATE_USER_INFO:
            state = {
                ...state,
                userinfor: action.payload
            }
            break;
        case userContants.GET_PAYPAL:
            state = {
                ...state,
                totalCurrentBill: action.payload
            }
            break;
        case userContants.UPDATE_PASSWORD:
            state = {
                ...state,
                userinfor: action.payload
            }
            break;
        case userContants.GET_USER_ORDER_REQUEST:
            state ={
                ...state,
                orderFetching: true,
            }
            break;
        case userContants.GET_USER_ORDER_FAILURE:
            state ={
                ...state,
                error: action.payload.error,
                orderFetching: false
            }
            break;
        case userContants.GET_USER_ORDER_SUCCESS:
            state={
                ...state,
                bills: action.payload.bills,
                orderFetching: false
            }
            break;

    }
    return state;
}