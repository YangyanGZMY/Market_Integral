<template>
  <div class="home">
    <el-row>
      <div v-if="carouselData.length > 4" class="pd-b-5" style="height: 50px">
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
      <el-col :span="memberWith" class="sidebar-container">
        <div @click="memberMove" style="position: fixed;">
          <img src="/public/collapse.png"/>
        </div>
        <!--<el-button class="fr" type="warning" icon="el-icon-edit"></el-button>-->
        <member-bar></member-bar>
      </el-col>
      <el-col :span="integralWith" class="sidebar-container">
        <integral-bar></integral-bar>
      </el-col>
      <el-col :span="convertWith" class="sidebar-container">
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
  .sidebar-container{
    transition: width 1s;
    -moz-transition: width 1s;
    -webkit-transition: width 1s;
    -o-transition: width 1s;
    z-index: 99;
  }
  /*.home{*/
    /*height: 100%;*/
  /*}*/
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
