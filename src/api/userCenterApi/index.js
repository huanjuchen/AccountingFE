import myBaseApi from "../myBaseApi"

let url = "/center/";

const contentType = "application/x-www-form-urlencoded";

export const getInfoApi = () => {
    return myBaseApi(url + "info", null, "GET")
};

export const changeNameApi = (newName) => {
    let str = "newName=" + newName;
    return myBaseApi(url + "changeName", str, "PUT", contentType);
};

export const changePhoneApi = (newPhone) => {
    let str = "newPhone=" + newPhone;
    return myBaseApi(url + "changePhone", str, "PUT", contentType);
};

export const changePwdApi = (newPwd) => {
    let str = "newPwd=" + newPwd;
    return myBaseApi(url + "changePwd", str, "PUT", contentType);
};