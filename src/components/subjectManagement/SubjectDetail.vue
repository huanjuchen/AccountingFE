<template>
    <div v-if="subject!=null">
        <p>
            <b>科目代码：</b>
            {{subject.id}}
        </p>
        <p>
            <b>科目名：</b>
            {{subject.name}}
        </p>
        <p>
            <b>科目类别：</b>
            {{ $utils.getSubjectCategory(subject.category)}}
        </p>
        <p v-if="subject.daysKind!=null">
            <b>日记账：</b>
            {{$utils.getDaysKind(subject.daysKind)}}
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
