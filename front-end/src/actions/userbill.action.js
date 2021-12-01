import { userBillConstants } from "./constants";
import axios from "../helpers/axios";
export const getOrders = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`/hoadon/getOrders`);
        dispatch({ type: userBillConstants.USER_BILL_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { data } = res.data;
          dispatch({
            type: userBillConstants.USER_BILL_SUCCESS,
            payload: { data },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userBillConstants.USER_BILL_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };