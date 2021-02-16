import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSession from 'vue-session'



Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$host="http://localhost:8081/crawler"  //tõsta this.$http.get(this.$host+ "/crawler")


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app');

Vue.use(VueSession)
