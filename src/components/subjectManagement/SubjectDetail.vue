<template>
    <div v-if="subject!=null">
        <p>
            <b>科目代码：</b>
            {{subject.code}}
        </p>
        <p>
            <b>科目名：</b>
            {{subject.name}}
        </p>
        <p>
            <b>科目类别：</b>
            {{ $utils.getSubjectCategory(subject.category)}}
        </p>
        <p>
            <b>一级科目：</b>
            {{subject.parent==null?null:subject.parent.name}}
        </p>

        <p>
            <b>状态：</b>
            {{$utils.getState(subject.valid)}}
        </p>

        <p>
            <b>描述：</b>
            {{subject.remark}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "SubjectDetail",
        props:['subject']
    }
</script>
