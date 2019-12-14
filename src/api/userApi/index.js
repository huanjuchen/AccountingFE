import myBaseApi from "@/api/myBaseApi"

let url="/api/admin/user"

export const createUserApi=(username,role,phone)=>{
    let obj={
        username:username,
        role:role,
        phone:phone
    }
    return myBaseApi(url,JSON.stringify(obj),"POST");
}

export const getUserListApi=(page)=>{
    return myBaseApi(url+"?page="+page,null,"GET");
}