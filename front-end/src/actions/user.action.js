import axiosIntance from "../helpers/axios";
import { authConstants, userContants } from "./constants"
import axios from "../helpers/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const signup = (user) => {
    console.log(user);
    return async (dispatch) => {
        //dispatch({ type: userContants.USER_REGISTER });
        try {
            const res = await axios.post(`auth/signup`, {
                ...user
            })

            if (res.status === 201) {
                const { message } = res.data;
                console.log('lỗi đăng kí', res)
                toast.success(message, { autoClose: 2000 });
                dispatch({
                    type: userContants.USER_REGISTER,
                    payload: message
                });
            }

        }
        catch (err) {
            console.log('lỗi đăng kí')
            toast.error(err.response.data.error, { autoClose: 2000 });
            // dispatch({
            //     type: userContants.GET_ERROR,
            //     payload: res.data.error
            // });


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

export const updatetUserInfo = (id, newinfo,setNguoiDung) => {
    console.log(id);
    return async (dispatch) => {
        //dispatch({ type: userContants.UPDATE_USER_INFO });
        try {
            const res = await axios.put(`user/${id}`, { ...newinfo })
            //const { message, error } = res.data;

            if (res.status === 200) {
                setNguoiDung(newinfo)
                await toast.success('Thành công', { autoClose: 2000 });
                dispatch({
                    type: userContants.UPDATE_USER_INFO,
                    payload: res.data
                });
            }
        }
        catch (err) {
            {
                //console.log(err)
                toast.error(err.response.data.error, { autoClose: 2000 });
                // dispatch({
                //     type: userContants.GET_ERROR,
                //     payload: err.response.data.error
                // });
            }
        }


    }
}

export const getPayPal = () => {
    //console.log(id);
    return async (dispatch) => {
        dispatch({ type: userContants.GET_PAYPAL });

        const res = await axios.get(`user/pay`)
        console.log('tổng tiền', res)
        //const { message, error } = res.data;
        if (res.status === 200) {
            dispatch({
                type: userContants.GET_PAYPAL,
                payload: res.data.total
            });
        } else {
            {
                dispatch({
                    type: userContants.GET_PAYPAL,
                    payload: res.data//{ error: message || error }
                });
            }
        }
    }
}

export const updatePassword = (id, newinfo) => {
    //console.log(id);
    return async (dispatch) => {
        try {
            dispatch({ type: userContants.UPDATE_PASSWORD });

            const res = await axios.put(`user/${id}/editpassword`, { ...newinfo })
            //console.log('tổng tiền', res)
            //const { message, error } = res.data;
            if (res.status === 200) {
                await toast.success(res.data.message, { autoClose: 2000 });
                dispatch({
                    type: userContants.UPDATE_PASSWORD,
                    payload: res.data
                });
            }
        }
        catch (err) {
            {
                await toast.error(err.response.data.error, { autoClose: 2000 });
            }
        }



    }
}