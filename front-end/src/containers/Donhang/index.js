import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { getCustomerOrders } from "../../actions";
import "./style.css";

/**
 * @author
 * @function Donhang
 **/

const Donhang = (props) => {
  const donHang = useSelector((state) => state.donHang);
  const [type, setType] = useState('');
  const onOrderUpdate = (_id) =>{
      const payload ={
        _id,
        type 
      }
  }
  return (
    <Layout sidebar>
      {
        donHang.bills.map((chiTietDonHang, index) => (
          <Card key={index} headerLeft={chiTietDonHang._id}>
            <div
              style={{
                boxSizing: "border-box",
                padding: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="orderTrack">
                <div className="orderStatus">
                  <div className="point"></div>
                  <div className="orderInfo">
                    <div className="status">Ordered</div>
                    <div className="date">Fri,2020</div>
                  </div>
                </div>
                <div className="orderStatus">
                  <div className="point"></div>
                  <div className="orderInfo">
                    <div className="status">Packed</div>
                    <div className="date">Fri,2020</div>
                  </div>
                </div>
                <div className="orderStatus">
                  <div className="point"></div>
                  <div className="orderInfo">
                    <div className="status">Shipped</div>
                    <div className="date">Fri,2020</div>
                  </div>
                </div>
                <div className="orderStatus">
                  <div className="point"></div>
                  <div className="orderInfo">
                    <div className="status">Delivered</div>
                    <div className="date">Fri,2020</div>
                  </div>
                </div>
              </div>
              {/* chọn input để đổi trạng thái */}
              <div style={{
                padding: '0 50px',
                boxSizing: 'border-box'
              }}>

                <select>
                  {chiTietDonHang.orderStatus.map((status) => {
                    return <>
                      {
                        !status.isCompleted ? (
                        <option onChange={(e)=> setType(e.target.value)} 
                        key={status.type} 
                        value={status.type}
                        >
                          {status.type}
                        </option>
                        ) : null}
                    </>
                  })}
                </select>
              </div>
              {/* button để confirm */}
              <div style={{
                padding: '0 50px',
                boxSizing: 'border-box'
              }}>
                <button onClick={()=>onOrderUpdate(chiTietDonHang._id)}>Đồng ý</button>
              </div>


            </div>
          </Card>))
      }

    </Layout>
  );
};

export default Donhang;