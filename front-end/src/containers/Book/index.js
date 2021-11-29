import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllCategories, getDetailBook } from '../../actions';
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
    const [booksPerPage,setBookPerPage] = useState(9);


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
    const changeSizePage = (e) =>{
        setBookPerPage(e)
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
                                                    height: '220px'
                                                }} src={`http://localhost:3000/images/${abook.hinhAnh}`} alt="Ảnh bị lỗi hiển thị" />
                                                <span className="name" >
                                                    {abook.tenSach}</span>
                                            </div>
                                            {abook.giamGia > 0 ?
                                                <div className="price">
                                                    <span className="price_before_sale" ><b>{Format(abook.giaTien)}</b> </span>
                                                    <span className="price_after_sale" ><b>{Format(abook.giaTien * (1 - abook.giamGia / 100))}</b></span>
                                                    <span className="sale_off_percent"><b>-{abook.giamGia}%</b></span>
                                                </div>
                                                :
                                                <div className="price">
                                                    <span ><b>{Format(abook.giaTien)}</b> </span>
                                                    {/* <span className="price_after_sale" ><b>{Format(abook.giaTien * (1 - abook.giamGia * 100))}</b></span> */}
                                                </div>
                                            }
                                            <div className='item-sold'>
                                                <span><>Đã bán {abook.soLuongBan}</> </span>
                                            </div>

                                        </Card>
                                    </div> </NavLink>


                            )
                        }


                    </div>
                   
                    <div> kích thước trang: 
                    <select name="cars" id="cars" margin="20px" onChange={(e)=>changeSizePage(e.target.value)} >
                        <option value="9">9</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                        <Pagination
                        booksPerPage={booksPerPage}
                        totalBooks={books.length}
                        paginate={paginate}
                    />
                    </div> 


                </div>

            </div>

        </>
    )

}

export default Book