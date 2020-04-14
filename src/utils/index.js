export const dateFormatter = (value) => {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = null;
    if (date.getMonth() < 9) {
        month = "0" + (date.getMonth() + 1);
    } else {
        month = "" + (date.getMonth() + 1);
    }
    let day = null;

    if (date.getDate() < 10) {
        day = "0" + date.getDate();
    } else {
        day = "" + date.getDate();
    }
    return year + "-" + month + "-" + day;
};

export const timeFormatter = (value) => {
    let date = new Date(value);
    let dateStr = dateFormatter(value);
    let hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }


    let mim = date.getMinutes();
    if (mim < 10) {
        mim = "0" + mim;
    }
    let sec = date.getSeconds();
    if (sec < 10) {
        sec = "0" + sec;
    }

    return dateStr + " " + hour + ":" + mim + ":" + sec;

};

export const getRole = (val) => {
    if (val === 1) {
        return "超级管理员";
    } else if (val === 2) {
        return "主管会计";
    } else {
        return "会计";
    }
};

export const getState = (val) => {
    if (val) {
        return "启用";
    } else {
        return "禁用"
    }
};

export const getSubjectCategory = (val) => {
    if (val === 1) {
        return "资产类";
    } else if (val === 2) {
        return "负债类";
    } else if (val === 3) {
        return "共同类";
    } else if (val === 4) {
        return "所有者权益类";
    } else if (val === 5) {
        return "成本类";
    } else if (val === 6) {
        return "损益类-收入";
    }else if (val===7) {
        return "损益类-费用";
    }
};

export const getVerifyStatus = (val) => {
    if (val === 0) {
        return "待审核";
    } else if (val === 1) {
        return "审核通过";
    } else if (val === -1) {
        return "审核未通过";
    }
};

export const decimalAdd = (arg1, arg2) => {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n);
};


export const getLastDay=(year,month)=>{
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31;
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    }
    return isLeapYear(year) ? 29 : 28;
};


//查看该年份是否为闰年
export const isLeapYear=(year)=>{
    if (year % 400 === 0) {
        return true;
    } else return year % 4 === 0 && year % 100 !== 0;
};

export const debitCredit=(val)=>{
    if (val===0){
        return "平";
    } else if (val===-1){
        return "借";
    } else if (val===1){
        return "贷";
    }

    return null;
};
