
import { bookConstants } from "./constants";
import axios from "../helpers/axios";
// import axios from "axios";
// const token = window.localStorage.getItem('token');
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllBooks = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`book`);

            if (res.status === 200) {
                dispatch({
                    type: bookConstants.GET_ALL_BOOKS,
                    payload: res.data
                });

            } else if (res.status === 204) {
                await toast.error(res.data.message, { autoClose: 2000 });
                dispatch({
                    type: bookConstants.GET_MESSAGE,
                    payload: res.data.message
                });
            }
        }
        catch (err) {
            {
                await toast.error(err?err:"Lỗi lấy danh sách sách", { autoClose: 2000 });
                dispatch({
                    type: bookConstants.GET_ERROR,
                    payload: { error: true }
                });
            }
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
export const putEditBook = (id, newbook, fd=null) => {
    return async dispatch => {
        try {
            const res = await axios.put(`book/${id}`, { ...newbook });

            console.log('>>>>cập nhật', newbook)

            if (res.status === 200) {
                if(fd != null) {
                axios.post("http://localhost:3000/upload", fd, {
                    onUploadProgress: progressEvent => {
                        console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
                    }
                }).then((e) => {
                    //setHinhAnh(ramdom+'_'+hinhAnh)
                    toast.success('Chỉnh sửa thành công', { autoClose: 2000 });
                    dispatch({
                        type: bookConstants.PUT_EDIT_BOOK,
                        payload: res.data
                    });
                })
                    .catch((e) => {
                        toast.error('Chỉnh sửa thất bại', { autoClose: 2000 });
                        console.error('Error', e)
                    })
                }
            }
        }
        catch (err) {
            {
                await toast.error(err.response.data.error, { autoClose: 2000 });
                console.log('lỗi edit sách', err.response.data.error)
                //error = err.response.data.error
                // setmessageError({
                //     hasError: true,
                //     message: err.response.data.error,
                // })
                dispatch({
                    type: bookConstants.GET_ERROR,
                    payload: err.response.data.error
                });
            }
        }


    }
}
export const AddBook = (newbook, fd) => {
    return async dispatch => {
        try {
            const res = await axios.post(`http://localhost:3000/admin/book`, { ...newbook });

            console.log('>>>>cập nhật', newbook)
            if (res.status === 200) {
                axios.post("http://localhost:3000/upload", fd, {
                    onUploadProgress: progressEvent => {
                        console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
                    }
                }).then((e) => {
                    //setHinhAnh(ramdom+'_'+hinhAnh)
                    toast.success('Thêm sách thành công', { autoClose: 2000 });
                    dispatch({
                        type: bookConstants.POST_ADD_BOOK,
                        payload: res.data.book
                    });
                })
                    .catch((e) => {
                        toast.error('Lưu thất bại', { autoClose: 2000 });
                        console.error('Errorooo', e)
                    })
            }
        }
        catch (err) {
            await toast.error(err.response.data.error, { autoClose: 2000 });
            console.log('lỗi thêm sách', err.response.data.error)
            //error = err.response.data.error
            // setmessageError({
            //     hasError: true,
            //     message: err.response.data.error,
            // })
            dispatch({
                type: bookConstants.GET_ERROR,
                payload: err.response.data.error
            });

        }

        // const { id } = payload.params;



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

export const getTop10Book = () => {
    return async dispatch => {
        // const { id } = payload.params;

        const res = await axios.get(`http://localhost:3000/book/top10`);

        console.log('danh sách sách đã được lấy', res)
        if (res.status === 200) {
            dispatch({
                type: bookConstants.GET_TOP10_BOOKS,
                payload: res.data.top10
            });
        } else {
            dispatch({
                type: bookConstants.GET_TOP10_BOOKS,
                payload: { error: res.data.message }
            });
        }

    }
}

export const deleteBookById = (id, setIsOpen) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`book/${id}`);

            if (res.status === 200) {
                await toast.success(res.data.message, { autoClose: 2000 });
                setIsOpen(false)
                dispatch({
                    type: bookConstants.DELETE_BOOK_BY_ID,
                    payload: res.data
                });

            }
        }
        catch (err) {
            {
                await toast.error(err.response.data.error, { autoClose: 2000 });
                dispatch({
                    type: bookConstants.GET_ERROR,
                    payload: { error: true }
                });
            }
        }
    }
}
