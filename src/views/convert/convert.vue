<template>
  <div class="convert-bar pd-5">
    <el-card class="no-pd" id="integralBox">
      <el-row>
        <el-col :span="17">
          <el-input v-model="convertInfo" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button class="fr" size="small" type="primary" icon="el-icon-s-shop" @click="convert">兑换</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-table :height="tableHeight" class="mg-t-10" :data="memberData" border>
        <el-table-column
          align="center"
          prop="name"
          label="会员">
        </el-table-column>
        <el-table-column
          align="center"
          prop="num"
          label="已兑换">
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          min-width="160"
          label="时间">
        </el-table-column>
      </el-table>
    </el-card>
    <convert-layer v-if="convertFlag" :convertFlag="convertFlag"
                   @cancel="cancelConvert"
                   @save="saveConvert"></convert-layer>
  </div>
</template>

<script>
import memberData from '@/option/memberData'
import convertLayer from '@/components/business/convert_layer.vue'
export default {
  data () {
    return {
      convertInfo: null,
      memberData: memberData,
      tableHeight: null,
      convertFlag: false
    }
  },
  components: { convertLayer },
  methods: {
    convert () {
      this.convertFlag = true
    },
    cancelConvert () {
      this.convertFlag = false
    },
    saveConvert () {
      this.convertFlag = false
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
