import axiosIntance from "../helpers/axios";
import { authConstants } from "./constants"
import axios from "../helpers/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const homelogin = (user) => {
    console.log(user);
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST });

            const res = await axios.post(`auth/signin`, {
                ...user
            })
            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                toast.success(res.data.message, { autoClose: 2000 });
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            }
        }
        catch (err) {
            toast.error(err.response.data.error, { autoClose: 2000 });
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: err.response.data.message }
            });
        }


    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Đăng nhập thất bại' }
            });
        }
    }
}

export const homesignout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        localStorage.clear();
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
}
