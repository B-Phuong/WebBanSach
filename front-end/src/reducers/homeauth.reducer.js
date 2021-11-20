import {homeauthConstants} from "../actions/constants"

const initState ={
    token: null,
    user:{
        tenNguoiDung:'',
        email:'',
        matKhau:'',
        soDienThoai:'',
        anhDaiDien:''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};
export default (state ={}, action)=>{
    console.log(action);
    
    switch(action.type){    
        case homeauthConstants.HOME_LOGIN_REQUEST:
            state ={
                ...state,
                authenticating: true
            }
            break;
        case homeauthConstants.HOME_LOGIN_SUCCESS:
            state={
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate:true,
                authenticating:false
            }
            break;
        case homeauthConstants.HOME_LOGOUT_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case homeauthConstants.HOME_LOGOUT_SUCCESS:
            state={
                ...initState
            }
            break;
        case homeauthConstants.HOME_LOGOUT_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}