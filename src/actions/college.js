import {
    RETRIEVE_ALL_COLLEGES,
} from "./types";

import CollegeDataService from "../services/CollegeService";

export const retrieveAllColleges = () => async (dispatch) => {
    try {
        const res = await CollegeDataService.retrieveAllColleges();
        dispatch({
            type: RETRIEVE_ALL_COLLEGES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};