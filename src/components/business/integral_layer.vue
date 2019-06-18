<template>
  <el-dialog
    title="添加金额"
    :visible.sync="addAmountFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="400px">
    <el-form :model="form" ref="addAmountForm" :rules="rules" label-position="left">
      <el-form-item prop="phone" label="电话" label-width="65px">
        <el-input v-model.number="form.phone" suffix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item prop="amount" label="金额" label-width="65px">
        <el-input v-model.number="form.amount" suffix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      form: {
        phone: null,
        amount: null
      },
      rules: {
        amount: [{ required: true, type: 'number', message: '金额必须为数字值', trigger: 'blur' }],
        phone: [{ validator: this.checkPhone, required: true, trigger: 'blur' }]
      }
    }
  },
  props: ['addAmountFlag'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$emit('save')
    },
    async checkPhone (rule, value, callback) {
      return callback()
    }
  }
}
</script>

<style scoped>

</style>
