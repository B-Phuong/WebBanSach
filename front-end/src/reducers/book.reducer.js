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
        case bookConstants.PUT_EDIT_BOOK:
            state = {
                ...state,
                // loading: false,
                bookDetails: action.payload[0],
            };

            break;
        case bookConstants.POST_ADD_BOOK:
            state = {
                ...state,
                books: [...state.books, action.payload],
                bookDetails: action.payload,
                // error: action.payload[0].error
            };

            break;
        case bookConstants.GET_BOOK_BY_GENRES:
            state = {
                ...state,
                books: action.payload,
                // error: action.payload[0].error
            };

            break;
    }
    return state;

};
