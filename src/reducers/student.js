import {
    RETRIEVE_ALL_STUDENTS
} from "../actions/types";

const initialState = [];

function studentReducer(students = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ALL_STUDENTS:
            return payload;

        default:
            return students;
    }
};

export default studentReducer;