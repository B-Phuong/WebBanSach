import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndexHome from "../../components/Layout/Header/indexHome";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem, getAllBooks, getAllCategories, getPayPal } from "../../actions";
import PriceDetails from "../../components/PriceDetails";

import PayPal from "../Payment/Paypal";

import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";

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
  const totalBill = useSelector(state => state.user.totalCurrentBill)
  useEffect(() => {
    dispatch(getPayPal());
    setCheckOut(false);
  }, []);
  
  const [checkout, setCheckOut] = useState(false);



  // cart
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

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
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`Giỏ hàng`}
          headerRight={<div>Số tiền</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
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
              {/* <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push(`/checkout`)}
              /> */}

              <div className="payment-option">
                {checkout ? (
                  <PayPal total={totalBill} />
                ) : (
                  <button
                    onClick={() => {
                      setCheckOut(true);
                    }}
                  >
                    Thanh toán trực tuyến
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].soLuong;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { giaGoc, soLuong, giamGia } = cart.cartItems[key];
            return (giaGoc * soLuong * (100 - giamGia)) / 100;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CartPage;
