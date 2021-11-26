import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../../components/UI/input';
import StaffControl from './staffcontrol'
import './staffcontrol.css'
import { putEditStaff, getDetailStaff } from '../../../actions';

import axios from '../../../helpers/axios';


export const StaffEdit = (props) => {

    const dispatch = useDispatch();
    //let book, maNhaXuatBan, maDanhMucCon;// = useSelector(state => state.book.bookDetails);
    let staff = useSelector(state => state.staff.staffDetails);
    //const [book, setBook] = useState('')
    const [tenNguoiDung, setTenNguoiDung] = useState('');
    const [tenTaiKhoan, setTenTaiKhoan] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {

        const { id } = props.match.params;
        console.log(id);

        dispatch(getDetailStaff(id));
        axios.get(`/admin/staff/${id}`)
            .then(res => {
                if (res.status === 200) {
                    st = res.data[0]
                    //setBook(res.data[0])
                    setTenNguoiDung(st.tenNguoiDung)
                    setTenTaiKhoan(st.tenTaiKhoan)
                    setEmail(st.email)
                   
                    console.log('lấy chi tiết', res.data[0])
                }
            })
            .catch(err => console.log('Lỗi'))

        // const b = store.getState().book.bookDetails;
        // console.log('state', b)
        // setBook(b)

    }, []);
    console.log('>>trước khi cập nhật', staff)
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
    const updateStaff = (e) => {
        e.preventDefault();
        const { id } = props.match.params;
        console.log('id', id)
        const newstaff = new FormData()
        const updatestaff = {
            ...staff,
            tenNguoiDung,
            tenTaiKhoan, email
        }
        newstaff.append('tenNguoiDung', tenNguoiDung)
        newstaff.append('tenTaiKhoan', tenTaiKhoan)
        newstaff.append('email', email)
     
        console.log('>>trước khi cập nhật', staff)
        console.log('>>sẽ cập nhật:', updatestaff);
        //const update = JSON.stringify(updatebook)
        dispatch(putEditStaff(id, updatestaff));
        //setSach(update)
        props.history.push('/admin/staff/all')
    }

    // const [error, setError] = useState('');
    return (
        <>
            <StaffControl />
            { }
            <Form id='form-editstaff' onSubmit={updateStaff} >
                {/* <Form onSubmit={userSignp}> */}
                <Input
                    Label="Tên Nhân viên"
                    placeholder="Nhập tên nhân viên"
                    value={tenNguoiDung}
                    type="text"
                    name='tenStaff'
                    onChange={(e) => setTenNguoiDung(e.target.value)}  /*(e) => setTenSach(e.target.value) */
                />
                <Input
                    Label="Tên tài khoản"
                    placeholder="Nhập tên tài khoản"
                    value={tenTaiKhoan}
                    name='tenTaiKhoan'
                    type="text"
                    onChange={(e) => setTenTaiKhoan(e.target.value)} /**(e) => setGiaTien(e.target.value) */
                />
                <Input
                    Label="Email"
                    placeholder="Nhập Email"
                    value={email}
                    type="text"
                    name='email'
                    onChange={(e) => setGiamGia(e.target.value)}
                />
                {/* <Input
                    Label="Mô tả"
                    placeholder="Mô tả cho sách"
                    value={book.moTa}
                    type="text"
                 onChange={(e) => setMatkhau(e.target.value)}
                /> */}
        

                <Form.Group className="mb-3" >
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </>


    )

}

export default StaffEdit