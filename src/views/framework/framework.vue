<template>
  <el-container class="sidebar-container">
    <el-header style="height: 80px; padding: 0">
      <div class="form-sub-title-box">
        <div style="width: 800px;">
          <span class="sub-title-ming">铭</span>
          <span class="sub-title sub-title-primary">洋越食品超市</span>
          <span class="sub-title-detial">学生用品&nbsp;&nbsp;日用小百&nbsp;&nbsp;五金日杂&nbsp;&nbsp;水暖电料</span>
<!--          <span class="sub-title-ming">1</span>-->
<!--          <span class="sub-title sub-title-primary">12345</span>-->
          <span class="sub-title-detial">1233&nbsp;&nbsp;1233&nbsp;&nbsp;1233&nbsp;&nbsp;1233</span>
        </div>
      </div>
      <!--<aside-menu></aside-menu>-->
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// import asideMenu from './aside_menu'

export default {
  name: 'framework'
  // components: { asideMenu }
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
    background-color: #e4e4e4;
  }
</style>
