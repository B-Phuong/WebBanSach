import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import bookReducer from "./book.reducer";
import categoryReducer from "./category.reducer";
import donHangReducer from "./donhang.reducer";
import homeauthReducer from "./homeauth.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    book: bookReducer,
    donHang: donHangReducer,
    homeauth:homeauthReducer
});

export default rootReducer;