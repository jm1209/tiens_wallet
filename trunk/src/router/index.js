import Vue from 'vue';
import Router from 'vue-router';
import Login from 'page/Login';
import CodeLogin from 'page/Code-login';
import PhoneLogin from 'page/Phone-login';
import Register from 'page/Register';
import Index from 'page/Index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
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
    }
  ]
})
