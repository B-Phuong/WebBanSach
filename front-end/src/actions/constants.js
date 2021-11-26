export const authConstants = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE',
}

export const userContants = {
    USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
    GET_USER_INFO: 'GET_USER_INFO',
    GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
    GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
    UPDATE_USER_INFO_FAIL: 'UPDATE_USER_INFO_FAIL',
    GET_PAYPAL: 'GET_PAYPAL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD'

}

export const bookConstants = {
    GET_ALL_BOOKS: 'GET_ALL_BOOKS',
    GET_DETAIL_BOOK: 'GET_DETAIL_BOOK',
    PUT_EDIT_BOOK: 'PUT_EDIT_BOOK',
    POST_ADD_BOOK: 'POST_ADD_BOOK',
    GET_BOOK_BY_GENRES: 'GET_BOOK_BY_GENRES',
    GET_TOP10_BOOKS: 'GET_TOP10_BOOKS'

};
export const categoryConstants = {
    GET_ALL_CATEGORIES: 'GET_ALL_CATEGORIES'
}
export const publisherConstants = {
    GET_ALL_PUBLISHERS: 'GET_ALL_PUBLISHERS'
}

export const orderConstants = {
    GET_CUSTOMER_ORDER_REQUEST: "GET_CUSTOMER_ORDER_REQUEST",
    GET_CUSTOMER_ORDER_SUCCESS: "GET_CUSTOMER_ORDER_SUCCESS",
    GET_CUSTOMER_ORDER_FAILURE: "GET_CUSTOMER_ORDER_FAILURE",

    UPDATE_CUSTOMER_ORDER_REQUEST: "UPDATE_CUSTOMER_ORDER_REQUEST",
    UPDATE_CUSTOMER_ORDER_SUCCESS: "UPDATE_CUSTOMER_ORDER_SUCCESS",
    UPDATE_CUSTOMER_ORDER_FAILURE: "UPDATE_CUSTOMER_ORDER_FAILURE",
};