import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllCategories } from '../../actions';
import Card from '../../components/UI/Card';
import Layout from '../../components/Layout';
import IndexHome from '../../components/Layout/Header/indexHome'
import { Link, NavLink } from "react-router-dom";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import "./book.css";

const Book = () => {

    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const categories = useSelector(state => state.category.categories);
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
    useEffect(() => {
        dispatch(getAllCategories())
    }, []);


    return (
        <>
            <IndexHome />
            <div>

                <div className='category'>
                    {categories && categories.map((category, index) =>
                        <li key={index}>{category.tenDanhMuc}
                            <div className='sub-category'>
                                <li>{category.danhMucCon[0].tenTheLoai}</li>
                                <li>{category.danhMucCon[1].tenTheLoai}</li>
                                <li>{category.danhMucCon[2].tenTheLoai}</li>
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
                            books && books.map((book, index) =>
                                <NavLink to={`/book/${book._id}`}>
                                    <div className="book">
                                        <Card
                                            key={index}
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
                                                }} src={book.hinhAnh} alt="Ảnh bị lỗi hiển thị" />
                                                <span className="name" >
                                                    {book.tenSach}</span>
                                            </div>
                                            <div> <span className="price" >
                                                <b>{book.giaTien} đ</b></span></div>


                                        </Card>
                                    </div> </NavLink>

                            )
                        }
                    </div>
                </div>

            </div>

        </>
    )

}

export default Book