<template>
    <div>

        <div class="acc-table-header">
            <div class="acc-table-header-abs">
                摘要
            </div>
            <div class="acc-table-header-subject">
                <div class="acc-table-header-subject-item-top">
                    借方
                </div>
                <div class="acc-table-header-subject-item-bottom">
                    <div class="acc-table-header-subject-item-left">
                        总账
                    </div>
                    <div class="acc-table-header-subject-item-right">
                        明细账
                    </div>
                </div>
            </div>

            <div class="acc-table-header-subject">
                <div class="acc-table-header-subject-item-top">
                    贷方科目
                </div>
                <div class="acc-table-header-subject-item-bottom">
                    <div class="acc-table-header-subject-item-left">
                        总账
                    </div>
                    <div class="acc-table-header-subject-item-right">
                        明细账
                    </div>
                </div>
            </div>

            <div class="acc-table-header-money">
                金额
            </div>
        </div>


            <el-card>
                hhh
            </el-card>


    </div>
</template>

<script>
    export default {
        name: "ProofTable"
    }
</script>

<style scoped>
    .acc-table-header {
        float: left;
        height: 60px;
        font-weight: bold;
        width: 100%;
        border-left: solid #b5b5b5 2px;
    }


    .acc-table-header-abs{
        float: left;
        height: 60px;
        width: 20%;
        line-height: 60px;
        border-right: solid #b5b5b5 2px;
        border-top: solid #b5b5b5 2px;
        border-bottom: solid #b5b5b5 2px;

    }

    .acc-table-header-subject{
        float: left;
        height: 60px;
        width: 30%;
        border-right: solid #b5b5b5 2px;
        border-top: solid #b5b5b5 2px;
        border-bottom: solid #b5b5b5 2px;

    }

    .acc-table-header-subject-item-top{
        margin-top: 0;
        height: 29px;
        width: 100%;
        border-bottom: solid #b5b5b5 2px;
    }

    .acc-table-header-subject-item-bottom{
        float: left;

        height: 30px;
        width: 100%;
    }

    .acc-table-header-subject-item-left{
        float: left;
        height: 29px;
        width: 50%;
        border-right: solid #b5b5b5 2px;
    }

    .acc-table-header-subject-item-right{
        float: left;
        height: 29px;
        width: 49%;
    }

    .acc-table-header-money{
        float: left;
        height: 60px;
        width: 19%;
        line-height: 60px;
        border-right: solid #b5b5b5 2px;
        border-top: solid #b5b5b5 2px;
        border-bottom: solid #b5b5b5 2px;
    }



</style>