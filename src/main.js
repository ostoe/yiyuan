import { createApp } from 'vue';
import App from './App.vue';
import  router  from './router';
import { Col, Row , Notify } from 'vant';
// Vue.prototype.$http= axios
import axios from 'axios'
import jsconfig  from '../public/config.js';
// var jsconfig = require('./config.js')

// console.log("proces env", process.env.VUE_APP_URL)

// fetch('./config.json').then(res => res.json()).then(config => {
//     console.log("config.json", config)
//     axios.defaults.baseURL=config.axiosBaseUrl
// })
// console.log("run", jsconfig)

axios.defaults.baseURL=jsconfig.axiosBaseUrl; // 
window.g = {
    host: "host",
    ifToC: false, // false toB模式; ture toC模式 
    // baseURL: 'http://localhost:8081', //
    hospitalRawURL: 'http://201.xggong.com:12201/xs_datacenter/hospital/doctors', //TODO需要修改
}  
const app = createApp(App);
// app.prototype.$http = axios
app.use(Col);
app.use(Row);
app.use(router);
app.use(Notify);
// app.config.globalProperties.$axios=axios;
app.mount('#app');
