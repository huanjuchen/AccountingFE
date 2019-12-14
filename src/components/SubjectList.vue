<template>
  <div>
    <el-table :data="subjectList" style="width: 100%">
      <el-table-column label="科目编号" prop="id" width="150"></el-table-column>
      <el-table-column label="科目名" prop="name" width="360"></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
            <el-button size="medium" plain @click="viewDetails(scope.row)">详细信息</el-button>
          <el-button size="medium" type="danger" plain>禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详细信息" :visible.sync="infoDialog" width="360px" center>
      <div v-if="subjectInfo!=null">
        <p>
          <b>科目编号：</b>
          {{subjectInfo.id}}
        </p>
        <p>
          <b>科目名：</b>
          {{subjectInfo.name}}
        </p>
        <p>
          <b>科目类别：</b>
          {{getSubjectType(subjectInfo.subjectType)}}
        </p>
        <p>
          <b>描述：</b>
          {{subjectInfo.remark}}
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SubjectList",
  //----
  props: ["subjectList"],
  //------
  data: function() {
    return {
      infoDialog: false,
      subjectInfo: null
    };
  },
  methods: {
    viewDetails(val) {
      this.subjectInfo = val;
      this.infoDialog = true;
    },
    getSubjectType(val){
      if(val==0){
        return "现金科目";
      }else if(val==1){
        return "银行科目";
      }
    }
  }
};
</script>