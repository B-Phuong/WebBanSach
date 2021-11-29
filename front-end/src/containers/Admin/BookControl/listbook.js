import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookById, getAllBooks } from '../../../actions';
import { NavLink } from 'react-router-dom'
import BookControl from './bookcontrol'
import './bookcontrol.css'
import { Modal } from 'react-bootstrap';
import { IoMdBrush, IoMdCloseCircleOutline } from 'react-icons/io';
import Pagination from '../../../components/Pagination';
import { ToastContainer } from 'react-toastify';

export const BookList = (props) => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    //const [sach, setSach] = useState('');
    const categories = useSelector(state => state.category.categories);
    const [ID, setID] = useState('')
    const [tenSach, setTenSach] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(9);


    // const books = [{ tenSach: 'sách1' }, { tenSach: 'ténach2' }]
    // const { page } = product;
    useEffect(() => {
        // const params = getParams(props.location.search);
        // console.log({params});
        // const payload = {
        //     params
        // }
        dispatch(getAllBooks());
        //setSach(books)
    }, []);
    const confirmDelete = async () => {
        const id = ID;
        dispatch(deleteBookById(id))
        //     await axiosIntance.delete(`/book/${id}`)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 toast.success(res.data.message, { autoClose: 2000 });
        //                 console.log('Xóa thành công')
        //             }
        //         })
        //         .catch(err => {
        //             toast.error(err.response.data.message, { autoClose: 2000 });
        //             console.log('Không thể xóa')
        //         })
        setIsOpen(false);
        props.history.push('/admin/book/all')
    }
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [isOpen, setIsOpen] = useState(false);

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
                            <td><img src={`http://localhost:3000/images/${book.hinhAnh}`} alt="Ảnh bị lỗi hiển thị" /></td>
                            <td>{book.giaTien}</td>
                            <td>{book.soLuongConLai}</td>
                            <td>
                                <span class="action_btn">
                                    <NavLink to={`/admin/book/${book._id}/edit`}><IoMdBrush></IoMdBrush></NavLink>
                                    {/* <NavLink to={`/admin/book/${book._id}/edit`}>Edit</NavLink> */}

                                    <IoMdCloseCircleOutline onClick={() => { setIsOpen(true); setID(book._id); setTenSach(book.tenSach) }}></IoMdCloseCircleOutline>
                                    {/* <button onClick={() => { setIsOpen(true); setID(book._id); setTenSach(book.tenSach) }}>Remove</button> */}
                                    {/* <NavLink to={`/admin/book/${book._id}`}>Remove</NavLink> */}
                                </span>
                            </td>
                        </tr>


                    )}
                </table>
                {/* <Pagination
                    booksPerPage={booksPerPage}
                    totalBooks={books.length}
                    paginate={paginate}
                /> */}

            </div>
            <ToastContainer />
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