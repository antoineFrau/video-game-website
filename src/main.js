// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import { store } from './store'
import './../node_modules/bulma/css/bulma.css'
import './bulma-extensions.js'
import './assets/css/mystyle.scss'

Vue.use(VueAxios, axios, VueResource)
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.prototype.$axioshttp = axios

/* eslint-disable */ 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})