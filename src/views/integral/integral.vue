<template>
  <div class="integral-bar pd-tb-5">
    <el-card class="no-pd" id="integralBox">
      <el-row>
        <el-row>
          <el-col :span="6">
            <el-radio-group class="mg-t-10" v-model="searchKey">
              <el-radio label="phone">电话</el-radio>
              <el-radio label="amount">金额</el-radio>
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
        <el-table :height="tableHeight" class="market-table mg-t-10" :data="integralData" border>
          <el-table-column
            align="center"
            prop="memberName"
            label="会员">
          </el-table-column>
          <el-table-column
            align="center"
            prop="memberPhone"
            min-width="100"
            label="电话">
          </el-table-column>
          <el-table-column
            align="center"
            prop="amountNum"
            label="金额">
          </el-table-column>
          <el-table-column
            align="center"
            prop="integralNum"
            label="积分">
          </el-table-column>
          <el-table-column
            align="center"
            prop="createYmdt"
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
import integralLayer from '@/components/business/integral_layer.vue'
import api from '@/api'
import { Message } from 'element-ui'

export default {
  data () {
    return {
      searchKey: 'phone',
      searchText: null,
      tableHeight: null,
      integralData: [],
      addAmountFlag: false,
      searchForm: {}
    }
  },
  components: { integralLayer },
  methods: {
    search () {
      this.searchForm = {}
      this.searchForm[this.searchKey] = this.searchText
      api.integral.getLogs(this.searchForm).then(response => {
        this.integralData = response.result
      })
    },
    add () {
      this.addAmountFlag = true
    },
    cancelIntegral () {
      this.addAmountFlag = false
    },
    saveIntegral (form) {
      api.integral.add(form).then(response => {
        Message.success('添加成功')
        this.search()
        this.$bus.emit('refreshMember')
        this.addAmountFlag = false
      })
    }
  },
  mounted () {
    let contentBox = document.getElementById('integralBox')
    let contentHeight = window.getComputedStyle(contentBox).height
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) - 100
  },
  created () {
    this.search()
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
