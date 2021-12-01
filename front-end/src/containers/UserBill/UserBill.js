import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IndexHome from '../../components/Layout/Header/indexHome'
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import './UserBill.css'
import { getOrders } from '../../actions';
/**
* @author
* @function UserBill
**/

export const UserBill = (props) => {
    const dispatch = useDispatch();
    const userbill = useSelector((state) => state.userbill)

    useEffect(() => {
        dispatch(getOrders())
    }, [])
    const Format = (x) => {
        return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      }

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }
        return "";
    };
    return (
        <>
            <IndexHome />
            {
                userbill.data.map((chiTietDonHang, index) => (
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
                              {item.tenSach}
                            </div>
                          ))}
                        </div>
                        <div>
                          <span className="title">Tổng giá tiền</span>
                          <br />
                          <span className="value">{Format(chiTietDonHang.tongTien)}</span>
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
                        </div>
                    </Card>))
            }

        </>
    )

}

export default UserBill