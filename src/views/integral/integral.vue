<template>
  <div class="integral-bar pd-tb-5">
    <el-card class="no-pd" id="integralBox">
      <el-row>
        <el-row>
          <el-col :span="6">
            <el-radio-group class="mg-t-10" v-model="searchKey">
              <el-radio label="phone">电话</el-radio>
              <el-radio label="num">金额</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="11">
            <el-input type="text" v-model="searchText" suffix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button class="fr" size="small" type="warning" icon="el-icon-shopping-cart-1" @click="add">添加</el-button>
            <el-button class="fr" style="margin-right: 10px;" size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-table :height="tableHeight" class="mg-t-10" :data="integralData" border>
          <el-table-column
            align="center"
            prop="name"
            label="会员">
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            min-width="100"
            label="电话">
          </el-table-column>
          <el-table-column
            align="center"
            prop="amount"
            label="金额">
          </el-table-column>
          <el-table-column
            align="center"
            prop="num"
            label="积分">
          </el-table-column>
          <el-table-column
            align="center"
            prop="time"
            min-width="160"
            label="时间">
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <integral-layer v-if="addAmountFlag" :addAmountFlag="addAmountFlag"
                    @cancel="cancelIntegral"
                    @save="saveIntegral"></integral-layer>
  </div>
</template>

<script>
import integralData from '@/option/memberData'
import integralLayer from '@/components/business/integral_layer.vue'

export default {
  data () {
    return {
      searchKey: 'phone',
      searchText: null,
      tableHeight: null,
      integralData: integralData,
      addAmountFlag: false
    }
  },
  components: { integralLayer },
  methods: {
    search () {
      console.log(this.searchKey)
    },
    add () {
      this.addAmountFlag = true
    },
    cancelIntegral () {
      this.addAmountFlag = false
    },
    saveIntegral () {
      this.addAmountFlag = false
    }
  },
  mounted () {
    let contentBox = document.getElementById('integralBox')
    let contentHeight = window.getComputedStyle(contentBox).height
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) - 100
  }
}
</script>

<style lang="scss" scoped>
  .integral-bar{
    height: 100%;
  }
  .el-card{
    height: 100%;
  }
</style>
