import myBaseApi from "../myBaseApi"

const subjectBaseApi = "/manage/subject";

const baseApi2 = "/subject";

// const contentType1 = "application/x-www-form-urlencoded";


export const createSubjectApi = (obj) => {
    return myBaseApi(subjectBaseApi, JSON.stringify(obj), "POST");
};


export const getSubjectListApi = (searchWord, valid, desc, selectType, page, pageSize) => {
    let queryParam = "";
    if (searchWord != null && searchWord.length > 0) {
        queryParam = queryParam + "&searchWord=" + searchWord;
    }
    if (valid != null) {
        queryParam = queryParam + "&valid=" + valid;
    }
    if (desc != null && desc.length > 0) {
        queryParam = queryParam + "&desc=" + desc;
    }
    if (selectType != null && selectType.length > 0) {
        queryParam = queryParam + "&selectType=" + selectType;
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
    return myBaseApi(baseApi2 + "?" + queryParam, null, "GET");
};


export const countSubjectApi = (searchWord, valid) => {
    let queryParam = "";
    if (searchWord != null && searchWord.length > 0) {
        queryParam = queryParam + "&searchWord=" + searchWord;
    }

    if (valid != null) {
        queryParam = queryParam + "&valid=" + valid;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(baseApi2 + "/count?" + queryParam, null, "GET");

};


export const getSubjectById = (subjectId) => {
    return myBaseApi(baseApi2 + "/" + subjectId, null, "GET");
};


export const updateSubjectApi = (obj) => {
    return myBaseApi(subjectBaseApi, JSON.stringify(obj), "PUT");
};

export const lockSubjectApi = (val) => {
    return myBaseApi(subjectBaseApi + "/lock/" + val, null, "PUT");

};

export const unLockSubjectApi = (val) => {

    return myBaseApi(subjectBaseApi + "/unlock/" + val, null, "PUT");

};


export const deleteSubjectApi = (val) => {
    return myBaseApi(subjectBaseApi + "/" + val, null, "DELETE");
};







