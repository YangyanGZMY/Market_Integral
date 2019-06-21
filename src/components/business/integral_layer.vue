<template>
  <el-dialog
    title="添加金额"
    :visible.sync="addAmountFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="400px">
    <el-form :model="form" ref="addAmountForm" :rules="rules" label-position="left">
      <el-form-item v-if="showNameFlag" prop="name" label="姓名" label-width="65px">
        <el-input v-model="form.name" maxlength="10" suffix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" label-width="65px">
        <el-input v-model.number="form.phone" suffix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item prop="amount" label="金额" label-width="65px">
        <el-input v-model="form.amount" maxlength="10" suffix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item label="可获得积分" label-width="120px">
        <el-tag class="integral-tag" type="danger" effect="dark"><span style="vertical-align: sub;">{{integral}}分</span></el-tag>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="warning" :disabled="regFlag" @click="saveAndReg" class="fl">注册并添加</el-button>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      form: {
        phone: null,
        amount: null,
        name: null
      },
      rules: {
        amount: [{ required: true, validator: this.checkAmount, trigger: [] }],
        phone: [{ required: true, validator: this.checkPhone, trigger: [] }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      regFlag: true,
      showNameFlag: false
    }
  },
  props: ['addAmountFlag'],
  computed: {
    integral: function () {
      let realVal = parseFloat(this.form.amount).toFixed(0)
      if (realVal === 'NaN') {
        realVal = '0'
      }
      return realVal.toString()
    }
  },
  methods: {
    saveAndReg () {
      let tmpPhone = this.form.phone
      let tmpAmount = this.form.amount
      this.$refs.addAmountForm.resetFields()
      this.form.phone = tmpPhone
      this.form.amount = tmpAmount
      this.showNameFlag = true
    },
    cancel () {
      this.$emit('cancel')
      this.regFlag = true
      this.showNameFlag = false
    },
    save () {
      this.$refs.addAmountForm.validate((valid) => {
        if (valid) {
          this.form['integral'] = this.integral
          this.$emit('save', this.form)
        }
      })
    },
    async checkPhone (rule, value, callback) {
      let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/
      let tel = /^\d{3,4}-?\d{7,9}$/
      if (!value) {
        return callback(new Error('请输入电话号码'))
      } else {
        if (mobile.test(value) || tel.test(value)) {
          if (this.regFlag) {
            await api.member.checkPhone({ phone: value }).then(response => {
              if (response.result) {
                this.regFlag = false
                return callback(new Error('该号码未注册会员，现在注册或重新输入'))
              } else {
                return callback()
              }
            })
          } else {
            return callback()
          }
        } else {
          return callback(new Error('请输入正确的电话号码'))
        }
      }
    },
    checkAmount (rule, value, callback) {
      let amount = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1}$)/
      if (!value) {
        return callback(new Error('请输入金额'))
      } else {
        if (amount.test(value)) {
          return callback()
        } else {
          return callback(new Error('请输入正确的金额'))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .integral-tag{
    width: 150px;
    text-align: center;
    height: 32px;
    font-size: 19px;
  }
</style>
