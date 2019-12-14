import myBaseApi from "../myBaseApi"

const subjectBaseApi="/api/manage/subject";


export const createSubjectApi=(obj)=>{

    return myBaseApi(subjectBaseApi,JSON.stringify(obj),"POST");
}

export const getSubjectListApi=(page)=>{
    return myBaseApi(subjectBaseApi+"?page="+page,null,"GET");
}

export const getAvailableSubjectListApi=()=>{
    return myBaseApi("/api/subject/available/true",null,"GET");
}
