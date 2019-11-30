import myBaseApi from "@/api/myBaseApi"

let url="/api/admin/user"

export const createUserApi=(username,role)=>{
    let obj={
        username:username,
        role:role
    }
    return myBaseApi(url,JSON.stringify(obj),"POST");
}

