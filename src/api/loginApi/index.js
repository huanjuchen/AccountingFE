import myBaseApi from "@/api/myBaseApi"

export const LoginApi=(username,password)=>{

    let obj={
        username:username,
        password:password
    }

    return myBaseApi("/api/login",JSON.stringify(obj),"POST");
}