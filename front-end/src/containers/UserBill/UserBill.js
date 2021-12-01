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
                userbill.data.map(bill => {
                    return bill.chiTietHoaDon.map(item =>
                        <Card style={{ maxWidth: "1340px", margin: "10px auto" }}>

                            <div style={{
                                display: "inline-flex",
                                justifyContent: "space-between",
                                padding: "60px 0px",
                                alignItems: "center",
                            }}>
                                <div>{item.tenSach}|</div>
                                <div>{Format(item.tongTienSauGiam)}</div>
                                <div className="orderTrack">
                                    {bill.orderStatus.map((status) => (
                                        <div
                                            className={`orderStatus ${status.isCompleted ? "active" : ""}`}
                                        >
                                            <div
                                                className={`point ${status.isCompleted ? "active" : ""}`}
                                            ></div>
                                            <div className="orderInfo">
                                                <div className="status">{status.type}</div>
                                                <div className="date">{formatDate(status.date)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>)
                })
            }

        </>
    )

}

export default UserBill