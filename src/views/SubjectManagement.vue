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
      <el-form :model="subjectObj" ref="subjectObj" :rules="rules" label-width="80px">
        <el-form-item prop="id" label="科目编号">
          <el-input type="number" size="small" placeholder="请输入科目编号" v-model="subjectObj.id"></el-input>
        </el-form-item>

        <el-form-item prop="name" label="科目名">
          <el-input placeholder="请输入科目名" size="small" v-model="subjectObj.name"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="类别">
          <el-select size="small" v-model="subjectObj.category" placeholder="请选择科目类别">
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="daysKind" label="日记账">
          <el-select :disabled="!daysKindEnable" size="small" v-model="subjectObj.daysKind">
            <el-option label="现金类" value="1"></el-option>
            <el-option label="银行类" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="remark" label="科目备注">
          <el-input
            size="small"
            type="textarea"
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
        category: null,
        daysKind: "",
        remark: null
      },
      daysKindEnable: false,
      subjectList: null,
      rules: {
        id: [{ required: true, message: "科目编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "科目名不能为空", trigger: "blur" },
          { max: 50, message: "长度不能超过50个字符" }
        ],
        category: [
          {
            required: true,
            message: "请选择科目类别",
            trigger: "blur"
          }
        ]
      },
      categoryOptions: [
        {
          label: "资产类",
          value: 1
        },
        {
          label: "负债类",
          value: 2
        },
        {
          label: "共同类",
          value: 3
        },
        {
          label: "所有者权益类",
          value: 4
        },
        {
          label: "成本类",
          value: 5
        },
        {
          label: "损益类",
          value: 6
        }
      ],
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
          if (!this.typeEnabled) {
            this.subjectObj.subjectType = 0;
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
                this.subjectObj.category = "";
                this.subjectObj.daysKind = "";
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
      let offset=0;
      if(this.page!=0){
        offset=(this.page-1)*20;
      }
      let params={
        offset:offset,
        count:20
      }
      getSubjectListApi(params)
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
  computed: {

  },
  watch: {
    "subjectObj.category":function(val){
        if(val==1){
          this.daysKindEnable=true;
        }else{
          this.subjectObj.daysKind="";
          this.daysKindEnable=false;
        }
      }
  },
  //-----
  created: function() {
    this.init();
  }
};
</script>