<template>
  <el-dialog
    title="注册会员"
    :visible.sync="addMemberFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="400px">
    <el-form :model="form" ref="addMemberForm" :rules="rules" label-position="left">
      <el-form-item prop="name" label="姓名" label-width="65px">
        <el-input v-model="form.name" maxlength="10" suffix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item  prop="phone" label="电话" label-width="65px">
        <el-input v-model.number="form.phone" suffix-icon="el-icon-phone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
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
        name: null
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, validator: this.checkPhone, trigger: [] }]
      }
    }
  },
  props: ['addMemberFlag'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$refs.addMemberForm.validate((valid) => {
        if (valid) {
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
          await api.member.checkPhone({ phone: value }).then(response => {
            if (response.result) {
              return callback()
            } else {
              return callback(new Error('号码已存在，请重新输入'))
            }
          })
        } else {
          return callback(new Error('请输入正确的电话号码'))
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
