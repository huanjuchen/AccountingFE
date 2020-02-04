import myBaseApi from "../myBaseApi"

const baseUrl = "/proof";

export const createProofApi = (obj) => {
    return myBaseApi("/proof", JSON.stringify(obj), "POST");
};


export const listByUserIdApi = (userId, page) => {
    return myBaseApi(baseUrl + "?recorderId=" + userId + "&page=" + page, null, "GET")
};


export const getProof = (rid, startDate, endDate, verify, orderType, page, pageSize) => {
    let queryParam = "";
    if (rid != null) {
        queryParam = queryParam + "&rid=" + rid;
    }
    if (startDate != null) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (verify != null) {
        queryParam = queryParam + "&verify=" + verify;
    }
    if (orderType != null && orderType.length > 0) {
        queryParam = queryParam + "&orderType=" + orderType;
    }
    if (page) {
        queryParam = queryParam + "&page=" + page;
    }
    if (pageSize) {
        queryParam = queryParam + "&pageSize=" + pageSize;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(baseUrl+"?"+queryParam, null, "GET");

};

export const getProofByIdApi = (id) => {
    return myBaseApi(baseUrl + "/" + id, null, "GET");
};