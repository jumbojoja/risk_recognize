<template>
  <div class="app">
    <!-- 头部 -->
    <myHeader></myHeader>

    <el-container 
      style="height: 100vh; 
      border: 1px solid #eee; 
      margin: 0;
      border: 0;
      padding: 0;">
      <!-- 侧边栏 -->
      <el-aside style="width: 200px;">
        <asideNav></asideNav>
      </el-aside>
      <!-- 主页面 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>  
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>
 
<script>
import myHeader from "@/components/myHeader"
import asideNav from "@/components/asideNav"


 
export default {
  name: "App",
  components: {
    myHeader,
    asideNav,
  }
}
</script>

<style>
  html,
  body{
    height: 100%;
    margin: 0;
    border: 0;
    padding: 0;
  }
</style>


