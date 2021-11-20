import { homeauthConstants } from "./constants"
import axios from "../helpers/axios";
export const homelogin = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: homeauthConstants.HOME_LOGIN_REQUEST });

        const res = await axios.post(`auth/signin`, {
            ...user
        })
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: homeauthConstants.HOME_LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            if (res.status = 400) {
                dispatch({
                    type: homeauthConstants.HOME_LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: homeauthConstants.HOME_LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: homeauthConstants.HOME_LOGIN_FAILURE,
                payload: { error: 'Đăng nhập thất bại' }
            });
        }
    }
}

export const homesignout = () => {
    return async dispatch => {

        dispatch({type: homeauthConstants.HOME_LOGOUT_REQUEST});
        const res = await axios.post(`auth/signout`);

        if (res.status === 200) {
            localStorage.clear();
            dispatch({type: homeauthConstants.HOME_LOGOUT_SUCCESS});
        } else {
            dispatch({
                type: homeauthConstants.HOME_LOGOUT_FAILURE,
                payload:{error:res.data.error}
            });
        }

    }
}