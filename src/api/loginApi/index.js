import myBaseApi from "../myBaseApi";

export const LoginApi=(username,password)=>{
    let obj={
        username:username,
        password:password
    };
    return myBaseApi("/login",JSON.stringify(obj),"POST");
};

export const LogoutApi=()=>{
    return myBaseApi("/logout",null,"GET");
};