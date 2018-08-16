import Vue from 'vue';
import 'assets/less/common.less';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
Vue.use(ElementUI);
new Vue({
	el: '#app',
	router,
	render (h) {
		return h(App);
	}
});
