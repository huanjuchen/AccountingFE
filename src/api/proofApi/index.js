import myBaseApi from "../myBaseApi"

const baseUrl="/proof";

export const createProofApi=(obj)=>{
    return myBaseApi("/proof",JSON.stringify(obj),"POST");
};


export const listByUserIdApi=(userId,page)=>{
    return myBaseApi(baseUrl+"?recorderId="+userId+"&page="+page,null,"GET")
};

export const getProofByIdApi=(id)=>{
    return myBaseApi(baseUrl+"/"+id,null,"GET");
};