import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../../actions';
import { NavLink } from 'react-router-dom'
import BookControl from './bookcontrol'
import './bookcontrol.css'
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import axiosIntance from '../../../helpers/axios';


export const BookList = (props) => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const categories = useSelector(state => state.category.categories);
    const [ID, setID] = useState('')
    const [tenSach, setTenSach] = useState('')
    // const books = [{ tenSach: 'sách1' }, { tenSach: 'ténach2' }]
    // const { page } = product;
    useEffect(() => {
        // const params = getParams(props.location.search);
        // console.log({params});
        // const payload = {
        //     params
        // }
        dispatch(getAllBooks());
    }, []);
    const confirmDelete = () => {
        const id = ID;
        axiosIntance.delete(`/book/${id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log('Xóa thành công')
                }
            })
            .catch(err => console.log('Lỗi'))
        setIsOpen(false);
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
            <BookControl />
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
                        <th >Tên sách</th>
                        <th>Hình ảnh</th>
                        <th>Giá tiền</th>
                        <th>Số lượng còn lại</th>
                        <th>Tùy chọn</th>

                    </tr>
                    {books && books.map((book, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{book.tenSach}</td>
                            <td><img src={book.hinhAnh} alt="" /></td>
                            <td>{book.giaTien}</td>
                            <td>{book.soLuongConLai}</td>
                            <td>
                                <span class="action_btn">
                                    <NavLink to={`/admin/book/${book._id}/edit`}>Edit</NavLink>
                                    <button onClick={() => { setIsOpen(true); setID(book._id); setTenSach(book.tenSach) }}>Remove</button>
                                    {/* <NavLink to={`/admin/book/${book._id}`}>Remove</NavLink> */}
                                </span>
                            </td>
                        </tr>


                    )}
                </table>
            </div>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Xóa thông tin sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa sách {tenSach}  không?
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn-OK' onClick={confirmDelete}>Delete</button>
                    <button onClick={hideModal}>Cancel</button>

                </Modal.Footer>
            </Modal>
        </>


    )

}

export default BookList