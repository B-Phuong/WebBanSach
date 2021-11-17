import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import bookReducer from "./book.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer
});

export default rootReducer;