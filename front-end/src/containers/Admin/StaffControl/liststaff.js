// tham khảo: https://stackoverflow.com/questions/55102156/how-to-give-action-buttons-in-muidatatable --> thêm button vào table
// https://www.npmjs.com/package/mui-datatables --> thư viện

// https://github.com/gregnb/mui-datatables/issues/228 --> ẩn selectbox

//https://github.com/gregnb/mui-datatables/issues/1379 --> hiện thị số thứ tự dòng
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffs } from "../../../actions";
import { NavLink } from "react-router-dom";
import StaffControl from "./staffcontrol";
import "./staffcontrol.css";
import { Modal } from "react-bootstrap";
import { IoMdBrush, IoMdCloseCircleOutline } from "react-icons/io";
import MUIDataTable from "mui-datatables";
import axiosIntance from "../../../helpers/axios";
import { toast } from "react-toastify";

export const StaffList = (props) => {
  // const columns = ["tenNguoiDung", "email", "vaiTro", "State"];

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
      name: "tenNguoiDung",
      label: "Tên người dùng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "vaiTro",
      label: "Vai Trò",
      options: {
        filter: true,
        sort: false,
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

            <IoMdCloseCircleOutline
              onClick={() => {
                setIsOpen(true);
                setID(tableMeta.rowData[1]);
                setTenNguoiDung(tableMeta.rowData[2]);
              }}
            ></IoMdCloseCircleOutline>
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
  const staffs = useSelector((state) => state.staff.staffs);
  //const [sach, setSach] = useState('');
  const [ID, setID] = useState("");
  const [tenNguoiDung, setTenNguoiDung] = useState("");
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
    axiosIntance
      .delete(`/admin/staff/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllStaffs());
          toast.success("Xóa thành công", { autoClose: 2000 });
          console.log("Xóa thành công");
        }
      })
      .catch((err) => console.log("Lỗi"));
    setIsOpen(false);
    props.history.push("/admin/staff/all"); // tiến1a
  };
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
      {Array.isArray(staffs) ? (
        <div class="table_responsive">
          <MUIDataTable
            title={"Danh sách nhân viên"}
            data={Array.isArray(staffs) ? staffs : []}
            columns={columns}
            options={options}
          />
        
        </div>
      ) : (
        <div class="table_responsive">Danh sách trống!</div>
      )}
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Xóa thông tin nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa {tenNguoiDung} không?</Modal.Body>
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

export default StaffList;
