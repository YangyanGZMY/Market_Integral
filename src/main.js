import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initElementUI from '@/modules/elementUI'
import initAxios from '@/modules/axios'
import VueBus from 'vue-bus'
import lottie from 'vue-lottie';

Vue.config.productionTip = false

initElementUI(Vue)
initAxios()
Vue.use(VueBus)
Vue.component('lottie', lottie)

Vue.directive('loadmore', {
  bind (el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      let sign = 0
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
