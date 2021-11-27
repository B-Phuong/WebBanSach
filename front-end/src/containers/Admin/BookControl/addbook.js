import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../../components/UI/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom'
import BookControl from './bookcontrol'
import './bookcontrol.css'
import { AddBook, getAllCategories, getAllPublishers } from '../../../actions';



export const BookAdd = (props) => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const err = useSelector(state => state.book.error)
    const categories = useSelector(state => state.category.categories);
    const publishers = useSelector(state => state.publisher.publishers);
    const [tenSach, setTenSach] = useState('');
    const [giaTien, setGiaTien] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [moTa, setMoTa] = useState('');
    const [tacGia, setTacGia] = useState('');
    const [soLuongConLai, setSoLuongConLai] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    //const [maDanhMucCon, setMaDanhMucCon] = useState('');
    //const [giaTri, setGiaTri] = useState('')

    useEffect(() => {
        dispatch(getAllCategories())

    }, []);
    useEffect(() => {
        dispatch(getAllPublishers())
    }, []);

    const addBook = async(e) => {
        e.preventDefault();
        let indexDM = document.getElementById('maDanhMucCon');
        let indexNXB = document.getElementById('maNhaXuatBan');
        //setGiaTri(index.options[index.selectedIndex].value);
        setErrorMessage(err)
        const newbook = {
            tenSach,
            giaTien, giamGia, moTa, hinhAnh, tacGia, soLuongConLai,
            maNhaXuatBan: indexNXB.options[indexNXB.selectedIndex].value,
            maDanhMucCon: indexDM.options[indexDM.selectedIndex].value
        }
        console.log('mã danh mục con', newbook.maDanhMucCon)
        console.log('mã nhà xuất bản', newbook.maNhaXuatBan)
        console.log('>>sách mới:', newbook);
        //const update = JSON.stringify(updatebook)
        await dispatch(AddBook(newbook))
        //await setErrorMessage(err)
                //setmessageError(loi)
        // if(errorMessage) {
        //     console.log("CÓ lối rồi tiến")
        //     await toast.success(errorMessage);
        // }
        //props.history.push('/admin/book/all')
        //setSach(update)

    }



    // const [error, setError] = useState('');
    return (
        <>
            <BookControl />
            {/* <ErrorHandler coLoi={''} /> */}
            <Form id='form-addbook' onSubmit={addBook} >
                {/* <Form onSubmit={userSignp}> */}
                <Input
                    Label="Tên sách"
                    placeholder="Nhập tên sách"
                    value={tenSach}
                    type="text"
                    onChange={(e) => setTenSach(e.target.value)}
                />
                <Input
                    Label="Giá tiền"
                    placeholder="Nhập giá tiền"
                    value={giaTien}
                    type="number"
                    min="0"
                    onChange={(e) => setGiaTien(e.target.value)}
                />
                <Input
                    Label="Giảm giá (%)"
                    placeholder="Nhập phần trăm giảm giá"
                    value={giamGia}
                    type="number"
                    min="0"
                    onChange={(e) => setGiamGia(e.target.value)}
                />
                {/* <Input
                    Label="Mô tả"
                    placeholder="Mô tả cho sách"
                    value={book.moTa}
                    type="text"
                 onChange={(e) => setMatkhau(e.target.value)}
                /> */}
                <div>Mô tả</div>
                <textarea
                    Label="Mô tả"
                    placeholder="Mô tả cho sách"
                    value={moTa}
                    type="text"
                    onChange={(e) => setMoTa(e.target.value)}
                />

                <Input
                    type="file"
                    accept=".jpg, .png"
                    Label="Hình ảnh"
                    name='hinhAnh'
                    // value={''}
                    onChange={(event) => {
                        console.log('tên hình:', event.target.files[0].name);
                        setHinhAnh(event.target.files[0].name);
                    }}
                // onChange={(e) => setHinhAnh(e.target.value)}
                />
                <Input
                    Label="Tác giả"
                    placeholder="Nhập tên tác giả"
                    value={tacGia}
                    type="text"
                    onChange={(e) => setTacGia(e.target.value)}
                />
                <div>Chọn nhà xuất bản:</div>

                <select id='maNhaXuatBan'>
                    {publishers.map((publisher, index) =>
                        <>
                            <option value={publisher._id}>{publisher.tenNhaXuatBan}</option>

                        </>

                    )}

                </select>
                {/* <Label for="">Chọn danh mục con:</Label> */}
                <div>Chọn danh mục con:</div>

                <select id='maDanhMucCon'>
                    {categories.map((category, index) =>
                        <>
                            {category.danhMucCon.map((genres) =>
                                <option value={genres._id}>{genres.tenTheLoai}</option>

                            )}
                        </>
                    )}

                </select>
                <Input
                    Label="Số lượng còn lại"
                    placeholder="Nhập số lượng"
                    value={soLuongConLai}
                    type="number"
                    min="0"
                    onChange={(e) => setSoLuongConLai(e.target.value)}
                />

                <Form.Group className="mb-3" >
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ToastContainer />                    
        </>


    )

}

export default BookAdd