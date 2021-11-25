import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Modal } from 'react-bootstrap'
import { Input } from '../../components/UI/input';
import { useDispatch, useSelector } from 'react-redux';
import IndexHome from '../../components/Layout/Header/indexHome';
import './user.css'
import { updatetUserInfo } from '../../actions';
import axiosIntance from '../../helpers/axios';
export const UserInfo = (props) => {

    let user = useSelector(state => state.user.userinfor) //.userinfor
    const [nguoiDung, setnguoiDung] = useState('')
    const [tenNguoiDung, settenNguoiDung] = useState('')
    const [tenTaiKhoan, settenTaiKhoan] = useState('')
    const [email, setemail] = useState('')
    const [soDienThoai, setsoDienThoai] = useState('')
    const [diaChi, setdiaChi] = useState('')
    const dispatch = useDispatch();
    //   const user = useSelector(state => state.user);
    useEffect(() => {
        const { id } = props.match.params;
        console.log(id)
        // dispatch(getUserInfo(id));
        axiosIntance.get(`user/${id}`)
            .then(res => {
                if (res.status === 200) {
                    user = res.data[0]
                    setnguoiDung(user)
                    settenNguoiDung(user.tenNguoiDung)
                    settenTaiKhoan(user.tenTaiKhoan)
                    setemail(user.email)
                    setsoDienThoai(user.soDienThoai)
                    setdiaChi(user.diaChi)
                    console.log('lấy chi tiết', res.data[0])
                }
            })
            .catch(err => console.log('Lỗi'))


    }, []);

    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };
    const updateInfo = (e) => {
        const newinfo = { ...nguoiDung, tenNguoiDung, tenTaiKhoan, soDienThoai, diaChi }
        const { id } = props.match.params;
        dispatch(updatetUserInfo(id, newinfo))
        setnguoiDung(newinfo)
        setIsOpen(false)
    }
    //console.log('người dùng 2', user)

    return (
        <>
            <IndexHome />
            {/* {console.log('Linh tinh', nguoiDung.tenNguoiDung)} */}
            <div className='info-user'>
                <h3>Thông tin người dùng</h3>
                <div id='name-user'>
                    Tên người dùng
                </div>
                {nguoiDung.tenNguoiDung}
                <div id='email-user'>
                    Email
                </div>
                {nguoiDung.email}
                <div id='account-user'>
                    Tên tài khoản
                </div>
                {nguoiDung.tenTaiKhoan}
                <div id='phone-user'>
                    Số điện thoại
                </div>
                {nguoiDung.soDienThoai}
                <div id='address-user'>
                    Địa chỉ nhà
                </div>
                {nguoiDung.diaChi}
                <div />
                <button onClick={showModal}>Edit</button>
            </div>


            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Tên người dùng</div>
                    <input
                        Label="Tên người dùng"
                        placeholder="Nhập tên sách"
                        value={tenNguoiDung}
                        type="text"
                        name='tenNguoiDung'
                        onChange={(e) => settenNguoiDung(e.target.value)}  /*(e) => setTenSach(e.target.value) */
                    />
                    <div>Tài khoản người dùng</div>
                    <input
                        Label="Tài khoản người dùng"
                        placeholder="Nhập giá tiền"
                        value={tenTaiKhoan}
                        name='tenTaiKhoan'
                        type='text'
                        onChange={(e) => settenTaiKhoan(e.target.value)} /**(e) => setGiaTien(e.target.value) */
                    />
                    <div>email</div>
                    <input
                        Label="email"
                        placeholder="Nhập email"
                        value={email}
                        type='email'
                        name='email'
                        onChange={(e) => setemail(e.target.value)}
                        disabled
                    />
                    <div>Số điện thoại</div>
                    <input
                        Label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        value={soDienThoai}
                        name='soDienThoai'
                        type='text'

                        // min="30"
                        // max="99"
                        onChange={(e) => setsoDienThoai(e.target.value)}
                    />
                    <div>Địa chỉ nhà</div>
                    <input
                        Label="Địa chỉ nhà"
                        placeholder="Nhập Địa chỉ nhà"
                        value={diaChi}
                        name='diaChi'
                        type='text'

                        // min="30"
                        // max="99"
                        onChange={(e) => setdiaChi(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal}>Cancel</button>
                    <button onClick={updateInfo}>Save</button>
                </Modal.Footer>
            </Modal>

        </>
    )

}
export default UserInfo