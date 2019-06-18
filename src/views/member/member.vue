<template>
  <div class="member-bar pd-5">
    <el-card class="no-pd" id="memberBox">
      <el-row>
        <el-col :span="17">
          <el-input v-model="memberInfo" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button class="fr" size="small" type="warning" icon="el-icon-edit" @click="registered">注册</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table :height="tableHeight" class="mg-t-10" :data="memberData" border :summary-method="getSummaries" show-summary>
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
          prop="num"
          label="积分">
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
import memberData from '@/option/memberData'
import registeredLayer from '@/components/business/registered_layer.vue'

export default {
  data () {
    return {
      memberInfo: null,
      memberData: memberData,
      tableHeight: null,
      addMemberFlag: false
    }
  },
  components: { registeredLayer },
  methods: {
    registered () {
      this.addMemberFlag = true
    },
    cancelRegistered () {
      this.addMemberFlag = false
    },
    saveRegistered () {
      this.addMemberFlag = false
    },
    getSummaries (param) {
      const sum = []
      sum[0] = '合计'
      sum[1] = param.data.length + '人'
      const values = param.data.map(item => item.num)
      const reducer = (prev, curr) => Number(prev) + Number(curr)
      sum[2] = values.reduce(reducer) + ' 分'
      return sum
    }
  },
  mounted () {
    let contentBox = document.getElementById('memberBox')
    let contentHeight = window.getComputedStyle(contentBox).height
    this.tableHeight = parseInt(contentHeight.substring(0, contentHeight.length - 2)) - 100
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
