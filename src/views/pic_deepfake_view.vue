<template >
    <div id="main">
        <div id="homo_div">
            <div id="consulting_div" v-if="consulting_flag==true">
                <div id="consulting_top_div">
                    <img id="consulting_top_img" src="../assets/home_page/kefu.svg">
                    <span id="consulting_top_span">联系我们</span>
                </div>
                <div id="consulting_mid_div">
                    <span class="consulting_mid_span">咨询体验, 请邮件联系: VOcert@outlook.com </span>
                </div>
                <button id="consulting_bottom_button" @click="cancel_consulting_div">确定</button>
            </div>
            <div id="banner_div">
                <div id="banner_left">
                    <img class="banner_img" src="../assets/home_page/logo.png">
                    <span id="banner_title">多模态检测平台</span>
                </div>
            </div>
                
            <!-- <div id="navigation_div"> -->
            <div id="navigation_title_div">
                <span id="navigation_title">图像深度合成检测</span>
                <img id="navigation_img" src="../assets/home_page/separate_line.png">
            </div>
            <!-- </div> -->
        </div>
        <div>
      <!-- <div class="position">图片展示</div> -->
      <div class="images" style="text-align: center;">
        <div v-for="(item, index) in info" :key="index" class="image-middle">  
          <el-card shadow="hover" :body-style="{ padding: '0px' }">     
          <!-- //添加鼠标点击或悬浮图片放大功能 -->
          <el-popover> 
          <img :src="info[index].src" slot="reference" class="image"/>    
          <img :src="info[index].src" class="imagePreview"/>
          </el-popover>  
          <!-- <div style="text-align:center;padding-top:12px">
          <span>{{info[index].name}}</span>   
          </div>      -->
          </el-card>
        
        </div>     
      </div>
    <el-upload
      ref="my-upload"
      class="upload-demo"
      action="http://112.11.139.202:8090/receive_file"
      multiple
      :limit="1"
      :headers="config"
      :data="nick_name"
      :disabled="!login_flag"
      :before-upload="handleBefore"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-error="handleError"
      :show-file-list="false"
    >
      <button id="uploadButton" @click="judge_login">立即上传</button>
    </el-upload>
    </div>
    </div>   
</template>
   
<script>
    export default {
        name: 'HomeView',
        data() {
	        return {
                info:[
                {
                    "id":1,
                    "name":"动漫1",
                    "src":require("D://HuaweiMoveData//Users//陈辉//Desktop//test//test.jpg") ,
                },
          
                ],
                config: {
                // 配置头部信息
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                },
                nick_name: {
                // 配置其他信息
                    id: sessionStorage.getItem('id'),
                },
            }
        },
methods: {
	// 文件状态改变时的钩子
	handleChange(file, fileList) { // 文件数量改变
      this.fileList = fileList
      const isLt2M = (file.size / 1024 / 1024 < 2)
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.fileList.pop()
      }
      return isLt2M
    },
    handleSuccess(response, file) {
      if (response.code === 200) {
        this.$message.success('上传成功');
        const imageUrl = response.data.url; // 从响应中获取图片URL
        this.info = [
          {
            id: 1,
            name: '动漫1',
            src: imageUrl,
          },
        ];
      } else {
        this.$message.error('上传失败');
      }
    },
    // 文件超出个数限制时的钩子
    limitCheck() {
      this.$message.warning('每次上传限制最多五个文件')
    },
    // 文件删除的钩子
    removeFile(file, fileList) {
      this.fileList = fileList
    },
    // 点击确定按钮 上传文件
    confirm() {
    	var param = new FormData()
    	this.fileList.forEach((val, index) => {
    		param.append('file', val.raw)
    	})
    	// 拿取其他的信息
    	param.append('id', sessionStorage.getItem('id'))
    	axios(`url......`, {
   			headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            },
            method: 'post',
            data: param
          	}).then((res) => {
	            if (res.data.code === 200) {
	              this.$message.success('上传成功')
	            } else {
	              this.$message.error('上传失败')
	            }
          })
    }
}
    }
