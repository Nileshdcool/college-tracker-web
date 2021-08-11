import {
    RETRIEVE_ALL_COLLEGES,
} from "./types";

import CollegeDataService from "../services/CollegeService";

export const retrieveAllColleges = (name) => async (dispatch) => {
    try {
        const res = await CollegeDataService.retrieveAllColleges(name);
        dispatch({
            type: RETRIEVE_ALL_COLLEGES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};