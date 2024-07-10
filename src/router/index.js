import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'





// import HomeView from '../views/HomeView.vue'
// const HomeView = () => import('../views/HomeView.vue') //这个为异步加载写法，优点：会把每个路由组件的代码分割成一一个js文件，初始化时不会加载这些js文件，只当激活路由组件才会去加载对应的js文件


const AudioTestView = () => import('../views/AudioTestView.vue')
// const LoginView = () => import('../views/LoginView.vue')
// const RegisterView = () => import('../views/RegisterView.vue')
const HistoryView = () => import('../views/HistoryView.vue')
const BatchTestView = () => import('../views/BatchTestView.vue')
const BatchHistoryView = () => import('../views/BatchHistoryView.vue')
const ReportView = () => import('../views/ReportView.vue')
// const UserView = () => import('../views/UserView.vue')
// const ChangePassView = () => import('../views/ChangePassView.vue')
const SubAccountView = () => import('../views/SubAccountView.vue')
const Homeview = () => import('../views/HomeView.vue')
const audio_deep = () => import('../views/audio_deep.vue')
const audio_sensi = () => import('../views/audio_sensi.vue')

const pic_batch_history_view = () => import('../views/pic_batch_history_view.vue')
const pic_batch_view = () => import('../views/pic_batch_view.vue')
const pic_history_view = () => import('../views/pic_history_view.vue')
const pic_home_view = () => import('../views/pic_home_view.vue')
const pic_report_view = () => import('../views/pic_report_view.vue')
const pic_deepfake_view = () => import('../views/pic_deepfake_view.vue')
const pic_sensitive_view = () => import('../views/pic_sensitive_view.vue')
const pic_test_view = () => import('../views/pic_test_view.vue')

const txt_batch_history_view = () => import('../views/txt_batch_history_view.vue')
const txt_batch_view = () => import('../views/txt_batch_view.vue')
const txt_history_view = () => import('../views/txt_history_view.vue')
const txt_home_view = () => import('../views/txt_home_view.vue')
const txt_report_view = () => import('../views/txt_report_view.vue')
const txt_test_view = () => import('../views/txt_test_view.vue')

const home = () => import('../views/home.vue')

Vue.use(VueRouter)

const routes = [

  { path: '/', redirect: '/mainhome'},

  // { path: '/', redirect: '/batchtest' },

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
    path: '/history',
    name: 'history',
    component:HistoryView
  },

  {
    path: '/batchtest',
    name: 'batchtest',
    component:BatchTestView
  },

  {
    path: '/batchhistory',
    name: 'batchhistory',
    component:BatchHistoryView
  },

  {
    path: '/report',
    name: 'report',
    component:ReportView
  },

  {
    path: '/subaccount',
    name: 'subaccount',
    component: SubAccountView
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
    path: '/pic_history',
    name: 'pic_history',
    component: pic_history_view
  },

  {
    path: '/pic_batch_test',
    name: 'pic_batch_test',
    component: pic_batch_view
  },

  {
    path: '/pic_batch_history',
    name: 'pic_batch_history',
    component: pic_batch_history_view
  },

  {
    path: '/pic_report',
    name: 'pic_report',
    component: pic_report_view
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
    path: '/txt_history',
    name: 'txt_history',
    component: txt_history_view
  },

  {
    path: '/txt_batch_test',
    name: 'txt_batch_test',
    component: txt_batch_view
  },

  {
    path: '/txt_batch_history',
    name: 'txt_batch_history',
    component: txt_batch_history_view
  },

  {
    path: '/txt_report',
    name: 'txt_report',
    component: txt_report_view
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






