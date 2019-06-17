<template>
  <el-container class="sidebar-container">
    <el-header class="no-pd">
      <aside-menu></aside-menu>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="6">
          <member-bar></member-bar>
        </el-col>
        <el-col :span="12">
          <integral-bar></integral-bar>
        </el-col>
        <el-col :span="6">
          <convert-bar></convert-bar>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import asideMenu from './aside_menu'
import memberBar from '@/views/member/member'
import integralBar from '@/views/integral/integral'
import convertBar from '@/views/convert/convert'

export default {
  name: 'framework',
  components: { asideMenu, memberBar, integralBar, convertBar }
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
  .el-row{
    height: 100%;
  }
  .el-col{
    height: 100%;
  }
</style>
