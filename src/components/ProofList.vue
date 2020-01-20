<template>
    <div>
        <el-table v-if="proofList!=null&&proofList.length!=0"
        :data="proofList"
        >


        </el-table>
    </div>
</template>

<script>
export default {
    name:"ProofList",
    props:{
        proofList:Array
    },
    data(){

    },

    methods:{

    }
}
</script>