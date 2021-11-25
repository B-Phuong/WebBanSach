// import React, { useEffect, useState } from 'react'
// import { Form, Row, Col, Button } from 'react-bootstrap'
// import { Input } from '../../components/UI/input';
// import { useDispatch, useSelector } from 'react-redux';
// import IndexHome from '../../components/Layout/Header/indexHome';
// import './user.css'
// import { getUserInfo } from '../../actions';
// import axiosIntance from '../../helpers/axios';
// export const User = (props) => {

//     let user = useSelector(state => state.user.userinfor) //.userinfor
//     // const [nguoiDung, setnguoiDung] = useState({ tenTaiKhoan: '', tenNguoiDung: '', soDienThoai: '', email: '' })
//     const [tenNguoiDung, settenNguoiDung] = useState('')
//     const [tenTaiKhoan, settenTaiKhoan] = useState('')
//     const [email, setemail] = useState('')
//     const [soDienThoai, setsoDienThoai] = useState('')
//     const dispatch = useDispatch();
//     //   const user = useSelector(state => state.user);
//     useEffect(() => {
//         const { id } = props.match.params;
//         console.log(id)
//         //dispatch(getUserInfo(id));
//         // setnguoiDung(user)
//         // settenNguoiDung(user.tenNguoiDung)
//         // setemail(user.email)
//         // setsoDienThoai(user.soDienThoai)
//         //console.log('người dùng', nguoiDung)

//         axiosIntance.get(`user/${id}`)
//             .then(res => {
//                 if (res.status === 200) {
//                     user = res.data[0]
//                     settenNguoiDung(user.tenNguoiDung)
//                     settenTaiKhoan(user.tenTaiKhoan)
//                     setemail(user.email)
//                     setsoDienThoai(user.soDienThoai)
//                     console.log('lấy chi tiết', res.data[0])

//                 }
//             })
//             .catch(err => console.log('Lỗi'))


//     }, []);
//     const handleChange = (e) => {
//         //e.preventDefault();
//         console.log('e', e.target.name)
//         //setnguoiDung({ ...user, [e.target.name]: e.target.value })//{
//         // .,
//         // [e.target.name]: e.target.value,
//         //hinhAnh: e.target.name.hinhAnh.files[0].name
//     }

//     const updateInfo = (e) => {

//     }
//     //console.log('người dùng 2', user)

//     return (
//         <>
//             <IndexHome />
//             {/* {console.log('Linh tinh', nguoiDung.tenNguoiDung)} */}
//             <Form id='form-edituser' onSubmit={updateInfo} >
//                 {/* <Form onSubmit={userSignp}> */}
//                 <div>Tên người dùng</div>
//                 <input
//                     Label="Tên người dùng"
//                     placeholder="Nhập tên sách"
//                     value={tenNguoiDung}
//                     type="text"
//                     name='tenNguoiDung'
//                     onChange={(e) => settenNguoiDung(e.target.value)}  /*(e) => setTenSach(e.target.value) */
//                 />
//                 <div>Tài khoản người dùng</div>
//                 <input
//                     Label="Tài khoản người dùng"
//                     placeholder="Nhập giá tiền"
//                     value={tenTaiKhoan}
//                     name='tenTaiKhoan'
//                     type='text'
//                     onChange={(e) => settenTaiKhoan(e.target.value)} /**(e) => setGiaTien(e.target.value) */
//                 />
//                 <div>email</div>
//                 <input
//                     Label="email"
//                     placeholder="Nhập email"
//                     value={email}
//                     type='email'
//                     name='email'
//                     onChange={(e) => setemail(e.target.value)}
//                     disabled
//                 />
//                 <div>Số điện thoại</div>
//                 <input
//                     Label="Số điện thoại"
//                     placeholder="Nhập số điện thoại"
//                     value={soDienThoai}
//                     name='soDienThoai'
//                     type='text'

//                     // min="30"
//                     // max="99"
//                     onKeyPress="if(this.value>99){this.value='99';}else if(this.value<0){this.value='0';}"
//                     onChange={(e) => setsoDienThoai(e.target.value)}
//                 />

//                 <Form.Group className="mb-3" >
//                 </Form.Group>
//                 <button type="button">Edit</button>
//                 <div />
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>

//         </>
//     )

// }
// export default User