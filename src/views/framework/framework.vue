<template>
  <el-container>
    <el-aside>
      <aside-menu></aside-menu>
    </el-aside>
    <!--<el-container>-->
      <!--<router-view></router-view>-->
    <!--</el-container>-->
  </el-container>
</template>

<script>
import asideMenu from './aside_menu'
export default {
  name: 'framework',
  components: { asideMenu }
}
</script>

<style lang="scss" scoped>
  .sidebar-container{
    transition: width 1s;
    -moz-transition: width 1s;
    -webkit-transition: width 1s;
    -o-transition: width 1s;
    z-index: 99;
  }
  .el-aside{
    width: 100%;
  }
</style>
