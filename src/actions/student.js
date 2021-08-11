import {
    RETRIEVE_ALL_STUDENTS
} from "./types";

import StudentDataService from "../services/StudentService";

export const retrieveAllStudents = () => async (dispatch) => {
    try {
        const res = await StudentDataService.retrieveAllStudents();
        dispatch({
            type: RETRIEVE_ALL_STUDENTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};