</script>
 

<style scoped>

#main{
    width: 100%;
    min-width: 1920px;
    background-color: #f3f7ff;
    display: flex;
    justify-content: center;
    align-items: center;
}

#homo_div{
    /* width: 1920px; */
    width: 100%;
    min-width: 1920px;
    /* height: 1080px; */
    display: flex;
    flex-direction: column;
    align-items: center;
}

#banner_div{
    width: 100%;
    height: 64px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

#banner_left{
    display: flex;
    align-items: center;
}

.banner_img{
    width: 59px;
    height: 40px;
    display: inline-block;
    margin-left: 14px;
    margin-right: 14px;
}

#banner_title{
    width: 224px;
    height: 64px;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

#banner_right{
    display: flex;
    align-items: center;
}

.login_button, .register_button{
    background-color: transparent; 
    color: black;
    transition: all 0.3s; 
}

.login_button:hover, .register_button:hover{
  background-color: #165dff; 
  color: white;
}

.login_button{
    width: 108px;
    height: 64px;
    opacity: 1;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.login_button_sel{
    width: 108px;
    height: 64px;
    opacity: 1;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #165dff;
}



.register_button{
    width: 108px;
    height: 64px;
    opacity: 1;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.register_button_sel{
    width: 108px;
    height: 64px;
    opacity: 1;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #165dff;
}

#banner_user{
    margin-right: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

#banner_user_img{
    width: 36px;
    height: 36px;
}

#banner_user_span{
    margin-left: 14px;
    width: 233px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.44px;
    color: rgba(29, 33, 41, 1);
    text-align: center;
    vertical-align: middle;
}

#user_div{
    position: fixed;
    margin-left: 1490px;
    margin-top: 540px;
    width: 382px;
    opacity: 1;
    border-radius: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 20px 20px 20px;
}

#user_top_div{
    width: 279px;
    height: 80px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 0px 12px 0px;
}

#user_top_top_div{
    width: 279px;
    height: 22px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#user_top_bottom_div{
    margin-top: 12px;
    width: 192px;
    height: 22px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.user_div_span1{
    width: 64px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.user_div_span2{
    width: 200px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 18.75px;
    color: rgba(22, 93, 255, 1);
    align-items: center;
    justify-content: right;
}

.user_div_span1_1{
    width: 96px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.user_div_span2_1{
    width: 16px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.user_div_span1_3{
    width: 80px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 18.75px;
    color: rgba(22, 93, 255, 1);
    text-align: left;
    justify-content: center;
    align-items: center;
}

#user_mid_div{
    width: 342px;
    height: 70px;
    opacity: 1;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(244, 247, 255, 1) 0%, rgba(254, 254, 255, 1) 100%);
    box-shadow: 1px 1px 2px  rgba(178, 178, 178, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 8px 16px;
}

#usre_mid_left_div{
    width: 226px;
    height: 54px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

#user_div_span3{
    width: 195.09px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

#user_div_span4{
    margin-top: 6px;
    width: 195.09px;
    height: 20px;
    opacity: 1;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20.27px;
    color: rgba(134, 144, 156, 1);
    text-align: left;
    vertical-align: middle;
}

#user_mid_button{
    width: 84px;
    height: 32px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(22, 93, 255, 1);
    border: 1px solid rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 29.05px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    cursor: pointer;
}

.user_bottom_small_div:hover {
    background-color: rgba(242, 243, 245, 1);
}

/* .user_bottom_small_div:hover .user_div_span5 {
    color: rgba(255, 255, 255, 1);
} */

#user_bottom_div{
    margin-top: 24px;
    width: 342px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.user_bottom_small_div{
    width: 322px;
    height: 59.04px;
    opacity: 1;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px 0px 16px;
    cursor: pointer;
}

