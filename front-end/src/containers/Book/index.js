import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllCategories } from '../../actions';
import Card from '../../components/UI/Card';
import Layout from '../../components/Layout';
import IndexHome from '../../components/Layout/Header/indexHome'
import { Link, NavLink } from "react-router-dom";
import Pagination from '../.././components/Pagination';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import "./book.css";

const Book = (props) => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const categories = useSelector(state => state.category.categories);
    //  const [book, setBook] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(9);


    // const books = [{ tenSach: 'sách1' }, { tenSach: 'ténach2' }]
    // const { page } = product;
    useEffect(() => {
        // const payload = {
        //     params
        // }
        dispatch(getAllBooks());
        // setBook(books)
    }, []);
    useEffect(() => {
        dispatch(getAllCategories())
    }, []);
    const Format = (x) => {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <IndexHome />
            <div>

                <div className='category'>
                    {categories && categories.map((category, index) =>
                        <li key={index}>{category.tenDanhMuc}
                            <div className='sub-category'>
                                <NavLink to={`/${category.danhMucCon[0]._id}`}>  <li>{category.danhMucCon[0].tenTheLoai}</li> </NavLink>
                                <NavLink to={`/${category.danhMucCon[1]._id}`}>    <li>{category.danhMucCon[1].tenTheLoai}</li>  </NavLink>
                                <NavLink to={`/${category.danhMucCon[2]._id}`}>    <li>{category.danhMucCon[2].tenTheLoai}</li>  </NavLink>
                            </div>
                        </li>)}
                </div>
                <div style={{ margin: '10px 10px' }}>


                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        margin: '10px 0'
                    }}>
                        {
                            currentBooks && currentBooks.map((abook) =>
                                <NavLink to={`/book/${abook._id}`}>
                                    <div className="book">
                                        <Card
                                            key={abook._id}
                                            style={{
                                                width: '300px',
                                                height: '300px',
                                                margin: '5px'
                                            }}
                                        >
                                            <div>
                                                <img style={{

                                                    width: '100%',
                                                    height: '250px'
                                                }} src={abook.hinhAnh} alt="Ảnh bị lỗi hiển thị" />
                                                <span className="name" >
                                                    {abook.tenSach}</span>
                                            </div>
                                            <div> <span className="price" >
                                                <b>{Format(abook.giaTien)}</b></span></div>


                                        </Card>
                                    </div> </NavLink>


                            )
                        }


                    </div>
                    <Pagination
                        booksPerPage={booksPerPage}
                        totalBooks={books.length}
                        paginate={paginate}
                    />

                </div>

            </div>

        </>
    )

}

export default Book