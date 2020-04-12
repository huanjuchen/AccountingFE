<template>
    <div>
        <el-form :model="subjectObj" ref="subjectObj" :rules="rules" label-width="80px">
            <el-form-item prop="code" label="科目代码">
                <el-input type="number" size="small" placeholder="请输入科目代码" v-model="subjectObj.code"></el-input>
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

            <el-form-item prop="parentId" label="一级科目">
                <el-select size="small" filterable remote :remote-method="doGetParentList"
                           v-model="subjectObj.parentId">
                    <el-option
                            v-for="item in parentList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
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

            <el-form-item>
                <div :style="{textAlign:'center'}">
                    <el-button @click="doCancel">取 消</el-button>
                    <el-button type="primary" @click="submitForm('subjectObj')">添 加</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import {createSubjectApi, getSubjectListApi} from "../../api/subjectApi";

    export default {
        name: "SubjectCreate",
        data: function () {
            return {
                subjectObj: {
                    code: "",
                    name: "",
                    category: null,
                    parentId: null,
                    remark: "",
                    loading: false
                },
                subjectList: null,
                rules: {
                    code: [{required: true, message: "科目代码不能为空", trigger: "blur"}],
                    name: [
                        {required: true, message: "科目名不能为空", trigger: "blur"},
                        {max: 20, message: "长度不能超过20个字符"}
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
                        label: "损益类-收入",
                        value: 6
                    },
                    {
                        label: "损益类-费用",
                        value: 7
                    }
                ],
                parentList: []
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.subjectObj.daysKind == null || this.subjectObj.daysKind.length === 0) {
                            this.subjectObj.daysKind = 0;
                        }
                        createSubjectApi(this.subjectObj)
                            .then(response => {
                                if (response && response.data.code === 200) {
                                    this.$emit("createSuccess", response.data.data);
                                    this.subjectObj.code = null;
                                    this.subjectObj.name = "";
                                    this.subjectObj.remark = "";
                                    this.subjectObj.category = null;
                                    this.subjectObj.parentId = null;
                                    this.parentList = [];
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },

            doGetParentList(query) {
                if (query !== '') {
                    this.loading = true;
                    getSubjectListApi(query, true, null, 0, 1, 15)
                        .then(response => {
                            if (response && response.data.code === 200) {
                                this.parentList = response.data.data;
                            }
                            this.loading = false
                        });
                } else {
                    this.parentList = [];
                }
            },


            doCancel() {
                this.$emit("createCancel");
            },

        }
    }
</script>

<style scoped>

</style>