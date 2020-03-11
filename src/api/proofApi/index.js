import myBaseApi from "../myBaseApi"

const baseUrl = "/proof";


export const createProofApi = (obj) => {
    return myBaseApi("/proof", JSON.stringify(obj), "POST");
};

export const getProof = (rid, startDate, endDate, verify, orderType, page, pageSize) => {
    let queryParam = "";
    if (rid != null) {
        queryParam = queryParam + "&rid=" + rid;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
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
    return myBaseApi(baseUrl + "?" + queryParam, null, "GET");
};

export const getProofCountApi = (rid, startDate, endDate, verify) => {
    let queryParam = "";
    if (rid != null) {
        queryParam = queryParam + "&rid=" + rid;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (verify != null) {
        queryParam = queryParam + "&verify=" + verify;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(baseUrl + "/count?" + queryParam, null, "GET");
};

export const getProofByIdApi = (id) => {
    return myBaseApi(baseUrl + "/" + id, null, "GET");
};

export const verifyProofApi = (obj) => {
    return myBaseApi("/manage/proof/verify", JSON.stringify(obj), "PUT")
};

export const trashProofApi=(id)=>{
    return myBaseApi("/proof/trash/"+id,null,"PUT");
};