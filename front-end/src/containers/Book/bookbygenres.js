import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getBookByGenres } from "../../actions";
import Card from "../../components/UI/Card";
import Layout from "../../components/Layout";
import IndexHome from "../../components/Layout/Header/indexHome";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../.././components/Pagination";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import "./book.css";

const BookByGenres = (props) => {
  const dispatch = useDispatch();
  const bookbygenres = useSelector((state) => state.book.books);
  const categories = useSelector((state) => state.category.categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setbooksPerPage] = useState(6);
  // const books = [{ tenSach: 'sách1' }, { tenSach: 'ténach2' }]
  // const { page } = product;
  useEffect(() => {
    const { theLoai } = props.match.params;
    console.log("mục thể loại", theLoai);

    // const payload = {
    //     params
    // }
    dispatch(getBookByGenres(theLoai));
  }, []);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const renderBook = (theLoai) => {
    dispatch(getBookByGenres(theLoai));
  };
  const Format = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookbygenres.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // onclick = {(e) => settheLoai(props.match.params.theLoai)}
  return (
    <>
      <IndexHome />
      <div>
        <div className="category">
          {categories &&
            categories.map((category, index) => (
              <li key={index}>
                {category.tenDanhMuc}
                <div className="sub-category">
                  <NavLink
                    to={`/${category.danhMucCon[0]._id}`}
                    onClick={() => renderBook(category.danhMucCon[0]._id)}
                  >
                    {" "}
                    <li>{category.danhMucCon[0].tenTheLoai}</li>{" "}
                  </NavLink>
                  <NavLink
                    to={`/${category.danhMucCon[1]._id}`}
                    onClick={() => renderBook(category.danhMucCon[1]._id)}
                  >
                    {" "}
                    <li>{category.danhMucCon[1].tenTheLoai}</li>{" "}
                  </NavLink>
                  <NavLink
                    to={`/${category.danhMucCon[2]._id}`}
                    onClick={() => renderBook(category.danhMucCon[2]._id)}
                  >
                    {" "}
                    <li>{category.danhMucCon[2].tenTheLoai}</li>{" "}
                  </NavLink>
                </div>
              </li>
            ))}
        </div>
        <div style={{ margin: "10px 10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              margin: "10px 0",
            }}
          >
            {currentBooks &&
              currentBooks.map((book, index) => (
                <NavLink to={`/book/${book._id}`}>
                  <div className="book">
                    <Card
                      key={index}
                      style={{
                        width: "300px",
                        height: "300px",
                        margin: "5px",
                      }}
                    >
                      <div>
                        <img
                          style={{
                            width: "100%",
                            height: "220px",
                          }}
                          src={`https://api-webbanhang-nhom07.herokuapp.com/images/${book.hinhAnh}`}
                          alt="Ảnh bị lỗi hiển thị"
                        />
                        <span className="name">{book.tenSach}</span>
                      </div>
                      {book.giamGia > 0 ? (
                        <div className="price">
                          <span className="price_before_sale">
                            <b>{Format(book.giaTien)}</b>{" "}
                          </span>
                          <span className="price_after_sale">
                            <b>
                              {Format(book.giaTien * (1 - book.giamGia / 100))}
                            </b>
                          </span>
                          <span className="sale_off_percent">
                            <b>-{book.giamGia}%</b>
                          </span>
                        </div>
                      ) : (
                        <div className="price">
                          <span>
                            <b>{Format(book.giaTien)}</b>{" "}
                          </span>
                          {/* <span className="price_after_sale" ><b>{Format(abook.giaTien * (1 - abook.giamGia * 100))}</b></span> */}
                        </div>
                      )}
                      {/* <div> <span className="price" >
                                                <b>{Format(book.giaTien)} đ</b></span></div> */}
                      <div className="item-sold">
                        <span>
                          <>Đã bán {book.soLuongBan}</>{" "}
                        </span>
                      </div>
                    </Card>
                  </div>{" "}
                </NavLink>
              ))}
          </div>
          <div> kích thước trang: 
                    <select name="cars" id="cars" margin="20px" onChange={(e)=>setbooksPerPage(e.target.value)} >
                        <option value="9">9</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={bookbygenres.length}
            paginate={paginate}
          />
             </div> 
        </div>
      </div>
    </>
  );
};

export default BookByGenres;
