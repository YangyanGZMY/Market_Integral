<template>
  <div class="member-bar pd-5">
    <el-card class="no-pd" id="memberBox">
      <div slot="header" class="clearfix">
        <span class="card-title">会员中心</span>
        <el-button class="fr" size="small" type="warning" icon="el-icon-edit" @click="registered">注册</el-button>
      </div>
      <el-row>
        <el-col :span="24">
          <el-autocomplete
            v-model="memberInfo"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="请输入会员电话"
            suffix-icon="el-icon-search"
          style="width: 100%;">
          </el-autocomplete>
        </el-col>
      </el-row>
      <el-table :height="tableHeight" class="market-table mg-t-10" :data="memberData" border :summary-method="getSummaries" show-summary>
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
          prop="sumIntegral"
          label="积分余额">
        </el-table-column>
      </el-table>
    </el-card>
    <registered-layer v-if="addMemberFlag" :addMemberFlag="addMemberFlag"
                      @cancel="cancelRegistered"
                      @save="saveRegistered"
    ></registered-layer>
  </div>
</template>

<script>
import registeredLayer from '@/components/business/registered_layer.vue'
import api from '@/api'
import { Message } from 'element-ui'

export default {
  data () {
    return {
      memberInfo: null,
      memberData: [],
      tableHeight: null,
      addMemberFlag: false
    }
  },
  components: { registeredLayer },
  methods: {
    querySearchAsync (queryString, callback) {
      let param = {
        phone: queryString
      }
      api.member.autoComplete(param).then(response => {
        if (typeof callback === 'function') {
          callback(response.result)
        }
        this.memberData = response.result
      })
    },
    handleSelect (item) {
      this.memberInfo = item.memberPhone
      this.memberData = []
      this.memberData.push(item)
    },
    registered () {
      this.addMemberFlag = true
    },
    cancelRegistered () {
      this.addMemberFlag = false
    },
    saveRegistered (form) {
      api.member.add(form).then(response => {
        Message.success('添加成功')
        this.querySearchAsync()
        this.addMemberFlag = false
      })
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (column.property === 'sumIntegral') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 分'
        } else {
          sums[index] = data.length + ' 人'
        }
      })
      return sums
    }
  },
  mounted () {
    let contentBox = document.getElementById('memberBox')
    let contentHeight = window.getComputedStyle(contentBox).height
    console.log(contentHeight)
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) + 380
    console.log(this.tableHeight)
    this.$bus.off('refreshMember').on('refreshMember', item => {
      this.querySearchAsync()
    })
  },
  created () {
    this.querySearchAsync()
  }
}
</script>

<style lang="scss" scoped>
  .member-bar{
    height: 100%;
  }
  .el-card{
    height: 100%;
  }
</style>
