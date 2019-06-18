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
        <el-input v-model="form.name" suffix-icon="el-icon-user-solid"></el-input>
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
export default {
  data () {
    return {
      form: {
        phone: null,
        name: null
      },
      rules: {
        name: [{ required: true, min: 1, max: 10, trigger: 'blur' }],
        phone: [{ validator: this.checkPhone, required: true, trigger: 'blur' }]
      }
    }
  },
  props: ['addMemberFlag'],
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
