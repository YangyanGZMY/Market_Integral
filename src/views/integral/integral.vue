<template>
  <div class="integral-bar pd-tb-5">
    <el-card class="no-pd" id="integralBox">
      <div slot="header" class="clearfix">
        <span class="card-title">积分管理</span>
        <el-button class="fr" size="small" type="warning" icon="el-icon-shopping-cart-1" @click="add">添加</el-button>
      </div>
      <el-row>
        <el-row>
          <el-col :span="6">
            <el-radio-group class="mg-t-10" v-model="searchKey">
              <el-radio label="phone">电话</el-radio>
              <el-radio label="amount">金额</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="14">
            <el-input type="text" v-model="searchText" suffix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button class="fr" style="margin-right: 10px;" size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-table :height="tableHeight" class="market-table mg-t-10" :data="integralData" border v-loadmore="loadMore">
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
      searchForm: {},
      pageSize: 20,
      currentPage: 1,
      loadSign: true
    }
  },
  components: { integralLayer },
  methods: {
    get () {
      this.searchForm = {}
      this.searchForm[this.searchKey] = this.searchText
      this.searchForm['pageSize'] = this.pageSize
      this.searchForm['currentPage'] = this.currentPage
      api.integral.getLogs(this.searchForm).then(response => {
        if (response.result.list.length > 0) {
          this.integralData = this.integralData.concat(response.result.list)
          this.total = response.result.total
        }
      })
    },
    search () {
      this.searchRefresh()
      this.get()
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
        this.searchRefresh()
        this.get()
        this.$bus.emit('refreshMember')
        this.addAmountFlag = false
      })
    },
    searchRefresh () {
      this.pageSize = 20
      this.currentPage = 1
      this.integralData = []
      this.loadSign = true
    },
    loadMore () {
      if (this.loadSign) {
        this.loadSign = false
        this.currentPage++
        if (this.total === this.integralData.length) {
          return
        }
        this.get()
        setTimeout(() => {
          this.loadSign = true
        }, 1000)
        console.log('到底了', this.currentPage)
      }
    }
  },
  mounted () {
    let contentBox = document.getElementById('integralBox')
    let contentHeight = window.getComputedStyle(contentBox).height
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) + 200
  },
  created () {
    this.get()
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
