<template>
  <div class="convert-bar pd-5">
    <div class="pd-b-5" style="height: 10%">
      <el-carousel direction="vertical" :autoplay="true">
        <el-carousel-item v-for="item in carouselData" :key="item.logSeq">
          <label class="el-icon-bell mg-t-10">恭喜 {{ item.memberName }} : </label>
          <!--<h3 >恭喜 {{ item.memberName }} : </h3>-->
          <h3>成功兑换 {{ item.integralNum }} 积分</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card class="no-pd" style="height: 89.4%" id="convertBox">
      <el-row>
        <el-col :span="17">
          <el-autocomplete
            v-model="convertInfo"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="请输入会员名"
            suffix-icon="el-icon-search"
          ></el-autocomplete>
        </el-col>
        <el-col :span="7">
          <el-button class="fr" size="small" type="primary" icon="el-icon-s-shop" @click="convert">兑换</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table :height="tableHeight" class="mg-t-10 market-table" :data="convertData" border>
        <el-table-column
          align="center"
          prop="memberName"
          label="会员">
        </el-table-column>
        <el-table-column
          align="center"
          prop="integralNum"
          label="已兑换">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createYmdt"
          min-width="160"
          label="时间">
        </el-table-column>
      </el-table>
    </el-card>
    <convert-layer v-if="convertFlag" :convertFlag="convertFlag"
                   @cancel="cancelConvert"
                   @save="saveConvert">
    </convert-layer>
  </div>
</template>

<script>
import convertLayer from '@/components/business/convert_layer.vue'
import api from '@/api'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      convertInfo: null,
      convertData: [],
      tableHeight: null,
      convertFlag: false,
      timeout: null,
      carouselData: []
    }
  },
  components: { convertLayer },
  methods: {
    // change () {
    //   this.convertData.push(this.convertData[0])
    //   this.convertData.shift()
    // },
    // play () {
    //   setInterval(this.change, 2000)
    // },
    querySearchAsync (queryString, callback) {
      let param = {
        name: queryString
      }
      api.convert.search(param).then(response => {
        if (typeof callback === 'function') {
          callback(response.result)
        }
      })
    },
    handleSelect (item) {
      let param = {
        name: item.memberName
      }
      this.getConvert(param)
    },
    getConvert (param) {
      api.convert.getConverts(param).then(response => {
        this.convertData = response.result
        this.carouselData = this.convertData.slice(0, 5)
        console.log(this.carouselData)
      })
    },
    convert () {
      this.convertFlag = true
    },
    cancelConvert () {
      this.convertFlag = false
    },
    saveConvert (form) {
      api.convert.add(form).then(response => {
        if (response.result) {
          Message.success('兑换成功')
          this.$bus.emit('refreshMember')
          this.getConvert()
          this.convertFlag = false
        } else {
          Message.error('积分不足')
        }
      })
    }
  },
  mounted () {
    let contentBox = document.getElementById('convertBox')
    let contentHeight = window.getComputedStyle(contentBox).height
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) - 100
  },
  created () {
    this.getConvert()
    // this.play()
    // this.querySearchAsync()
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/var';
  @import '../../assets/scss/theme';
  .convert-bar{
    height: 100%;
  }
  .el-card{
    height: 100%;
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
    background-color: #7B68EE;
  }

  .el-carousel__item:nth-child(2) {
    background-color: #87CEFA;
  }
  .el-carousel__item:nth-child(3) {
    background-color: #87CEFA;
  }
  .el-carousel__item:nth-child(4) {
    background-color: #ccc;
  }
  .el-carousel__item:nth-child(5) {
    background-color: #87CEFA;
  }
</style>
