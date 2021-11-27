import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import bookReducer from "./book.reducer";
import categoryReducer from "./category.reducer";
import donHangReducer from "./donhang.reducer";
import publisherReducer from "./publisher.reducer";
import cartReducer from './cart.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    book: bookReducer,
    donHang: donHangReducer,
    publisher: publisherReducer,
    cart: cartReducer

});

export default rootReducer;