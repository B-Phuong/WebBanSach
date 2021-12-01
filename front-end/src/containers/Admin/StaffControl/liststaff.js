import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStaffs } from '../../../actions';
import { NavLink } from 'react-router-dom'
import StaffControl from './staffcontrol'
import './staffcontrol.css'
import { Modal } from 'react-bootstrap';
import { IoMdBrush, IoMdCloseCircleOutline } from 'react-icons/io';

import axiosIntance from '../../../helpers/axios';


export const StaffList = (props) => {

    const dispatch = useDispatch();
    const staffs = useSelector(state => state.staff.staffs);
    //const [sach, setSach] = useState('');
    const [ID, setID] = useState('')
    const [tenNguoiDung, setTenNguoiDung] = useState('')
    // const books = [{ tenSach: 'sách1' }, { tenSach: 'ténach2' }]
    // const { page } = product;
    useEffect(() => {
        // const params = getParams(props.location.search);
        // console.log({params});
        // const payload = {
        //     params
        // }
        dispatch(getAllStaffs());
        //setSach(books)
    }, []);
    const confirmDelete = () => {
        const id = ID;
        axiosIntance.delete(`/admin/staff/${id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log('Xóa thành công')
                }
            })
            .catch(err => console.log('Lỗi'))
        setIsOpen(false);
        props.history.push('/admin/staff/all') // tiến1a
    }
    const [isOpen, setIsOpen] = React.useState(false);

    // const showModal = () => {

    //     setIsOpen(true);
    // };

    const hideModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <StaffControl />
            {/* <div className='list-book'>
                <div>
                    <div className='book'>
                        <div styel={{ float: 'left' }}>Tên sách</div>
                        <div styel={{ float: 'right' }}>Gía bán</div>
                        <div styel={{ float: 'left' }}>Tác giả</div>
                        <div styel={{ float: 'left' }}>Nút</div>
                    </div>

                </div>
            </div> */}

            <div class="table_responsive">
                <table>
                    <tr>
                        <th>STT</th>
                        <th >Tên Người dùng</th>
                        <th>Email</th>
                        <th>Vai Trò</th>
                        <th>Số điện thoại</th>
                        <th>Tùy chọn</th>
                        

                    </tr>
                    {staffs && staffs.map((staff, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{staff.tenNguoiDung}</td>
                            <td>{staff.email}</td>
                            <td>{staff.vaiTro}</td>
                            <td>{staff.soDienThoai}</td>
                            <td>
                                <span class="action_btn">
                                    {/* <NavLink to={`/admin/staff/${staff._id}/edit`}><IoMdBrush></IoMdBrush></NavLink> */}
                                    {/* <NavLink to={`/admin/book/${book._id}/edit`}>Edit</NavLink> */}

                                    <IoMdCloseCircleOutline onClick={() => { setIsOpen(true); setID(staff._id); setTenNguoiDung(staff.tenNguoiDung) }}></IoMdCloseCircleOutline>
                                    {/* <button onClick={() => { setIsOpen(true); setID(book._id); setTenSach(book.tenSach) }}>Remove</button> */}
                                    {/* <NavLink to={`/admin/book/${book._id}`}>Remove</NavLink> */}
                                </span>
                            </td>
                        </tr>


                    )}
                </table>
            </div>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Xóa thông tin nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa {tenNguoiDung}  không?
                </Modal.Body>
                <Modal.Footer>


                    <button className='btn-OK' onClick={confirmDelete}>Delete</button>
                    <button onClick={hideModal}>Cancel</button>

                </Modal.Footer>
            </Modal>
        </>


    )

}

export default StaffList