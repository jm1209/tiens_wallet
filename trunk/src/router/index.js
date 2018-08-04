import Vue from 'vue';
import Router from 'vue-router';
import Login from 'page/login/Login';
import CodeLogin from 'page/login/Code-login';
import PhoneLogin from 'page/login/Phone-login';
import Register from 'page/login/Register';
import Index from 'page/Index';
import Find from 'page/find/Find';
import FindAll from 'page/find/FindAll';
import FindActivity from 'page//find/FindActivity';
import FindNews from 'page/find/FindNews';
import FindShop from 'page/find/FindShop';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/codeLogin',
      name: 'CodeLogin',
      component: CodeLogin
    }, {
      path: '/phoneLogin',
      name: 'PhoneLogin',
      component: PhoneLogin
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/index',
      name: 'Index',
      component: Index
    }, {
      path: '/find',
      name: 'Find',
      component: Find,
      children: [
        {path: 'findAll', component: FindAll},
        {path: 'findActivity', component: FindActivity},
        {path: 'findNews', component: FindNews},
        {path: 'findShop', component: FindShop}
      ]
    }
  ]
})
