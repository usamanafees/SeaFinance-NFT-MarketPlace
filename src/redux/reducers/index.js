import { combineReducers } from "redux";
import userReducer from "./userReducer";
import marketItems from "./marketItemsReducer";

export default combineReducers({
    userReducer,
    marketItems
});