import myBaseApi from "../myBaseApi"

const URL_PREFIX = "/accountBook";

export const getBankAccountApi = (startDate, endDate, page, pageSize) => {
    let queryParam = "";

    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
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
    return myBaseApi(URL_PREFIX + "/bank?" + queryParam, null, "GET");
};

export const getBankAccountCountApi = (startDate, endDate) => {
    let queryParam = "";

    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(URL_PREFIX + "/bank/count?" + queryParam, null, "GET");
};


export const getCashAccountApi = (startDate, endDate, page, pageSize) => {
    let queryParam = "";
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
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
    return myBaseApi(URL_PREFIX + "/cash?" + queryParam, null, "GET");
};

export const getCashAccountCountApi = (startDate, endDate) => {
    let queryParam = "";

    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(URL_PREFIX + "/cash/count?" + queryParam, null, "GET");
};

export const getLedgerAccountApi = (subjectId, startDate, endDate, page, pageSize) => {
    let queryParam = "";
    if (subjectId) {
        queryParam = queryParam + "&subjectId=" + subjectId;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
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
    return myBaseApi(URL_PREFIX + "/ledger?" + queryParam, null, "GET");
};

export const getLedgerAccountCountApi = (subjectId, startDate, endDate) => {
    let queryParam = "";
    if (subjectId) {
        queryParam = queryParam + "&subjectId=" + subjectId;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(URL_PREFIX + "/ledger/count?" + queryParam, null, "GET");
};

export const getSubAccountApi = (subjectId, startDate, endDate, page, pageSize) => {
    let queryParam = "";
    if (subjectId) {
        queryParam = queryParam + "&subjectId=" + subjectId;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
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
    return myBaseApi(URL_PREFIX + "/sub?" + queryParam, null, "GET");
};

export const getSubAccountCountApi = (subjectId, startDate, endDate) => {
    let queryParam = "";
    if (subjectId) {
        queryParam = queryParam + "&subjectId=" + subjectId;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(URL_PREFIX + "/sub/count?" + queryParam, null, "GET");
};