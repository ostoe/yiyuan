import { createApp } from 'vue';
import App from './App.vue';
import  router  from './router';
import { Col, Row } from 'vant';

const app = createApp(App);
app.use(Col);
app.use(Row);
app.use(router);
app.mount('#app');
