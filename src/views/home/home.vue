<template>
  <div class="home">
    <el-row>
      <el-col :span="memberWith">
        <!--<el-button class="fr" size="small" type="warning" icon="el-icon-edit" @click="memberMove">注册</el-button>-->
        <member-bar></member-bar>
      </el-col>
      <el-col :span="integralWith">
        <integral-bar></integral-bar>
      </el-col>
      <el-col :span="convertWith">
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
  data () {
    return {
      memberWith: 6,
      integralWith: 12,
      convertWith: 6
    }
  },
  components: { memberBar, integralBar, convertBar },
  methods: {
    memberMove () {
      if (this.memberWith === 6) {
        this.memberWith = 3
        this.integralWith = 15
      } else {
        this.memberWith = 6
        this.integralWith = 12
      }
    }
  }
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
    height: 99%;
  }
</style>
