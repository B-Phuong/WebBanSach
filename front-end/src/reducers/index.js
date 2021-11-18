import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import bookReducer from "./book.reducer";

import categoryReducer from "./category.reducer";
import donHangReducer from "./donhang.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    book: bookReducer,
    donHang: donHangReducer
});

export default rootReducer;