<template>
  <el-container class="sidebar-container">
    <el-header class="no-pd">
      <aside-menu></aside-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
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
    height: 100vh !important;
  }
  .el-main{
    padding: 10px;
  }
</style>