.user_div_span5{
    width: 195.09px;
    height: 59.04px;
    opacity: 1;
    display: flex;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 26.06px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    align-items: center
}

.user_div_span_icon{
    width: 24px;
    height: 24px;
    opacity: 1;
    display: flex;
}

.user_div_span_icon2{
    width: 36px;
    height: 36px;
    opacity: 1;
    display: flex;
}

#login_div{
    position: fixed;
    margin-top: 113px;
    width: 560px;
    height: 725px;
    opacity: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#login_top_div{
    width: 560px;
    height: 655px;
    opacity: 1;
    border-radius: 10px;
    background: linear-gradient(180deg, rgba(244, 247, 255, 1) 0%, rgba(254, 254, 255, 1) 100%);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
}

#login_top_top_div{
    width: 560px;
    height: 89px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.display_choose{
    width: 560px;
    height: 89px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 4px solid #165dff;

    opacity: 1;
    display: flex;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 46.34px;
    color: rgba(22, 93, 255, 1);
    text-align: center;
    vertical-align: middle;
}

.display_no_choose{
    width: 280px;
    height: 89px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #e5e6eb;

    opacity: 1;
    display: flex;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 40.54px;
    color: rgba(78, 89, 105, 1);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}

.login_top_mid_div{
    margin-top: 24px;
    width: 500px;
    height: 500px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.usernameText{
    margin-bottom: 11px;
    width: 120px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.passwordText{
    margin-top: 11px;
    margin-bottom: 11px;
    width: 80px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

::v-deep .el-input__inner{
    height: 62px;
    opacity: 1;
    display: flex;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 21.78px;
    color: rgba(134, 144, 156, 1);
    text-align: left;
    vertical-align: middle;
}

.el-input-group__append{
    background-color: transparent;
    border-style: none;
}

.code_button{
    width: 90px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 21.78px;
    color: rgba(22, 93, 255, 1);
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

.code_button_ti{
    width: 90px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 21.78px;
    color: gray;
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

.login_top_button{
    margin-top: 196px;
    width: 500px;
    height: 63px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(22, 93, 255, 1);
    border: 1px solid rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 1;
    display: flex;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 29.05px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

.login_close_img_div{
    margin-top: 30px;
    width: 40px;
    height: 40px;
    opacity: 1;
    border-radius: 50px;
    background: rgba(201, 205, 212, 1);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}

.login_close_img{
    width: 20.86px;
    height: 20.86px;
    opacity: 1;
}

#modify_div{
    position: fixed;
    margin-top: 113px;
    width: 560px;
    height: 725px;
    opacity: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#modify_top_div{
    width: 560px;
    height: 655px;
    opacity: 1;
    border-radius: 10px;
    background: linear-gradient(180deg, rgba(244, 247, 255, 1) 0%, rgba(254, 254, 255, 1) 100%);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
}

#modify_top_top_div{
    width: 560px;
    height: 89px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 4px solid #165dff;
}

#modify_top_top_span{
    width: 560px;
    height: 89px;
    opacity: 1;
    display: flex;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 46.34px;
    color: rgba(22, 93, 255, 1);
    align-items: center;
    justify-content: center
}

#modify_top_mid_div{
    width: 500px;
    height: 385px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

#modify_top_mid_top_div{
    margin-top: 24px;
    width: 500px;
    height: 48px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#modify_top_mid_top_span1{
    width: 120px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

#modify_top_mid_top_span2{
    margin-left: 20px;
    width: 265px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 23.44px;
    color: rgba(22, 93, 255, 1);
    text-align: left;
    vertical-align: middle;
    align-items: center;
}

.passwordText2{
    margin-top: 21px;
    margin-bottom: 21px;
    width: 60px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.usernameText2{
    margin-top: 21px;
    margin-bottom: 21px;
    width: 120px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.login_top_button2{
    margin-top: 64px;
    width: 500px;
    height: 63px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(22, 93, 255, 1);
    border: 1px solid rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 1;
    display: flex;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 29.05px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

#intro_div{
    width: 100%;
    height: 306px;
    background-image: url("../assets/home_page/intro_back.jpg");
    background-position: center;
    display: flex;
    flex-direction: column;
}

#intro_title{
    margin-left: 360px;
    width: 857px;
    height: 45px;
    opacity: 1;
    display: flex;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 46.34px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
}

#intro_content{
    margin-left: 360px;
    width: 857px;
    height: 112px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

#experience_button{
    width: 160px;
    height: 46px;
    opacity: 1;
    border-radius: 5px;
    background: rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 40px 9px 40px;
    margin-left: 360px;
    margin-top: 24px;
    border-style: none;
    color: white;
    font-size: 20px;
    font-weight: 400;
    line-height: 28.96px;
    color: rgba(255, 255, 255, 1);
}

#navigation_div{
    width: 100%;
    height: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(245, 248, 255, 1) 39.9%, rgba(243, 247, 255, 1) 100%); */
    box-shadow: 0px 8px 20px  rgba(44, 51, 67, 0.06);
}

