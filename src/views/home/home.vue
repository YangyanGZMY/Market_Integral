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
      <el-col :span="memberWithFlag ? 6 : 3" class="sidebar-container">
        <!--<el-button class="fr" type="warning" icon="el-icon-edit"></el-button>-->
        <member-bar></member-bar>
      </el-col>
      <el-col :span="integralWithFlag ? 12 : 15" class="sidebar-container">
        <div @click="memberMove" class="collapse-box">
<!--          <img src="/images/collapse.png" width="20px" :class="{'is-collapse': imageRotate}"/>-->
          <img src="/images/sub_title_bg_warning.png" width="20px" :class="{'is-collapse': imageRotate}"/>
        </div>
        <integral-bar></integral-bar>
      </el-col>
      <el-col :span="convertWithFlag ? 6 : 3" class="sidebar-container">
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
      memberWithFlag: true,
      integralWithFlag: true,
      convertWithFlag: true,
      carouselData: [],
      imageRotate: true
    }
  },
  components: { memberBar, integralBar, convertBar },
  methods: {
    memberMove () {
      this.memberWithFlag = !this.memberWithFlag
      this.integralWithFlag = !this.integralWithFlag
      this.imageRotate = !this.imageRotate
    }
  },
  mounted () {
    this.$bus.off('carouselData').on('carouselData', item => {
      this.carouselData = item
    })
  }
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
  .collapse-box{
    display: inline-block;
    height: 45px;
    line-height: 43px;
    margin-left: 3px;
    cursor: pointer;
    position: fixed;
    img {
      height: 20px;
      transition: transform 1s;
      -moz-transition: transform 1s;
      -webkit-transition: transform 1s;
      -o-transition: transform 1s;
    }
    .is-collapse{
      transform: rotate(90deg)
    }
  }
</style>
