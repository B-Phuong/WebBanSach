import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndexHome from "../../components/Layout/Header/indexHome";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { Form, Row, Col, Button, Modal } from 'react-bootstrap'

import {
  orderDefault,
  addToCart,
  getCartItems,
  removeCartItem,
  getAllBooks,
  getAllCategories,
  getPayPal,
} from "../../actions";
import PriceDetails from "../../components/PriceDetails";

import PayPal from "../Payment/Paypal";
import axiosIntance from '../../helpers/axios';

import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";
import Paypal from "../Payment/Paypal";

/**
 * @author
 * @function CartPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage


*/

const CartPage = (props) => {
  //paymen
  const totalBill = useSelector((state) => state.user.totalCurrentBill);
  useEffect(() => {
    dispatch(getPayPal());
    setCheckOut(false);
  }, []);
  let user = useSelector(state => state.user.userinfor)
  const [checkout, setCheckOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [soDienThoai, setsoDienThoai] = useState('')
  const [diaChi, setDiaChi] = useState('')
  const [usePaypal, setPaypal] = useState(false);
  // var usePaypal = false;
  // cart
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    console.log(id)
    // dispatch(getUserInfo(id));
    axiosIntance.get(`user`)
      .then(res => {
        if (res.status === 200) {
          user = res.data[0]
          setsoDienThoai(user.soDienThoai)
          setDiaChi(user.diaChi)
          console.log('lấy chi tiết', res.data[0])
        }
      })
      .catch(err => console.log('Lỗi'))


  }, []);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    //  if (auth.authenticate) {
    dispatch(getCartItems());
    //}
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    // const { tenSach, giaGoc, hinhAnh } = cartItems[_id];
    //dispatch(addToCart({ _id, tenSach, giaGoc, hinhAnh }, 1));
    dispatch(addToCart({ _id }, 1));
  };

  const showModal = () => {
    setIsOpen(true);
  };
  const OrderSubmit = () => {

    if (usePaypal === true) {

      setCheckOut(true);

      setIsOpen(false)

    } else {
      dispatch(orderDefault({ diaChiGiaoHang: diaChi, soDienThoai: soDienThoai, daThanhToan: false }))
      setIsOpen(false)
    };
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const onOrderDefault = () => {

    //dispatch(orderDefault());
  };

  const onQuantityDecrement = (_id, qty) => {
    // const { tenSach, giaGoc, hinhAnh } = cartItems[_id];
    dispatch(addToCart({ _id }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <IndexHome />

      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`Giỏ hàng`}
          headerRight={<div>Số tiền</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {cartItems.length == 0 ? (
            <h3 style={{ color: "blue" }}>Giỏ hàng trống!!! </h3>
          ) : (
            <>
              {Object.keys(cartItems).map((key, index) => (
                <CartItem
                  key={index}
                  cartItem={cartItems[key]}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                  onRemoveCartItem={onRemoveCartItem}
                />
              ))}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  background: "#ffffff",
                  justifyContent: "flex-end",
                  boxShadow: "0 0 10px 10px #eee",
                  padding: "10px 0",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ width: "250px" }}>
                  <MaterialButton
                    title="Thanh toán khi nhận hàng"
                    onClick={showModal}
                  />

                  <div className="payment-option">
                    {checkout ? (
                      <PayPal total={totalBill} diaChiGiaoHang={diaChi} soDienThoai={soDienThoai} />
                    ) : (
                      <MaterialButton
                        title="Thanh toán trực tuyến"
                        onClick={() => (setIsOpen(true), setPaypal(true))}
                      // setCheckOut(true);
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].soLuong;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { giaGoc, soLuong, giamGia } = cart.cartItems[key];
            return totalPrice + (giaGoc * soLuong * (100 - giamGia)) / 100;
          }, 0)}
        />
      </div>
     
      <Modal
        show={isOpen}
        onHide={() => {
          setIsOpen(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Thông tin người nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Số điện thoại</div>
          <input
            Label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={soDienThoai}
            name="soDienThoai"
            type="text"
            // min="30"
            // max="99"
            onChange={(e) => setsoDienThoai(e.target.value)}
          />
          <div>Địa chỉ</div>
          <input
            Label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            value={diaChi}
            name="diaChi"
            type="text"
            // min="30"
            // max="99"
            onChange={(e) => setDiaChi(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Huỷ
          </button>
          <button className="button" onClick={OrderSubmit}>
            Lưu
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartPage;
