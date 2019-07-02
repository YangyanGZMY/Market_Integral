<template>
  <div class="convert-bar pd-5">
    <el-card class="no-pd" style="height: 89.4%" id="convertBox">
      <div slot="header" class="clearfix">
        <span class="card-title">积分兑换</span>
        <el-button class="fr" size="small" type="warning" icon="el-icon-s-shop" @click="convert">兑换</el-button>
      </div>
      <el-row>
        <el-col :span="24">
          <el-autocomplete
            v-model="convertInfo"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="请输入会员名"
            suffix-icon="el-icon-search"
            style="width: 100%;">

          </el-autocomplete>
        </el-col>
      </el-row>
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
        this.$bus.emit('carouselData', this.carouselData)
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
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) + 100
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
</style>
