import { staffConstants } from "../actions/constants";

const initState = {
    staffs: [],
    // productsByPrice: {},
    //pageRequest: false,
    //page: {},
    error: null,
    staffDetails: {},
    //loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case staffConstants.GET_ALL_STAFFS:
            state = {
                ...state,
                // loading: false,
                staffs: action.payload,
            };
            break;
        case staffConstants.GET_DETAIL_STAFF:
            console.log('té',action)
            state = {
                ...state,
                // loading: false,
                staffDetails: action.payload[0],
            };

            break;
        case staffConstants.PUT_EDIT_STAFF:
            state = {
                ...state,
                // loading: false,
                staffDetails: action.payload[0],
            };

            break;
        case staffConstants.POST_ADD_STAFF:
            state = {
                ...state,
                staffs: [...state.staffs, action.payload],
                staffDetails: action.payload,
                // error: action.payload[0].error
            };

            break;
        
    }
    return state;

};
