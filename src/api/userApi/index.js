import myBaseApi from "@/api/myBaseApi"

let url = "/admin/user";

export const createUserApi = (user) => {

    return myBaseApi(url, JSON.stringify(user), "POST");
};

export const getUserListApi = (page, pageSize, selectWord, valid, desc) => {
    let queryParam = "";
    if (page) {
        queryParam = queryParam + "&page=" + page;
    }
    if (pageSize) {
        queryParam = queryParam + "&pageSize=" + pageSize;
    }
    if (selectWord && selectWord.length > 0) {
        queryParam = queryParam + "&selectWord=" + selectWord;
    }
    if (valid!=null) {
        queryParam = queryParam + "&valid=" + valid;
    }
    if (desc) {
        queryParam = queryParam + "&desc=" + desc;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(url + "?" + queryParam, null, "GET");
};

export const userCountApi = (selectWord,valid) => {
    let queryParam = "";
    if (selectWord && selectWord.length > 0) {
        queryParam = queryParam + "&selectWord=" + selectWord;
    }
    if (valid) {
        queryParam = queryParam + "&valid=" + valid;
    }
    if (queryParam.length > 0) {
        queryParam = queryParam.substr(1);
    }
    return myBaseApi(url+"/count?"+queryParam,null,"GET");
};


//重置密码
export const resetPwdApi = (userId) => {
    return myBaseApi(url + "/resetPwd/"+userId , null, "PUT");
};
//禁用用户
export const lockUserApi = (userId) => {
    return myBaseApi(url + "/lock/"+userId , null, "PUT");
};
//启用用户
export const unlockUserApi = (userId) => {
    return myBaseApi(url + "/unlock/" + userId, null, "PUT");
};