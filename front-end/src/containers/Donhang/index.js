import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, getInitialData } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";

/**
 * @author
 * @function Donhang
 **/

const Donhang = (props) => {
  const donHang = useSelector((state) => state.donHang);
  const [type, setType] = useState('');

  const dispatch = useDispatch();
  const onOrderUpdate = (_id) => {
    const payload = {
      _id,
      type,
    };
    dispatch((updateOrder(payload)))
   
  }
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };
  return (
    <Layout sidebar>
      {
        donHang.bills.map((chiTietDonHang, index) => (
          <Card
            style={{
              margin: "10px 0",
            }}
            key={index}
            headerLeft={chiTietDonHang._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 50px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="title">Hàng đã mua</div>
                {chiTietDonHang.chiTietHoaDon.map((item, index) => (
                  <div className="value" key={index}>
                    {item.maSach.tenSach}
                  </div>
                ))}
              </div>
              <div>
                <span className="title">Tổng giá tiền</span>
                <br />
                <span className="value">{chiTietDonHang.tongTien}</span>
              </div>
              </div>
              <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
              <div className="orderTrack">
                {chiTietDonHang.orderStatus.map((status)=>(
                  <div
                    className={`orderStatus ${status.isCompleted?"active":""}`}
                    >
                      <div
                        className={`point ${status.isCompleted ? "active":""}`}
                      ></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div> 
                      </div>
                  </div>
                ))}
              </div>
              
              {/* chọn input để đổi trạng thái */}
              <div style={{
                padding: '0 50px',
                boxSizing: 'border-box'
              }}>
                <select onChange={(e) => setType(e.target.value)}>
                  <option value={""}>Chọn trạng thái</option>
                  {chiTietDonHang.orderStatus.map((status) => {
                    return (
                      <>
                        {
                          !status.isCompleted ? (
                            <option
                              key={status.type}
                              value={status.type}
                            >
                              {status.type}
                            </option>
                          ) : null}
                      </>
                    );
                  })}
                </select>
              </div>
              {/* button để confirm */}
              <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button className="button" onClick={() => onOrderUpdate(chiTietDonHang._id)}>
                Chấp nhận
              </button>
            </div>
          </div>
          </Card>))
      }

    </Layout>
  );
};

export default Donhang;