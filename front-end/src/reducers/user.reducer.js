import { userContants } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false,
    userinfor: null,
    totalCurrentBill: null,
    paypal: null
}
export default (state = initState, action) => {
    switch (action.type) {
        case userContants.USER_REGISTER:
            state = {
                ...state,
                message: action.payload
            }
            break;
            // case userContants.USER_REGISTER_SUCCESS:
            //     state = {
            //         ...state,
            //         loading: false,
            //         message: action.payload.message
            //     }
            //     break;
            // case userContants.USER_REGISTER_FAILURE:
            // state = {
            //     ...state,
            //     loading: false,
            //     error: action.payload.error
            // }
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
            // case userContants.UPDATE_USER_INFO_SUCCESS:
            //     state = {
            //         ...state,
            //         userinfor: action.payload,
            //     }
            //     break;
            // case userContants.UPDATE_USER_INFO_FAIL:
            //     state = {
            //         ...state,
            //         error: action.payload.error

            //     }
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

    }
    return state;
}