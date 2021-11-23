import axios from "../helpers/axios";
import { publisherConstants } from "./constants";

export const getAllPublishers = () => {
    return async dispatch => {
        const res = await axios.get(`publisher/`)
        if (res.status === 200) {
            dispatch({
                type: publisherConstants.GET_ALL_PUBLISHERS,
                payload: res.data
            });
        } else {
            dispatch({
                type: publisherConstants.GET_ALL_PUBLISHERS,
                payload: { error: true }
            });
        }
    }
}