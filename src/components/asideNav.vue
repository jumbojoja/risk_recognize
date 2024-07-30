<template>
    <div class="aside" style="height: 100%; width: 100%;">
      <el-row class="tac" style="height: 100%; width: 100%;">
        <el-col :span="12" style="height: 100%; width: 100%;">
          <el-menu 
            default-active="this.$route.path" router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 100%; width: 100%;">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="/picture">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>图像检测</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/pic_deepfake">深度伪造检测</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/pic_sensitive">敏感内容识别</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/audio">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>音频检测</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/audio_deep">深度伪造检测</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/audio_sensitive">敏感内容识别</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/txt">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文本检测</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/txt_yueyu">越狱检测</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/txt_sen">敏感内容识别</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="/txt_home">
              <i class="el-icon-document"></i>
              <span slot="title">文本检测</span>
            </el-menu-item> -->
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  
  export default {
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
  </script>
  