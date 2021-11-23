import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../../components/UI/input';
import BookControl from './bookcontrol'
import './bookcontrol.css'
import { putEditBook, getDetailBook } from '../../../actions';

import axios from '../../../helpers/axios';


export const BookEdit = (props) => {

    const dispatch = useDispatch();
    //let book, maNhaXuatBan, maDanhMucCon;// = useSelector(state => state.book.bookDetails);
    let book = useSelector(state => state.book.bookDetails);
    //const [book, setBook] = useState('')
    const [tenSach, setTenSach] = useState('');
    const [giaTien, setGiaTien] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [moTa, setMoTa] = useState('');
    const [tacGia, setTacGia] = useState('');
    const [soLuongConLai, setSoLuongConLai] = useState('');
    useEffect(() => {

        const { id } = props.match.params;
        console.log(id);

        dispatch(getDetailBook(id));
        axios.get(`/book/${id}`)
            .then(res => {
                if (res.status === 200) {
                    book = res.data[0]
                    //setBook(res.data[0])
                    setTenSach(book.tenSach)
                    setGiaTien(book.giaTien)
                    setGiamGia(book.giamGia)
                    setHinhAnh(book.hinhAnh)
                    setMoTa(book.moTa)
                    setTacGia(book.tacGia)
                    setSoLuongConLai(book.soLuongConLai)
                    console.log('lấy chi tiết', res.data[0])
                }
            })
            .catch(err => console.log('Lỗi'))

        // const b = store.getState().book.bookDetails;
        // console.log('state', b)
        // setBook(b)

    }, []);
    console.log('>>trước khi cập nhật', book)
    // // let update;
    // const update = (e) => {
    //     e.preventDefault();

    //     console.log(e.target.tenSach)
    //     //setTenSach(e.target.value)
    //     setBook({ ...book, tenSach })//[e.target.name]: e.target.value })//{
    //     //     ...book,
    //     //     [e.target.name]: e.target.value,
    //     //     //hinhAnh: e.target.name.hinhAnh.files[0].name
    //     // }
    //     // setbook(book)
    // }
    const updateBook = (e) => {
        e.preventDefault();
        const { id } = props.match.params;
        console.log('id', id)
        const updatebook = {
            ...book,
            tenSach,
            giaTien, giamGia, hinhAnh, moTa, tacGia, soLuongConLai
        }
        console.log('>>trước khi cập nhật', book)
        console.log('>>sẽ cập nhật:', updatebook);
        //const update = JSON.stringify(updatebook)
        dispatch(putEditBook(id, updatebook));
        //setSach(update)
        props.history.push('/admin/book/all')
    }

    // const [error, setError] = useState('');
    return (
        <>
            <BookControl />
            { }
            <Form id='form-editbook' onSubmit={updateBook}>
                {/* <Form onSubmit={userSignp}> */}
                <Input
                    Label="Tên sách"
                    placeholder="Nhập tên sách"
                    value={tenSach}
                    type="text"
                    name='tenSach'
                    onChange={(e) => setTenSach(e.target.value)}  /*(e) => setTenSach(e.target.value) */
                />
                <Input
                    Label="Giá tiền"
                    placeholder="Nhập giá tiền"
                    value={giaTien}
                    name='giaTien'
                    type="number"
                    onChange={(e) => setGiaTien(e.target.value)} /**(e) => setGiaTien(e.target.value) */
                />
                <Input
                    Label="Giảm giá (%)"
                    placeholder="Nhập phần trăm giảm giá"
                    value={giamGia}
                    type="number"
                    name='giamGia'
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
                    name='moTa'
                    type="text"
                    onChange={(e) => setMoTa(e.target.value)}
                />

                <Input
                    type="file"
                    accept=".jpg, .png"
                    Label="Hình ảnh"
                    placeholder=''
                    name='hinhAnh'
                    onChange={(e) => {
                        console.log('tên hình:', e.target.files[0].name);
                        setHinhAnh(e.target.files[0].name);
                    }}
                // onChange={(e) => setHinhAnh(e.target.value)}
                />
                <Input
                    Label="Tác giả"
                    placeholder="Nhập tên tác giả"
                    value={tacGia}
                    type="text"
                    name='tacGia'
                    onChange={(e) => setTacGia(e.target.value)}
                />
                <Input
                    Label="Số lượng còn lại"
                    placeholder="Nhập số lượng"
                    value={soLuongConLai}
                    name='soLuongConLai'
                    type="number"
                    min="30"
                    onChange={(e) => setSoLuongConLai(e.target.value)}
                />

                <Form.Group className="mb-3" >
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </>


    )

}

export default BookEdit