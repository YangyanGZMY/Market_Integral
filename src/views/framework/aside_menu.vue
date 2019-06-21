<template>
  <el-menu
    :default-active="activeIndex2"
    mode="horizontal"
    @select="handleSelect"
    background-color="#564e4e"
    text-color="#fff"
    active-text-color="#ffd04b">
    <!--<div class="form-sub-title-box">-->
      <!--<span class="sub-title sub-title-primary">洋越超市</span>-->
    <!--</div>-->
    <!--<el-button size="small" type="warning" icon="el-icon-edit">注册</el-button>-->
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="3">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect () {}
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-container .el-menu {
    border: none;
    width: 100%!important;
  }
</style>
