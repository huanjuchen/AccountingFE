import myBaseApi from "@/api/myBaseApi"

const baseUrl="/api/proof"

export const createProofApi=(obj)=>{
    return myBaseApi("/api/proof",JSON.stringify(obj),"POST");
}


export const listByUserIdApi=(userId,page)=>{
    return myBaseApi(baseUrl+"?recorderId="+userId+"&page="+page,null,"GET")
}

export const getProofByIdApi=(id)=>{
    return myBaseApi(baseUrl+"/"+id,null,"GET");
}