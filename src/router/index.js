import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'





// import HomeView from '../views/HomeView.vue'
// const HomeView = () => import('../views/HomeView.vue') //这个为异步加载写法，优点：会把每个路由组件的代码分割成一一个js文件，初始化时不会加载这些js文件，只当激活路由组件才会去加载对应的js文件


const Homeview = () => import('../views/HomeView.vue')
const audio_deep = () => import('../views/audio_deep.vue')
const audio_sensi = () => import('../views/audio_sensi.vue')

const pic_home_view = () => import('../views/pic_home_view.vue')
const pic_deepfake_view = () => import('../views/pic_deepfake_view.vue')
const pic_sensitive_view = () => import('../views/pic_sensitive_view.vue')

const txt_home_view = () => import('../views/txt_home_view.vue')
const txt_sen_view=()=>import('../views/txt_sen.vue')
const txt_yueyu_view=()=>import('../views/txt_yueyu.vue')

const home = () => import('../views/home.vue')

Vue.use(VueRouter)

import pagesOne from '../components/page1'
import pagesTwo from '../components/page2'

const routes = [

  { path: '/', redirect: '/mainhome'},

  // { path: '/', redirect: '/batchtest' },

  {
    path: '/pagesOne',
    name: 'pagesOne',
    component: pagesOne
  },

  {
    path: '/pagesTwo',
    name: 'pagesTwo',
    component: pagesTwo
  },

  {
    path: '/mainhome',
    name: 'mainhome',
    component:home
  },

  {
    path: '/home',
    name: 'home',
    component:Homeview
  },

  {
    path: '/audio_deep',
    name: 'audio_deep',
    component: audio_deep
  },

  {
    path: '/audio_sensitive',
    name: 'audio_sensitive',
    component: audio_sensi
  },

  {
    path: '/pic_home',
    name: 'pic_home',
    component: pic_home_view
  },

  {
    path: '/pic_deepfake',
    name: 'pic_deepfake',
    component: pic_deepfake_view
  },

  {
    path: '/pic_sensitive',
    name: 'pic_sensitive',
    component: pic_sensitive_view
  },

  {
    path: '/txt_home',
    name: 'txt_home',
    component: txt_home_view
  },

  {
    path: '/txt_sen',
    name: 'txt_sen',
    component: txt_sen_view
  },
  {
    path: '/txt_yueyu',
    name: 'txt_yueyu',
    component: txt_yueyu_view
  },

  // { path: '*', component: 'NotFound' }   //半分离要加这个,全分离不加！！！
  // { path: '*', component: 'NotFound' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


/* router.beforeEach((to,from,next)=>{

  if (to.path.startsWith('/home')){
    // window.localStorage.removeItem('access-admin')
    next()
  }
  // else if (to.path.startsWith('/register')){
  //   next()
  // }
  else{


   
    console.log(to.path);
    const permissions = JSON.parse(window.localStorage.getItem('access-admin')).permissions;

    // if (permissions[to.path].value === false){
    //   if(to.path == '/changepass'){
    //     Vue.prototype.$alert("没有权限，请联系管理员进行密码修改",'提示',{confirmButtonText: '确定', showClose: false});
    //   }
    //   else{
    //     Vue.prototype.$alert("没有权限，请联系管理员进行用户升级",'提示',{confirmButtonText: '确定', showClose: false});
    //   }
    //   next(false);
    //   return ;
    // }

    let admin = JSON.parse(window.localStorage.getItem('access-admin'))
    if (!admin) {
      next({path: '/home'})
    } else {
      console.log('跳转请求')
      axios({
        url:'http://112.11.139.202:8090/check_token_action',
        method:'post',
        params:{},
        headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token}}
      ).then((response)=>{
        console.log("页面切换校验通过");
        next()    
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('token 验证失效!');
          window.localStorage.removeItem('access-admin')
          Vue.prototype.$alert("登录失效",'提示',{confirmButtonText: '确定',callback: action => {next({path: '/home'})}});
        } else {
          console.log('请求发生错误：', error);
        }
      });
    }
  }

}
) */


export default router






