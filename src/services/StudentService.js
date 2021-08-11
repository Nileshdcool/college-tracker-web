import http from "../http-common";

const retrieveAllStudents = async () => {
    try {
        return http.get("/students");
    } catch (err) {
        return err;
    }
};

const StudentService = {
    retrieveAllStudents
};

export default StudentService;