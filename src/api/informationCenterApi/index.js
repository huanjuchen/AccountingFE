import myBaseApi from "../myBaseApi"

let manageUrl = "/manage/information";

let url = "/information";

export const pushApi = (content) => {
    let obj = {
        content: content
    };
    return myBaseApi(manageUrl, JSON.stringify(obj), "POST");
};

export const listApi = (uid, page, pageSize) => {
    let queryParam = "";
    if (page) {
        queryParam = queryParam + "&page=" + page;
    }
    if (pageSize) {
        queryParam = queryParam + "&pageSize=" + pageSize;
    }

    if (uid != null) {
        queryParam = queryParam + "&uid=" + uid;
    }
    if (queryParam.length > 0) {
        queryParam = "?" + queryParam.substr(1);
    }

    return myBaseApi(url + queryParam, null, "GET");

};

export const countApi = (uid) => {
    let queryParam = "";

    if (uid != null) {
        queryParam = queryParam + "&uid=" + uid;
    }
    if (queryParam.length > 0) {
        queryParam = "?" + queryParam.substr(1);
    }

    return myBaseApi(url + "/count" + queryParam, null, "GET");
};

export const deleteApi = (id) => {
    return myBaseApi(manageUrl + "/" + id, null, "DELETE");
};

export const getInformationApi = (id) => {
    return myBaseApi(url + "/" + id, null, "GET");
};