import axios from 'axios'
import {api} from '../urlConfig'
const axiosIntance = axios.create({
    baseURL: api,
    // header:{
    //     'Authorization':''
    // }
});
export default axiosIntance;