import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategories = () => {
    return async dispatch => {
        const res = await axios.get(`/category/`)
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