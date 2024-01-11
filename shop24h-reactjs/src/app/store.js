import {createStore, combineReducers} from "redux"
import Card from "../action/AddToCard";
import CheckBook from "../action/CheckBook";
import Donhang from "../action/Donhang";
import taskEven from "../action/filterReducer";

const appReducer = combineReducers({
    taskReducer: taskEven,
    taskCardReducer: Card,
    taskDonHangReducer: Donhang,
    taskCheckBook: CheckBook,
});
const store = createStore(
    appReducer,
   undefined, 
   undefined
);
 export default store