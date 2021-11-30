import React, {useEffect} from 'react'
import IndexHome from '../../components/Layout/Header/indexHome'
import {getOrders} from '../../actions'
import Card from "../../components/UI/Card"
import Layout from "../../components/Layout"
import { useDispatch } from 'react-redux'
/**
* @author
* @function UserBill
**/

export const UserBill = (props) => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrders());
    },[])
  return(
    <>
      <IndexHome />
      
          <Card style={{maxWidth: "1200px", margin:"5px auto"}}>
              <div className="orderItemContainer">
                  <div>img</div>
                  <div>name</div>
                  <div>price</div>
                  <div>Order status</div>
              </div>

          </Card>
      </>

   )

 }
export default UserBill