
import { staffConstants } from "./constants";
import axios from "../helpers/axios";
// import axios from "axios";
// const token = window.localStorage.getItem('token');
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const getAllStaffs = () => {
    return async dispatch => {

        const res = await axios.get(`/admin/staff`);

        if (res.status === 200) {
            dispatch({
                type: staffConstants.GET_ALL_STAFFS,
                payload: res.data
            });
        } else {
            dispatch({
                type: staffConstants.GET_ALL_STAFFS,
                payload: { error: true }
            });
        }

    }
}

export const getDetailStaff = (id) => {
    return async dispatch => {
        // const { id } = payload.params;
        const res = await axios.get(`admin/staff/${id}`);
        console.log('lay')
        if (res.status === 200) {
            dispatch({
                type: staffConstants.GET_DETAIL_STAFF,
                payload: res.data
            });
        } else {
            dispatch({
                type: staffConstants.GET_DETAIL_STAFF,
                payload: { error: true }
            });
        }

    }
}
export const putEditStaff = (id, newstaff) => {
    return async dispatch => {
        try {
            const res = await axios.put(`admin/staff/${id}`, { ...newstaff });

            console.log('>>>>cập nhật', newstaff)
            if (res.status === 200) {
                await toast.success('Cập nhật thành công', { autoClose: 2000 });
                dispatch({
                    type: staffConstants.PUT_EDIT_STAFF,
                    payload: res.data
                });
            }
        }
        catch (err) {
            await toast.success(err.response.data.error, { autoClose: 2000 });
            dispatch({
                type: staffConstants.PUT_EDIT_STAFF,
                payload: { error: true }
            });
        }
        // const { id } = payload.params;




    }
}
export const AddStaff = (newstaff) => {
    return async dispatch => {
        // const { id } = payload.params;
        try {
            const res = await axios.post(`http://localhost:3000/admin/staff`, { ...newstaff });

            console.log('>>>>cập nhật', newstaff)
            if (res.status === 200) {
                await toast.success(res.data.message, { autoClose: 2000 });
                dispatch({
                    type: staffConstants.POST_ADD_STAFF,
                    payload: res.data.staff
                });
            }
        }
        catch (err) {
            await toast.success(err.response.data.error, { autoClose: 2000 });
            dispatch({
                type: staffConstants.POST_ADD_STAFF,
                payload: { error: err.data.message }
            });
        }
    }
}
// export const getBookByGenres = (genres) => {
//     return async dispatch => {
//         // const { id } = payload.params;
//         console.log('láy ds theo thể loại')
//         const res = await axios.get(`http://localhost:3000/book/search/${genres}`);

//         console.log('danh sách sách đã được lấy', res)
//         if (res.status === 200) {
//             dispatch({
//                 type: bookConstants.GET_BOOK_BY_GENRES,
//                 payload: res.data
//             });
//         } else {
//             dispatch({
//                 type: bookConstants.GET_BOOK_BY_GENRES,
//                 payload: { error: res.data.message }
//             });
//         }

//     }
// }