#navigation_title_div{
    width: 1200px;
    height: 77px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 10px 10px;
    margin-top: 20px;
}

#navigation_title{
    width: 320px;
    height: 45px;
    opacity: 1;
    display: flex;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 46.34px;
    color: rgba(29, 33, 41, 1);
}

#navigation_img{
    width: 1200px;
    height: 2px;
    opacity: 1;
    border-radius: 2px;
    background: linear-gradient(90deg, rgba(171, 245, 255, 0) 0%, rgba(171, 245, 255, 1) 24.66%, rgba(41, 125, 252, 1) 50%, rgba(171, 245, 255, 1) 74.85%, rgba(171, 245, 255, 0) 100%);
    display: flex;
}

#navigation_content_div{
    width: 1198px;
    height: 180px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
}

.navigation_item_div:hover{
    box-shadow: 8px 8px 24px  rgba(55, 99, 170, 0.2);
}

.navigation_item_div:hover .navigation_item_span1{
    color: rgba(22, 93, 255, 1);
}

.navigation_item_div{
    width: 283px;
    height: 180px;
    opacity: 1;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 4px  rgba(55, 99, 170, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.navigation_item_div_div{
    width: 231px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
}

.navigation_item_img1{
    width: 68px;
    height: 72px;
    display: flex;
}

.navigation_item_span1{
    /*width: 93.96px;*/
    width:auto;
    height: 29.48px;
    opacity: 1;
    display: flex;
    justify-content: center; /* 文字水平居中 */
    align-items: center; /* 文字垂直居中 */
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: center; /* 文字水平居中 */
    vertical-align: middle; /* 文字垂直居中 */
}

.navigation_item_img2{
    width: 21px;
    height: 14.65px;
    display: flex;
}

.navigation_item_span2{
    width: 231.92px;
    height: 40px;
    opacity: 1;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20.27px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
    margin-top: 16px;
}

#content_div{
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#single_detect_div{
    margin-top: 40px;
    width: 1200px;
    /* height: 263px; */
    opacity: 1;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(229, 230, 235, 1);
    box-shadow: 0px 8px 20px  rgba(44, 51, 67, 0.06);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

#single_detect_top_div{
    width: 1200px;
    height: 70px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(229, 230, 235, 0.5);
}

#single_detect_top_left_div{
    margin-left: 15px;
    width: 220px;
    height: 42.35px;
    display: flex;

}

#single_detect_top_left_img{
    width: 40px;
    height: 42.35px;
    opacity: 1;
    display: flex;
}

#single_detect_top_left_span{
    margin-left: 4px;
    width: 112px;
    height: 39px;
    opacity: 1;
    display: flex;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 40.54px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

