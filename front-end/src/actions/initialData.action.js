import {
    initialDataConstants,
    orderConstants,
  } from "./constants";
  import axios from "../helpers/axios";
  
  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/admin/initialData`);
      if (res.status === 200) {
        const { bills } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { bills },
        });
      }
      console.log(res);
    };
  };
  