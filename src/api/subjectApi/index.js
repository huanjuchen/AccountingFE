import myBaseApi from "../myBaseApi"

const subjectBaseApi = "/manage/subject";

const baseApi2 = "/subject";

// const contentType1 = "application/x-www-form-urlencoded";


export const createSubjectApi = (obj) => {
    return myBaseApi(subjectBaseApi, JSON.stringify(obj), "POST");
};


const paramHandle=(searchWord, valid, desc, parentId, page, pageSize)=>{
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
    if (parentId != null) {
        queryParam = queryParam + "&parentId=" + parentId;
    }
    if (page!=null) {
        queryParam = queryParam + "&page=" + page;
    }
    if (pageSize!=null) {
        queryParam = queryParam + "&pageSize=" + pageSize;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return queryParam;
};


export const getSubjectListApi = (searchWord, valid, desc, parentId, page, pageSize) => {
    let queryParam=paramHandle(searchWord,valid,desc,parentId,page,pageSize);
    return myBaseApi(baseApi2 + "?" + queryParam, null, "GET");
};


export const countSubjectApi = (searchWord,parentId, valid) => {
    let queryParam = paramHandle(searchWord,valid,null,parentId,null,null);
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







