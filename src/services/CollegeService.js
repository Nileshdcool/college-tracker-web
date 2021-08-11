import http from "../http-common";

const retrieveAllColleges = async (name) => {
    try {
        return http.get(`/colleges?name=${name}`);
    } catch (err) {
        return err;
    }
};

const CollegeService = {
    retrieveAllColleges
};

export default CollegeService;