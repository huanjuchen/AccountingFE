export const dateFormatter=(value)=>{
    let date = new Date(value);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );

};



export const getRole=(val)=>{
    if (val === 1) {
        return "超级管理员";
      } else if (val === 2) {
        return "主管会计";
      } else {
        return "会计";
      }
};

export const boolean2Hanzi=(val)=>{
    if(val){
        return "是";
    }else{
        return "否"
    }
};