.single_detect_top_right_button{
    margin-right: 15px;
    width: 146.48px;
    height: 48px;
    opacity: 1;
    border-radius: 6px;
    background: rgba(22, 93, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: middle;
    border-style: none;
    cursor: pointer;
}

.single_detect_top_right_button_{
    margin-right: 15px;
    width: 146.48px;
    height: 48px;
    opacity: 1;
    border-radius: 6px;
    background: rgba(242, 244, 249, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: gray;
    text-align: center;
    vertical-align: middle;
    border-style: none;
    cursor: pointer;
}

#single_detect_bottom_div{
    width: 1200px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: left;
}

#single_detect_bottom_span_1{
    margin-top: 28px;
    margin-left: 28px;
    width: 140px;
    height: 29px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

#single_detect_bottom_span_2{
    margin-top: 16px;
    margin-left: 28px;
    width: 305px;
    height: 21px;
    opacity: 1;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20.27px;
    color: rgba(78, 89, 105, 1);
    text-align: left;
    vertical-align: top;
}

#upload_div{
    margin-top: 16px;
    margin-left: 28px;
    width: 1144px;
    height: 55px;
    display: flex;
    /* align-items: center; */
}

#upload_left_div{
    width: 641px;
    height: 55px;
    opacity: 1;
    background: rgba(242, 244, 249, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#upload_left_middle_div{
    width: 141.56px;
    height: 24px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#upload_left_middle_img{
    width: 29.56px;
    height: 15.08px;
    opacity: 1;
    display: flex;
}

#upload_left_middle_span{
    margin-left: 16px;
    width: 96px;
    height: 24px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

.upload-demo {
  width: 0; /* 或者设置为与按钮所在的容器相同的宽度 */
  height: 0; /* 或者设置为与按钮所在的容器相同的高度 */
  display: flex; /* 确保在同一行显示 */
  vertical-align: center; /* 垂直对齐方式可根据需要调整 */
}

#uploadButton{
    margin-left: 16px;
    margin-top: 9.5px;
    width: 92px;
    height: 36px;
    opacity: 1;
    border-radius: 5px;
    background: rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 14px 6px 14px;
    border-style: none;

    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: middle;

    cursor: pointer;
}

#progress_div{
    margin-top: 11px;
    margin-left: 28px;
    width: 749px;
    height: 63px;
    display: flex;
    flex-direction: column;
}

#progress_span_1{
    margin-bottom: 5px;
    width: 700px;
    height: 24px;
    opacity: 1;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 24px;
}

#progress_bottom_div{
    width: 749px;
    height: 36px;
    display: flex;
    align-items: center;
}

#progress_bottom_left_div{
    width: 641px;
    height: 34px;
    opacity: 1;
    border: 0.75px solid rgba(0, 102, 255, 1);
    display: flex;
    align-items: center;
}

#progress_bar_div{
    margin-left: 7px;
    width: 575px;
    height: 20px;
    background: #cce0ff;
    border: 1px solid #cce0ff;
}

.loadsmallDiv{
    width:14px;
    height:20px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loadsmallImg{
    width:11px;
    height:16px;
    background: blue;
}

#progress_span_2{
    margin-left: 4px;
    width: 45px;
    height: 22px;
    opacity: 1;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 18.75px;
    color: rgba(22, 93, 255, 1);
    text-align: left;
    vertical-align: top;
}

#reselection_button{
    margin-left: 16px;
    width: 92px;
    height: 36px;
    opacity: 1;
    border-radius: 5px;
    background: rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;

    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: middle;

    cursor: pointer;
}

#detailed_result_div{
    margin-left: 28px;
    width: 1144px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-top: 1px solid rgba(229, 230, 235, 0.5);
    border-bottom: 1px solid rgba(229, 230, 235, 0.5);
}

#detailed_result_top_div{
    margin-top: 21px;
    width: 1144px;
    height: 38px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#result_span_1{
    width: 500px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
}

#result_span_img_1{
    width: 16px;
    height: 16px;
}

#comp_result_div{
    margin-top: 16px;
    width: 1144px;
    height: 210px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#comp_result_span_1{
    width: 160px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 28px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

