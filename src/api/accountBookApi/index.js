import myBaseApi from "../myBaseApi"

const URL_PREFIX = "/accountBook";

export const getBankAccountApi = (startDate, endDate,page) => {
    let queryParam =paramHandle(null,startDate,endDate,page);
    return myBaseApi(URL_PREFIX + "/bank" + queryParam, null, "GET");
};

export const getBankAccountCountApi=(startDate,endDate)=>{
    let q=paramHandle(null,startDate,endDate,null);
    return myBaseApi(URL_PREFIX+"/bank/count"+q,null,"GET");
};


export const getCashAccountApi = (startDate, endDate,page) => {
    let queryParam = paramHandle(null,startDate,endDate,page);
    return myBaseApi(URL_PREFIX + "/cash" + queryParam, null, "GET");
};

export const getCashAccountCountApi=(startDate,endDate)=>{
    let q=paramHandle(null,startDate,endDate,null);
    return myBaseApi(URL_PREFIX+"/cash/count"+q,null,"GET");
};


export const getLedgerAccountApi = (subjectId,startDate, endDate) => {
    let queryParam = paramHandle(subjectId,startDate,endDate,null);
    return myBaseApi(URL_PREFIX + "/ledger" + queryParam, null, "GET");
};

export const getSubAccountApi = (subjectId, startDate, endDate, page) => {
    let queryParam = paramHandle(subjectId, startDate, endDate, page);
    return myBaseApi(URL_PREFIX + "/sub" + queryParam, null, "GET");
};

export const getSubAccountCountApi=(subjectId,startDate,endDate)=>{
    let q=paramHandle(subjectId,startDate,endDate,null);
    return myBaseApi(URL_PREFIX+"/sub/count"+q,null,"GET");
};

const paramHandle = (subjectId, startDate, endDate, page) => {
    let queryParam = "";
    if (subjectId != null) {
        queryParam = queryParam + "&subjectId=" + subjectId;
    }
    if (startDate != null && startDate.length > 0) {
        queryParam = queryParam + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        queryParam = queryParam + "&endDate=" + endDate;
    }
    if (page != null) {
        queryParam = queryParam + "&page=" + page;
    }

    if (queryParam.length > 0) {
        queryParam = "?" + queryParam.substr(1);
    }
    return queryParam;
};
