<template>
  <div>
    <el-card>
      <el-input
        size="medium"
        placeholder="请输入查找的科目名..."
        v-model="searchText"
        v-bind:style="{width:40+'%'}"
      ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="medium" type="primary">
        <i class="el-icon-search"></i> 搜 索
      </el-button>
      <el-button size="medium" type="primary">
        <i class="el-icon-warning-outline"></i>
        重 置
      </el-button>
      <el-button size="medium" type="primary" @click="showCreateDialog()">
        <i class="el-icon-plus"></i> 添 加
      </el-button>
    </el-card>

    <el-card :style="{marginTop:2+'%'}">
      <subject-list :subjectList="subjectList" v-if="subjectList!=null" />
    </el-card>

    <el-dialog title="创建科目" :visible.sync="dialogFormVisible" width="480px" center>
      <el-form :model="subjectObj" ref="subjectObj" :rules="rules">
        <el-form-item prop="id">
          <el-input type="number" placeholder="科目编号" v-model="subjectObj.id"></el-input>
        </el-form-item>

        <el-form-item prop="name">
          <el-input placeholder="科目名" v-model="subjectObj.name"></el-input>
        </el-form-item>
        <el-form-item prop="subjectType">
          <el-checkbox v-model="typeEnabled">日记账</el-checkbox>

          <el-radio :disabled="!typeEnabled" v-model="subjectObj.subjectType" :label="1">现金类科目</el-radio>
          <el-radio :disabled="!typeEnabled" v-model="subjectObj.subjectType" :label="2">银行类科目</el-radio>
        </el-form-item>
        <el-form-item prop="remark">
          <el-input
            type="textarea"
            placeholder="备注"
            v-model="subjectObj.remark"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('subjectObj')">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createSubjectApi, getSubjectListApi } from "../api/subjectApi";
import SubjectList from "../components/SubjectList";
export default {
  name: "SubjectManagement",
  data: function() {
    return {
      dialogFormVisible: false,
      searchText: null,
      subjectObj: {
        id: null,
        name: null,
        subjectType: 0,
        remark: null
      },
      typeEnabled: false,
      subjectList: null,
      rules: {
        id: [{ required: true, message: "科目编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "科目名不能为空", trigger: "blur" },
          { max: 50, message: "长度不能超过50个字符" }
        ]
      },

      page: 1
    };
  },
  components: {
    "subject-list": SubjectList
  },
  methods: {
    submitForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.typeEnabled){
            this.subjectObj.subjectType=0;
          }
          createSubjectApi(this.subjectObj)
            .then(response => {
              // console.log(response);
              if (response && response.status == 200) {
                this.$message.success(
                  "科目 " + response.data.data.name + " 创建成功"
                );

                this.subjectObj.id = null;
                this.subjectObj.name = "";
                this.subjectObj.remark = "";
                this.subjectObj.subjectType = null;
                this.typeEnabled=false;
                this.refreshSubjectList(this.page);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    showCreateDialog() {
      this.dialogFormVisible = true;
    },
    refreshSubjectList() {
      getSubjectListApi(this.page)
        .then(response => {
          // console.log(response);
          if (response && response.status == 200) {
            this.subjectList = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    init() {
      this.refreshSubjectList();
    }
  },

  watch:{
    typeEnabled:function(val){
      if(!val){
        this.subjectObj.subjectType=0;
      }
    }
  },
  //-----
  created: function() {
    this.init();
  }
};
</script>