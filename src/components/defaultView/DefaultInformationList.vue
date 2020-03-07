<template>
    <div>
        <div v-for="item in informationList" :key="item.id">
            <information-list-item :information="item" @viewDetails="viewDetails"/>
        </div>
    </div>
</template>

<script>
    import InformationListItem from "./InformationListItem"
    export default {
        name: "DefaultInformationList",
        props: {
            informationList: Array
        },
        methods:{
            viewDetails(val) {
                this.$emit("viewDetails", val);
            }
        },
        components: {
            "information-list-item": InformationListItem
        }
    }
</script>
