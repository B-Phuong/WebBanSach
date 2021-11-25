import axiosIntance from "../helpers/axios";
import { authConstants, userContants } from "./constants"
import axios from "../helpers/axios";
export const signup = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: userContants.USER_REGISTER_REQUEST });

        const res = await axios.post(`auth/signup`, {
            ...user
        })
        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: userContants.USER_REGISTER_SUCCESS,
                payload: { message }
            });
        } else {
            if (res.status = 400) {
                dispatch({
                    type: userContants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const getUserInfo = (id) => {
    console.log(id);
    return async (dispatch) => {
        dispatch({ type: userContants.GET_USER_INFO });

        const res = await axios.get(`user/${id}`)
        const { message } = res.data;
        if (res.status === 200) {
            dispatch({
                type: userContants.GET_USER_INFO_SUCCESS,
                payload: res.data
            });
        } else {
            {
                dispatch({
                    type: userContants.GET_USER_INFO_FAIL,
                    payload: { error: message }
                });
            }
        }
    }
}

export const updatetUserInfo = (id, newinfo) => {
    console.log(id);
    return async (dispatch) => {
        dispatch({ type: userContants.UPDATE_USER_INFO });

        const res = await axios.put(`user/${id}`, { ...newinfo })
        const { message, error } = res.data;
        if (res.status === 200) {
            dispatch({
                type: userContants.UPDATE_USER_INFO_SUCCESS,
                payload: res.data
            });
        } else {
            {
                dispatch({
                    type: userContants.UPDATE_USER_INFO_FAIL,
                    payload: { error: message || error }
                });
            }
        }
    }
}