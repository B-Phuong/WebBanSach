import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../actions';
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

    return (
        <>
            <IndexHome />
            <div style={{ margin: '10px 10px' }}>

                {/* {
                books && books.map((book, index) =>
                    <a
                        key={index}
                        style={{ display: 'block' }}
                    //href={banner.navigateTo}
                    >
                        <img src={book.hinhAnh} alt="" />
                    </a>
                )
            } */}

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '10px 0'
                }}>
                    {
                        books && books.map((book, index) =>
                            <NavLink to={`/book/${book._id}`}><div className="book">
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


                                </Card>
                            </div> </NavLink>

                        )
                    }
                </div>
            </div>
        </>
    )

}

export default Book