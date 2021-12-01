import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IndexHome from '../../components/Layout/Header/indexHome'
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import './UserBill.css'
/**
* @author
* @function UserBill
**/

export const UserBill = (props) => {
    const Dispatch = useDispatch
    const donHang = useSelector((state) => state.donHang);
    return (
        <>
            <IndexHome />
            {
                donHang.bills.map(donHang => {
                    return donHang.chiTietHoaDon.map(chiTietHoaDon => 
                    <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
                        <div className="orderItemContainer"></div>
                        <div>{chiTietHoaDon.tenSach}</div>
                        <div>{chiTietHoaDon.tongTienSauGiam}</div>
                        <div>{chiTietHoaDon.orderStatus}</div>
                    </Card>)

                })
            }

        </>
    )

}

export default UserBill