// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element);

Vue.config.productionTip = false;

// axios.defaults.baseURL = 'http://lotteryapi.bjztdl.com';
axios.defaults.baseURL = ' http://lotterytest.bjztdl.com';
Vue.prototype.$http = axios;
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

/*
*  全局方法
*/
//发送订单号
window.toastMessage = Vue.prototype.toastMessage = function (message) {
  window.hcbWeb.openPayPage(message);
  // alert(message+'亲测有效');
};
//安卓端回调支付结果
window.callBackPay = Vue.prototype.callBackPay = function () {
  // alert(Vue.prototype.androidMsg+'-----------这是alert的');
  // Vue.prototype.androidMsg = msg;
};

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText;
    el.remove()
  }
});

//票池球码过滤器
Vue.filter('numberBall',function (value) {
  var str = '';
  for(var i=0;i<value.length;i+=1){
    str += value[i]+' ';
  }
  return str;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
