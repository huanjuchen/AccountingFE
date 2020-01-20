<template>
  <div>
    <el-table :data="subjectList" style="width: 100%">
      <el-table-column label="科目编号" prop="id" width="120"></el-table-column>
      <el-table-column label="科目名" prop="name" width="150"></el-table-column>
      <el-table-column label="科目类别" width="150">
        <template slot-scope="scope">{{getCategory(scope.row.category)}}</template>
      </el-table-column>

      <el-table-column label="日记账" width="150">
        <template slot-scope="scope">{{getDaysKind(scope.row.daysKind)}}</template>
      </el-table-column>

      <el-table-column label="状态" width="150">
        <template slot-scope="scope">{{getValid(scope.row.valid)}}</template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" plain @click="viewDetails(scope.row)">详细信息</el-button>
          <el-button size="small" plain>修 改</el-button>
          <el-button size="small" type="danger" plain>禁 用</el-button>
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
          {{getCategory(subjectInfo.category)}}
        </p>
        <p v-if="subjectInfo.daysKind!=null">
          <b>日记账：</b>
          {{getDaysKind(subjectInfo.daysKind)}}
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
    getCategory(val) {
      if (val == 1) {
        return "资产类";
      } else if (val == 2) {
        return "负债类";
      } else if (val == 3) {
        return "共同类";
      } else if (val == 4) {
        return "所有者权益类";
      } else if (val == 5) {
        return "成本类";
      } else if (val == 6) {
        return "损益类";
      }
    },

    getDaysKind(val) {
      if (val == 1) {
        return "现金类";
      } else if (val == 2) {
        return "银行类";
      }
    },

    getValid(val) {
      if (val) {
        return "可用";
      } else {
        return "不可用";
      }
    }
  }
};
</script>