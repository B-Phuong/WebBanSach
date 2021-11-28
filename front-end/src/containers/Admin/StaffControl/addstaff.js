import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Input } from '../../../components/UI/input';
//import {  } from '../../../actions';
import { NavLink } from 'react-router-dom'
import StaffControl from './staffcontrol'
import './staffcontrol.css'
import { AddStaff} from '../../../actions';



export const StaffAdd = (props) => {

    const dispatch = useDispatch();
    const staff = useSelector(state => state.staff);
    
    const [tenNguoiDung, setTenNguoiDung] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    


    const addStaff = (e) => {
        e.preventDefault();
   
        //setGiaTri(index.options[index.selectedIndex].value);

        const newstaff = {
            tenNguoiDung,
            email, matKhau, xacNhanMatKhau, soDienThoai
        }

        console.log('>>nhân viên mới:', newstaff);
        //const update = JSON.stringify(updatebook)
        dispatch(AddStaff(newstaff));
        //props.history.push('/admin/book/all')
        //setSach(update)

    }



    // const [error, setError] = useState('');
    return (
        <>
            <StaffControl />
            <Form id='form-addstaff' onSubmit={addStaff} >
                {/* <Form onSubmit={userSignp}> */}
                <Input
                    Label="Tên nhân viên"
                    placeholder="Nhập họ tên"
                    value={tenNguoiDung}
                    type="text"
                    onChange={(e) => setTenNguoiDung(e.target.value)}
                />
                <Input
                    Label="Email"
                    placeholder="Nhập email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    Label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={soDienThoai}
                    type="text"
                    onChange={(e) => setSoDienThoai(e.target.value)}
                />
                <Input
                    Label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    value={matKhau}
                    type="password"
                    onChange={(e) => setMatKhau(e.target.value)}
                />
                <Input
                    Label="Xác nhận mật khẩu"
                    placeholder="Nhập mật khẩu lần 2"
                    value={xacNhanMatKhau}
                    type="password"
                    onChange={(e) => setXacNhanMatKhau(e.target.value)}
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

export default StaffAdd