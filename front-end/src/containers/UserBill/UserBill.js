import React, { useEffect } from 'react'
import IndexHome from '../../components/Layout/Header/indexHome'
import { getOrders } from '../../actions'
import Card from "../../components/UI/Card"
import Layout from "../../components/Layout"
import { useDispatch, useSelector } from 'react-redux'
/**
* @author
* @function UserBill
**/

export const UserBill = (props) => {

    const bill = useSelector(state => state.user.bills)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, [])
    return (
        <>
            <IndexHome />
            {bill && bill.map((billuser, index) =>
                <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
                    <div className="orderItemContainer">
                        {billuser.chiTietHoaDon.map((billdetail, i) =>
                            <div>{billdetail.maSach}</div>
                        )

                        }
                        {/* <div>{billuser.maSach}</div> */}
                        <div>name</div>
                        <div>price</div>
                        <div>Order status</div>
                    </div>
                </Card>
            )}

        </>

    )

}
export default UserBill