<template>
    <el-card :style="{marginTop:5+'px'}">
        <div>
            <p><b>{{information.user.name}}</b></p>
            <div>
                <div><b>时间 : </b>{{$utils.timeFormatter(information.time)+" "}}
                    <el-button style="float: right;padding: 0" type="text" @click="viewDetails(information.id)">查看</el-button>
                </div>
            </div>
            <hr/>

            <div>
                {{informationDesc(information.content)}}
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "InformationListItem",
        props: {
            information: Object
        },
        methods: {
            informationDesc(val) {
                if (val != null && val.length > 0) {
                    if (val.length > 100) {
                        return val.substring(0, 100) + "...";
                    } else {
                        return val;
                    }
                } else {
                    return "";
                }
            },
            viewDetails(val) {
                this.$emit("viewDetails", val);
            }


        }
    }
</script>