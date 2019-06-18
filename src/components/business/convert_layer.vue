<template>
  <el-dialog
    title="添加金额"
    :visible.sync="convertFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="400px">
    <el-form :model="form" ref="addAmountForm" :rules="rules" label-position="left">
      <el-form-item prop="phone" label="电话" label-width="80px">
        <el-input v-model.number="form.phone" suffix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item  prop="convert" label="兑换积分" label-width="80px">
        <el-input v-model.number="form.convert" suffix-icon="el-icon-s-flag"></el-input>
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
        convert: null
      },
      rules: {
        convert: [{ required: true, min: 1, max: 10, trigger: 'blur' }],
        phone: [{ required: true, validator: this.checkPhone, trigger: 'blur' }]
      }
    }
  },
  props: ['convertFlag'],
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
