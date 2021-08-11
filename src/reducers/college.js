import {
    RETRIEVE_ALL_COLLEGES
} from "../actions/types";

const initialState = [];

function collegeReducer(colleges = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ALL_COLLEGES:
            return payload;

        default:
            return colleges;
    }
};

export default collegeReducer;