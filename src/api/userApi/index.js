import myBaseApi from "@/api/myBaseApi"

let url="/admin/user"

export const createUserApi=(user)=>{

    return myBaseApi(url,JSON.stringify(user),"POST");
}

export const getUserListApi=(page,pageSize,selectWord,valid,desc)=>{
    let queryParam="";
    if(page){
        queryParam=queryParam+"&page="+page;
    }
    if(pageSize){
        queryParam=queryParam+"&pageSize="+pageSize;
    }
    if(selectWord&&selectWord.length>0){
        queryParam=queryParam+"&selectWord="+selectWord;
    }
    if(valid){
        queryParam=queryParam+"&valid="+valid;
    }
    if(desc){
        queryParam=queryParam+"&desc="+desc;
    }


    if(queryParam.length>0){
        queryParam=queryParam.substr(1);
    }


    return myBaseApi(url+"?"+queryParam,null,"GET");
}


export const resetPwdApi=(userId)=>{


    return myBaseApi(url+"/resetPwd?userId="+userId,null,"PUT");
}