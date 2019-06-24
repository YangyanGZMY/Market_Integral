<template>
  <div class="pd-b-5" style="height: 10%">
      <el-carousel v-if="convertFlag" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="item in carouselData" :key="item.memberName">
          <h3>{{ item.memberName }}</h3>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['carouselData', 'convertFlag'],
  methods: {}
}
</script>

<style scoped lang="scss">
  .el-carousel{
    height: 100%;
  }
  .el-carousel__container{
    height: 100%;
  }
  .el-carousel__item{
    height: 27%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    /*line-height: 200px;*/
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
