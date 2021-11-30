import axios from "../helpers/axios";
import { cartConstants } from "./constants";
import store from "../store";
import { toast } from "react-toastify";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.get(`/cart`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        // cartItems: Object.keys(cartItems).map((key, index) => {
        //     return {
        //         quantity: cartItems[key].qty,
        //         product: cartItems[key]._id
        //     }
        // })
        // cartItems:   {
        //     maSach: product._id,
        //     soLuong: newQty,
        //   },

        maSach: product._id,
        soLuong: newQty,
      };
      console.log(payload);
      try {
        const res = await axios.put(`/cart`, payload);
        console.log(res);
        if (res.status === 200) {
          if (newQty == -1) {
            await toast.success("Thay đổi số lượng thành công", {
              autoClose: 2000,
            });
          } else
            await toast.success("Thêm vào giỏ hàng thành công", {
              autoClose: 2000,
            });
          dispatch(getCartItems());
        } else {
          await toast.error(
            res.body.error ? res.body.error : "Lỗi khi thêm vào giỏ hàng",
            { autoClose: 2000 }
          );
        }
      } catch (err) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
        await toast.error(err.response.data.error, { autoClose: 2000 });
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    console.log("addToCart::", cartItems);

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

export const orderDefault = (info) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    //console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    // const qty = cartItems[product._id]
    //   ? parseInt(cartItems[product._id].qty + newQty)
    //   : 1;
    // cartItems[product._id] = {
    //   ...product,
    //   qty,
    // };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ORDER_DEFAULT_REQUEST });
      const payload = {
        // cartItems: Object.keys(cartItems).map((key, index) => {
        //     return {
        //         quantity: cartItems[key].qty,
        //         product: cartItems[key]._id
        //     }
        // })
        // cartItems:   {
        //     maSach: product._id,
        //     soLuong: newQty,
        //   },

        // Items: products,
        listbooksOder: cartItems,
        diaChiGiaoHang: info.diaChiGiaoHang,
        soDienThoai: info.soDienThoai,
        phiGiaoHang: 20000,
      };
      console.log(payload);
      try{
      const res = await axios.post(`/hoadon/taohoadon`, payload);
      console.log(res);
      if (res.status === 200) {
        await toast.success("Đặt hàng thành công", { autoClose: 2000 });

        dispatch(getCartItems());
      }
    }
    catch (err) {
      await toast.error(err.response.data.error, { autoClose: 2000 });
    }



    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }


    console.log("addToCart::", cartItems);

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.delete(`/cart/removeItem/${payload.productId}`);
      if (res.status === 200) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    console.log("upppppppppp");

    if (auth.authenticate) {
      localStorage.removeItem("cart");
      //dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post(`/user/cart/addtocart`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export { getCartItems };
