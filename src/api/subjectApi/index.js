import myBaseApi from "../myBaseApi"

const subjectBaseApi="/manage/subject";


export const createSubjectApi=(obj)=>{

    return myBaseApi(subjectBaseApi,JSON.stringify(obj),"POST");
};



export const getSubjectListApi=(params)=>{
    // return 
    let url="/subject?1=1";
    for(let k in params){
        url=url+"&"+k+"="+params[k];
    }

    return myBaseApi(url,null,"GET");
};



