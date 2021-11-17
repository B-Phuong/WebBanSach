import { bookConstants } from "./constants";
import axios from "axios";

export const getAllBooks = () => { //test thử 1 cuốn
    return async dispatch => {
        const res = await axios.get('http://localhost:3000/book');

        if (res.status === 200) {
            dispatch({
                type: bookConstants.GET_ALL_BOOKS,
                payload: res.data
            });
        } else {
            dispatch({
                type: bookConstants.GET_ALL_BOOKS,
                payload: { error: true }
            });
        }

    }
}

export const getDetailBook = (id) => {
    return async dispatch => {
        // const { id } = payload.params;
        const res = await axios.get(`http://localhost:3000/book/${id}`);

        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: bookConstants.GET_DETAIL_BOOK,
                payload: res.data
            });
        } else {
            dispatch({
                type: bookConstants.GET_DETAIL_BOOK,
                payload: { error: true }
            });
        }

    }
}