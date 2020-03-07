<template>
    <div>
        {{information.content}}
        <el-divider></el-divider>
        <b>用户：</b>{{information.user.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>时间：</b>{{$utils.timeFormatter(information.time)}}
    </div>
</template>

<script>
    export default {
        name: "InformationDetails",
        props: {
            information: Object
        }
    }
</script>