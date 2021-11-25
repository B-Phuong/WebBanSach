
import { bookConstants } from "./constants";
import axios from "../helpers/axios";
// import axios from "axios";
// const token = window.localStorage.getItem('token');



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
export const putEditBook = (id, newbook) => {
    return async dispatch => {
        // const { id } = payload.params;
        const res = await axios.put(`book/${id}`, { ...newbook });

        console.log('>>>>cập nhật', newbook)
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
        const res = await axios.post(`http://localhost:3000/admin/book`, { ...newbook });

        console.log('>>>>cập nhật', newbook)
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
export const getBookByGenres = (genres) => {
    return async dispatch => {
        // const { id } = payload.params;
        console.log('láy ds theo thể loại')
        const res = await axios.get(`http://localhost:3000/book/search/${genres}`);

        console.log('danh sách sách đã được lấy', res)
        if (res.status === 200) {
            dispatch({
                type: bookConstants.GET_BOOK_BY_GENRES,
                payload: res.data
            });
        } else {
            dispatch({
                type: bookConstants.GET_BOOK_BY_GENRES,
                payload: { error: res.data.message }
            });
        }

    }
}
