import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookById, getAllBooks } from "../../../actions";
import { NavLink } from "react-router-dom";
import BookControl from "./bookcontrol";
import "./bookcontrol.css";
import { Modal } from "react-bootstrap";
import { IoMdBrush, IoMdCloseCircleOutline } from "react-icons/io";
import Pagination from "../../../components/Pagination";
import MUIDataTable from "mui-datatables";

export const BookList = (props) => {
  const columns = [
    {
      name: "",
      label: "",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },
    {
      name: "_id",
      options: {
        display: false,
      },
    },
    {
      name: "tenSach",
      label: "Tên sách",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "hinhAnh",
      label: "Hình ảnh",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <img
              className="Hinhanhcss"
              src={`https://api-webbanhang-nhom07.herokuapp.com/images/${tableMeta.rowData[3]}`}
              alt="Ảnh bị lỗi hiển thị"
            />
          );
        },
      },
    },
    {
      name: "giaTien",
      label: "Giá tiền",
      options: {
        filter: false,
        sort: true,
        customBodyRender: value => <span>{Format(value) }</span>
      },
    },
    {
      name: "soLuongConLai",
      label: "Số lượng còn lại",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "",
      label: "Tùy chọn",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            //<button onClick={() => console.log(tableMeta.rowData) }>
            //    <button onClick={() => console.log(value,'aaaaa', tableMeta) }>

            //    edit
            // </button>
            <span class="action_btn">
              <NavLink to={`/admin/book/${tableMeta.rowData[1]}/edit`}>
                <IoMdBrush></IoMdBrush>
              </NavLink>
              {/* <NavLink to={`/admin/book/${book._id}/edit`}>Edit</NavLink> */}

              <IoMdCloseCircleOutline
                onClick={() => {
                  setIsOpen(true);
                  setID(tableMeta.rowData[1]);
                  setTenSach(tableMeta.rowData[2]);
                }}
              ></IoMdCloseCircleOutline>
              {/* <button onClick={() => { setIsOpen(true); setID(book._id); setTenSach(book.tenSach) }}>Remove</button> */}
              {/* <NavLink to={`/admin/book/${book._id}`}>Remove</NavLink> */}
            </span>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: false, // tắt ô checkbox row
  };
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  //const [sach, setSach] = useState('');
  const categories = useSelector((state) => state.category.categories);
  const [ID, setID] = useState("");
  const [tenSach, setTenSach] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);
  const [isOpen, setIsOpen] = useState(false);

 
  useEffect(() => {
   
    dispatch(getAllBooks());
    console.log(isOpen);
  }, [isOpen]);
  const confirmDelete = async () => {
    const id = ID;
    dispatch(deleteBookById(id, setIsOpen));
   
  };
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const Format = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <BookControl />
     
      <div class="table_responsive">
        <MUIDataTable
          title={"Danh sách sách"}
          data={Array.isArray(books) ? books : []}
          columns={columns}
          options={options}
        />

        {/* <Pagination
                    booksPerPage={booksPerPage}
                    totalBooks={books.length}
                    paginate={paginate}
                /> */}
      </div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Xóa thông tin sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa sách {tenSach} không?</Modal.Body>
        <Modal.Footer>
          <button className="btn-OK" onClick={confirmDelete}>
            Delete
          </button>
          <button onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookList;
