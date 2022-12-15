import { createApp } from 'vue';
import App from './App.vue';
import  router  from './router';
import { Col, Row } from 'vant';
// Vue.prototype.$http= axios
import axios from 'axios'
// App.prototype.$http= axios
let jsconfig = require('../public/config.js')
axios.defaults.baseURL=jsconfig.axiosBaseUrl; // 好像无效
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
app.config.globalProperties.$axios=axios;
app.mount('#app');
