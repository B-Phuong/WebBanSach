
import { bookConstants } from "./constants";
import axios from "../helpers/axios";

export const getAllBooks = () => {
    return async dispatch => {

        const res = await axios.get(`book`);

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
        const res = await axios.get(`book/${id}`);
        console.log('lay')
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
export const putEditBook = (id, updatebook) => {
    return async dispatch => {
        // const { id } = payload.params;
        const res = await axios.put(`book/${id}`, { ...updatebook });

        console.log('>>>>cập nhật', updatebook)
        if (res.status === 200) {
            dispatch({
                type: bookConstants.PUT_EDIT_BOOK,
                payload: res.data
            });
        } else {
            dispatch({
                type: bookConstants.PUT_EDIT_BOOK,
                payload: { error: true }
            });
        }

    }
}
export const AddBook = (newbook) => {
    return async dispatch => {
        // const { id } = payload.params;
        console.log('trước khi dispatch')
        const res = await axios.post(`admin/book`, { ...newbook });

        console.log('sau khi dispatch', res)
        if (res.status === 200) {
            dispatch({
                type: bookConstants.POST_ADD_BOOK,
                payload: res.data.book
            });
        } else {
            dispatch({
                type: bookConstants.POST_ADD_BOOK,
                payload: { error: res.data.message }
            });
        }

    }
}