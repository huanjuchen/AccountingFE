<template>
  <div v-if="userInfo!=null">
    <p>
      <b>用户编号：</b>
      {{userInfo.id}}
    </p>
    <p>
      <b>用户名：</b>
      {{userInfo.username}}
    </p>
    <p>
      <b>姓名：</b>
      {{userInfo.name}}
    </p>
    <p>
      <b>用户类型：</b>
      {{$utils.getRole(userInfo.role)}}
    </p>
    <p>
      <b>创建日期：</b>
      {{$utils.dateFormatter(userInfo.joinTime)}}
    </p>
    <p>
      <b>手机号：</b>
      {{userInfo.phone}}
    </p>
  </div>
</template>


<script>
export default {
  name: "UserDetail",
  props: ["userInfo"],
  data: function() {
    return {};
  }
};
</script>