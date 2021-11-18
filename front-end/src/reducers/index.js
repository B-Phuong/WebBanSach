import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import bookReducer from "./book.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    book: bookReducer
});

export default rootReducer;