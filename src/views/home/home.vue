<template>
  <div class="home">
    <el-row>
      <div class="pd-b-5" style="height: 50px">
        <el-carousel direction="vertical" :autoplay="true">
          <el-carousel-item v-for="item in carouselData" :key="item.logSeq">
            <h3 style="color: red;">
              <label class="el-icon-bell" style="font-weight: 800;"></label>
              恭喜 <{{ item.memberName }}> : 成功兑换 {{ item.integralNum }} 积分！！！</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-row>
    <el-row>
      <el-col :span="6">
        <!--<el-button class="fr" size="small" type="warning" icon="el-icon-edit" @click="memberMove">注册</el-button>-->
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
  data () {
    return {
      memberWith: 6,
      integralWith: 12,
      convertWith: 6,
      carouselData: []
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
  },
  mounted () {
    this.$bus.off('carouselData').on('carouselData', item => {
      this.carouselData = item
    })
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
  .el-carousel{
    height: 100%;
  }
  .el-carousel__container{
    height: 100%;
  }
  .el-carousel__item{
    height: 27% !important;
  }
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    margin: 0;
    text-align: center;
    font-size: 21px;
    padding-top: 10px;
  }

  .el-carousel__item:nth-child(1) {
    background-color: #FFFFFF;
  }

  .el-carousel__item:nth-child(2) {
    background-color: #FFFFFF;
  }
  .el-carousel__item:nth-child(3) {
    background-color: #FFFFFF;
  }
  .el-carousel__item:nth-child(4) {
    background-color: #FFFFFF;
  }
  .el-carousel__item:nth-child(5) {
    background-color: #FFFFFF;
  }
  .el-carousel__indicators--vertical{
    display: none !important;
  }
</style>
