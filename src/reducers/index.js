import { combineReducers } from "redux";
import colleges from "./college";
import students from "./student";

export default combineReducers({
    colleges,
    students
});