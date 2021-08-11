import http from "../http-common";

const retrieveAllColleges = async () => {
    try {
        return http.get("/colleges");
    } catch (err) {
        return err;
    }
};

const CollegeService = {
    retrieveAllColleges
};

export default CollegeService;