import { bookConstants } from "../actions/constants";

const initState = {
    books: [],
    // productsByPrice: {},
    //pageRequest: false,
    //page: {},
    error: null,
    bookDetails: {},
    //loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case bookConstants.GET_ALL_BOOKS:
            state = {
                ...state,
                // loading: false,
                books: action.payload,
            };
            break;
        case bookConstants.GET_DETAIL_BOOK:
            state = {
                ...state,
                // loading: false,
                bookDetails: action.payload[0],
            };

            break;
    }
    return state;

};
