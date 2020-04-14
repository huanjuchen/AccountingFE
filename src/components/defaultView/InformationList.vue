<template>
    <div>
        <div>
            <div v-for="item in list" :key="item.id" v-loading="loading">
                <information-list-item :information="item" @viewDetails="viewDetails"/>
            </div>
        </div>
        <el-divider></el-divider>
        <div style="text-align: center">
            <el-pagination @size-change="pageSizeChange" @current-change="pageChange" background
                           :total="total"
                           :page-sizes="[5,7,10,15]"
                           :page-size="pageSize"
                           :hide-on-single-page="value"
                           layout="prev, pager, next,sizes,total"></el-pagination>
        </div>
    </div>
</template>

<script>
    import InformationListItem from "./InformationListItem"

    export default {
        name: "InformationList",
        props: {
            list: Array,
            total: Number,
            page: Number,
            pageSize: Number,
            loading: Boolean
        },
        data(){
          return{
              value:true
          }
        },
        methods: {
            viewDetails(val) {
                this.$emit("viewDetails", val);
            },
            pageSizeChange(val) {
                this.$emit("pageSizeChange", val);
            },
            pageChange(val) {
                this.$emit("pageChange", val);
            }
        },
        components: {
            "information-list-item": InformationListItem
        }
    }
</script>