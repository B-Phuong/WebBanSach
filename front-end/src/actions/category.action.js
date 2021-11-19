import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST })
        const res = await axios.get(`category/getcategories`);
        console.log(res);
        if (res.status === 200) {

            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        const res = await axios.post(`/category/create`, form)
        console.log(res);
    }
}

export const getAllCategories = () => {
    return async dispatch => {
        const res = await axios.get('http://localhost:3000/category/')
        if (res.status === 200) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES,
                payload: res.data
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES,
                payload: { error: true }
            });
        }
    }
}