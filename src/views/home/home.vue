<template>
  <div class="home">
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
  </div>
</template>

<script>
import memberBar from '@/views/member/member'
import integralBar from '@/views/integral/integral'
import convertBar from '@/views/convert/convert'
export default {
  components: { memberBar, integralBar, convertBar }
}
</script>

<style scoped>
  .home{
    height: 100%;
  }
  .el-row{
    height: 100%;
  }
  .el-col{
    height: 100%;
  }
</style>