#comp_result_bottom_div{
    margin-top: 28px;
    width: 488px;
    height: 154px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.comp_result_bottom_small_div{
    width: 120px;
    height: 154px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.comp_result_span_2{
    margin-bottom: 10px;
    width: 120px;
    height: 24px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(29, 33, 41, 1);
    text-align: center;
    justify-content: center;
}

.comp_result_bottom_small_bottom_div1{
    width: 120px;
    height: 120px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/home_page/circle1.png") ;

    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: middle;
}

.comp_result_bottom_small_bottom_div2{
    width: 120px;
    height: 120px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/home_page/circle2.png");

    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: middle;
}

.comp_result_bottom_small_bottom_div3{
    width: 120px;
    height: 120px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/home_page/circle3.png");

    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: middle;
}


#listening_div{
    margin-top: 16px;
    margin-bottom: 15px;
    width: 1144px;
    height: 68.54px;
    opacity: 1;
    background: rgba(242, 244, 249, 1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

#listening_span{
    margin-top: 10px;
    margin-left: 10px;
    width: 64px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

#play_line_div{
    margin-top: 10px;
    margin-left: 10px;
    width: 1144px;
    height: 26.54px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#result_span_img_2{
    width: 27px;
    height: 27px;
    cursor: pointer;
}

.slider-block{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

::v-deep .el-slider__button-wrapper{
    top:-75px;
}

::v-deep .el-slider__button{
    width: 8px;
    height: 8px;
}

::v-deep .el-slider__runway{
    height: 3px;
}

::v-deep .el-slider__bar {
    height: 3px;
}

.audio-progress{
    width: 1100px;
}

.model_score_div{
    margin-top: 16px;
    width: 1144px;
    height: 244.6px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.model_score_span_1{
    
    width: 500px;
    height: 24px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

.model_score_span_2{
    margin-top: 15px;
    width: 600px;
    height: 19px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 18.75px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

.waveform_diagram_div{
    margin-top: 15px;
    width: 1144px;
    height: 106.6px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.model_img{
    height: 63px;
    width: 1144px;
    background-color: #000000a6;
}

.confidence_div{
    width: 1144px;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.confidence_div_{
    width: 286px;
    height: 44px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 23.44px;
}

.red_{
    color: red;
}

.green_{
    color: green;
}

.grey_{
    color: grey;
}

.model_score_span_3{
    margin-top: 12px;
    width: 500px;
    height: 24px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
}

#consulting_div{
    margin-top: 224px;
    width: 464px;
    height: 186px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 32px 32px 32px;
    position: fixed;
    z-index: 8;

}

#consulting_top_div{
    margin-top: 24px;
    width: 100px;
    height: 28px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#consulting_top_img{
    width: 28px;
    height: 28px;
    opacity: 1;
    display: flex;
}

#consulting_top_span{
    margin-left: 8px;
    width: 64px;
    height: 24px;
    opacity: 1;
    display: flex;

    /** 文本1 */
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

#consulting_mid_div{
    margin-top: 24px;
    width: 400px;
    height: 22px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.consulting_mid_span{
    width: 400px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(22, 93, 255, 1);
    text-align: left;
    vertical-align: top;
}

#consulting_bottom_button{
    margin-top: 24px;
    width: 60px;
    height: 32px;
    opacity: 1;
    border-radius: 2px;
    background: rgba(22, 93, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;

    opacity: 1;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.position {
    margin-left: 15px;
    font-size: 30px;
    font-weight: 600;
  }
 /* 图片总布局，样式 */
.images {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

/* Image container */
.image-middle {
  margin-right: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center; /* Center the image within the container */
}

/* Single image style */
.image {
  width: 500px;
  height: 500px;
}

/* Image preview style */
.imagePreview {
  width: 100px;
  height: 100px;
  /* Add styles for the image preview if needed */
}
</style>
