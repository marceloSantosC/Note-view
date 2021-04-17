import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';
Vue.prototype.axios = axios;

