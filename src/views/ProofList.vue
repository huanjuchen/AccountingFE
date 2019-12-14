<template>
    <div>
        <proof-create/>
    </div>
</template>

<script>
import ProofCreate from "../components/ProofCreate"
export default {
    name:"ProofList",

    components:{
        "proof-create":ProofCreate
    }
}
</script>