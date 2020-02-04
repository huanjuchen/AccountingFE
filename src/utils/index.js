export const dateFormatter = (value) => {
    let date = new Date(value);
    return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );

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
        return "损益类";
    }
};

export const getDaysKind = (val) => {
    if (val === 1) {
        return "现金类";
    } else if (val === 2) {
        return "银行类";
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
}
