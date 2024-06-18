<template >
    <div id="main">
        <div id="homo_div">
            <div id="banner_div">
                <div id="banner_left">
                    <img class="banner_img" src="../assets/home_page/logo.png">
                    <span id="banner_title">多模态风险识别平台</span>
                </div>
                <div id="banner_right" v-show="login_flag==false">
                    <span class="login_button" @click="show_login_box(true)">登录</span>
                    <!-- <span class="register_button" @click="show_login_box(false)">注册</span> -->
                    <span class="register_button" @click="consulting">体验申请</span>
                </div>
                <div id="banner_user" v-show="login_flag==true">
                    <img id="banner_user_img" src="../assets/home_page/user.png">
                    <span id="banner_user_span" @mouseover="showDropdown = true"
                    >{{ usernameInput }}</span>
                </div>
                <!-- <div id="user_div" v-if="showDropdown==true">
                    <div id="user_top_div">
                        <div id="user_top_top_div">
                            <span class="user_div_span1">登录邮箱</span>
                            <span class="user_div_span2">{{ usernameInput }}</span>
                        </div>
                        <div id="user_top_bottom_div">
                            <span class="user_div_span1_1">剩余检测次数</span>
                            <span class="user_div_span1_3">{{ surplus_detect_times }}</span>
                            <span class="user_div_span2_1">条</span>
                        </div>
                    </div>
                    <div id="user_mid_div">
                        <div id="user_mid_left_div">
                            <span id="user_div_span3">{{ user_grade_dict[user_grade_num] }}</span>
                            <span id="user_div_span4">升级企业用户请联系我们</span>
                        </div>
                        <button id="user_mid_button">立即咨询</button>
                    </div>
                </div> -->
            </div>
            <div id="sub_account_div">
                <div id="sub_account_top_div">
                    <div id="sub_account_top_left_div">
                        <img id="sub_account_top_img" src="../assets/sub_account_page/sub_icon.png">
                        <span id="sub_account_top_span">子账户管理</span>
                    </div>
                    <!-- <button id="sub_account_top_button">开始检测</button> -->
                </div>
                <div id="sub_account_mid_div">
                    <button id="sub_account_mid_button" @click="create_sub">创建子账户</button>
                    <span id="sub_account_mid_span">创建子账户将授权子账户使用主账户的检测服务权限，子账户发起的检测所使用的条数从主账户统一核销。</span>
                </div>
                <div id="sub_account_table_div">
                    <div id="file_table_small_div">
                        <el-table
                            class="tableClass"
                            :data="subAccountTable"
                            :width="1144*tableSize"
                            :header-row-style="{height:'0.45rem'}"
                            :header-cell-style="{color:'rgba(29, 33, 41, 1)',padding:'0','background-color': 'rgba(242, 243, 245, 1)'}"
                            :row-style="{height:'0.45rem'}"
                            :cell-style="{padding:'0','background-color': 'rgba(255, 255, 255, 1)',color:'rgba(29, 33, 41, 1)'}"
                            >

                            <el-table-column
                                prop="id"
                                align = "center"
                                label="序号"
                                :width="69*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="buildTime"
                                align = "center"
                                label="创建时间"
                                :width="215*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="email"
                                align = "center"
                                label="账户邮箱"
                                :width="215*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="testNum"
                                label="已检测次数"
                                align = "center"
                                :width="215*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="name"
                                align = "center"
                                label="姓名"
                                :width="215*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                label="操作"
                                align = "center"
                                :width="215*tableSize"
                                >
                                <template slot-scope="scope">
                                    <span @click="modify_sub(scope.$index)" class="playButtons_span">编辑</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="pagination_div">
                    <el-pagination id="pagination" :page-sizes="[8, 10]" @current-change="get_page_list"
                    :pager-count="7" layout="->,total,prev,pager,next,sizes" :total="sub_account_num" @size-change="get_size_list">
                    </el-pagination>
                </div>
            </div>
            <div v-if="create_sub_flag==true" id="create_sub_account_div">
                <div id="create_sub_top_div">
                    <div id="create_sub_top_center_div">
                        <img id="create_sub_top_center_img" src="../assets/sub_account_page/create_sub_icon.svg">
                        <span id="create_sub_top_center_span">创建子账号</span>
                    </div>
                </div>
                <div id="create_sub_mid_div">
                    <span class="create_sub_mid_span">子账号登录邮箱</span>
                    <el-input
                            class="input_style"
                            placeholder="输入注册邮箱example@mail.com"
                            v-model="create_sub_email"
                            clearable>
                        </el-input>
                    <span class="create_sub_mid_span">设置登录密码</span>
                    <el-input
                        class="input_style"
                        placeholder="6-20位字母或数字"
                        v-model="create_sub_pass1"
                        clearable
                        @input="checkPassword">
                    </el-input>
                    <el-input 
                        class="input_style" 
                        placeholder="再次输入确认密码" 
                        v-model="create_sub_pass2" 
                        clearable
                        @input="checkPassword"
                        style="margin-top: 11px;">
                    </el-input>
                    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
                </div>
                <div id="create_sub_mbottom_div">
                    <button id="create_sub_mbottom_button1" @click="cancel_create_sub">取消</button>
                    <button id="create_sub_mbottom_button2" @click="submitForm()">确认</button>
                </div>
            </div>
            <div v-if="modify_sub_flag==true" id="modify_sub_account_div">
                <div id="modify_sub_top_div">
                    <div id="modify_sub_top_center_div">
                        <img id="modify_sub_top_center_img" src="../assets/sub_account_page/create_sub_icon.svg">
                        <span id="modify_sub_top_center_span">编辑子账号信息</span>
                    </div>
                </div>
                <div id="modify_sub_mid_div">
                    <div id="modify_sub_mid_top_div">
                        <span class="create_sub_mid_span2">子账号登录邮箱</span>
                        <span class="modify_sub_delete_span" @click="handleDelete">删除子账号</span>
                    </div>
                    <el-input
                            class="input_style"
                            placeholder="输入注册邮箱example@mail.com"
                            v-model="modify_sub_email"
                            clearable>
                        </el-input>
                    <span class="create_sub_mid_span">为子账号重置登录密码</span>
                    <el-input
                        class="input_style"
                        placeholder="6-20位字母或数字"
                        v-model="modify_sub_pass1"
                        clearable
                        @input="checkPassword2">
                    </el-input>
                    <el-input 
                        class="input_style" 
                        placeholder="再次输入确认密码" 
                        v-model="modify_sub_pass2" 
                        clearable
                        @input="checkPassword2"
                        style="margin-top: 11px;">
                    </el-input>
                    <div class="error-message2" v-if="errorMessage">{{ errorMessage }}</div>
                </div>
                <div id="modify_sub_mbottom_div">
                    <button id="modify_sub_mbottom_button1" @click="cancel_modify_sub">取消</button>
                    <button id="modify_sub_mbottom_button2" @click="resetPass()">确认重置密码</button>
                </div>
            </div>
        </div>
    </div>   
</template>
   
<script>
    export default {
        name: 'HomeView',
        data(){
            return{
                create_sub_email: '',
                create_sub_pass1: '',
                create_sub_pass2: '',
                modify_sub_email: '',
                modify_sub_pass1: '',
                modify_sub_pass2: '',
                errorMessage: '',
                errorMessage2: '',
                tableSize: 1,
                // user_grade_dict:{2: "企业用户", 3: "企业子账户", 4: "付费用户", 5: "体验用户"},
                user_grade_dict:{2: "体验用户", 3: "体验用户", 4: "体验用户", 5: "体验用户"},
                user_grade_num: 2,
                login_flag: false,
                subAccountTable:[],
                subAccountTable: [],

                surplus_detect_times: 0,
                usernameInput: '',
                per_page_num: 10,
                page: 1,
                sub_account_num: 0,
                create_sub_flag: false,
                modify_sub_flag: false,
                button_flag: false,
                showDropdown: false,
                passwordCheck: false,
                errorMessage2: false,
                cancelTokenSource: this.$axios.CancelToken.source(),
            }
        },
        methods:{
            checkPassword() {
                //判断密码长度是否大于6位
                if (this.create_sub_pass1.length < 6) {
                    this.errorMessage = '密码长度不能少于6位';
                    return;
                }
                // 判断两次输入的密码是否一致
                if (this.create_sub_pass1 !== this.create_sub_pass2) {
                    this.errorMessage = '两次输入的密码不一致';
                    return;
                }
                // 通过验证
                this.passwordCheck = true;
                this.errorMessage = '';
            },

            create_sub(){
                this.create_sub_flag= true;
                this.modify_sub_flag= false;
            },

            cancel_create_sub(){
                this.create_sub_flag= false;
                this.modify_sub_flag= false;
                this.create_sub_email= '';
                this.create_sub_pass1= '';
                this.create_sub_pass2= '';
            },

            modify_sub(index){
                this.create_sub_flag= false;
                this.modify_sub_flag= true;
                this.modify_sub_email= this.subAccountTable[index].email;
            },

            cancel_modify_sub(){
                this.create_sub_flag= false;
                this.modify_sub_flag= false;
                this.modify_sub_email= '';
                this.modify_sub_pass1= '';
                this.modify_sub_pass2= '';
            },

            checkPassword2() {
                //判断密码长度是否大于6位
                if (this.modify_sub_email.length < 6) {
                    this.errorMessage2 = '密码长度不能少于6位';
                    return;
                }
                // 判断两次输入的密码是否一致
                if (this.modify_sub_email !== this.modify_sub_emai2) {
                    this.errorMessage2 = '两次输入的密码不一致';
                    return;
                }
                // 通过验证
                this.passwordCheck2 = true;
                this.errorMessage2 = '';
            },

            get_page_list(pager){
                this.page = pager;
                this.getSubAccountList();
            },

            get_size_list(limit){
                this.per_page_num = limit;
                this.get_page_list(this.page);
            },

            getSubAccountList(){
                this.$axios.post('http://112.11.139.202:8090/subaccount_info', {"page": this.page, "pageNum": this.per_page_num},
                {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res => {
            
                    console.log(res.data.subAccountList);

                    this.subAccountTable = res.data.subAccountList;
                    this.sub_account_num = res.data.totalCount;
                }).catch((error) => { 
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } 
                    else {
                        if (error.response && error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    }
                });
            },

            resetPass(){
                this.$axios.post('http://112.11.139.202:8090/create_subaccount',{
                    "email":this.modify_sub_email,
                    "password": this.modify_sub_pass1,
                    },{headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res=>{
                        if (res.data.sign == true){
                            this.dialogVisible = false;
                        
                            this.getSubAccountList();
                            this.$message({
                            message: '修改成功',
                            type: 'success'
                            }); 
                        } 
                        else{
                            this.$message.error('修改失败！');
                        }  
                    }).catch((error) => {
                        if (this.$axios.isCancel(error)) {
                            console.log('请求被取消');
                        } 
                        else {
                            if (error.response.status === 401) {
                                console.log('token 验证失效!');
                                this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            }
                            else{
                                console.log('请求发生错误：', error);
                            } 
                        }
                    });
            },

            submitForm() {
                if (this.passwordCheck) {
                    console.log('注册请求')
                    this.$axios.post('http://112.11.139.202:8090/create_subaccount',{
                    "email":this.create_sub_email,
                    "password": this.create_sub_pass1,
                    },{headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res=>{
                        if (res.data.sign == true){
                            this.dialogVisible = false;
                        
                            this.getSubAccountList();
                            this.$message({
                            message: '注册成功',
                            type: 'success'
                            }); 
                        } 
                        else{
                            this.$message.error('对不起，邮箱已注册');
                        }  
                    }).catch((error) => {
                        if (this.$axios.isCancel(error)) {
                            console.log('请求被取消');
                        } 
                        else {
                            if (error.response.status === 401) {
                                console.log('token 验证失效!');
                                this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            }
                            else{
                                console.log('请求发生错误：', error);
                            } 
                        }
                    });  
                } 
                else {
                    console.log('输入验证错误');
                    return false;
                };
                this.create_sub_flag= false;
                this.modify_sub_flag= false;
                this.create_sub_email= '';
                this.create_sub_pass1= '';
                this.create_sub_pass2= '';
            },

            handleDelete(){
                this.$axios.post('http://112.11.139.202:8090/delete_subaccount', {"email":this.modify_sub_email,},
                {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                        });
                    this.getSubAccountList();
                }).catch((error) => { 
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } 
                    else {
                        if (error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    }
                });
            },

            initHtml:function () {
                console.log("当前屏幕分辨率: " + window.screen.width);
                var font_size = window.screen.width/2560*100;
                if(window.screen.width<1920){
                        font_size=100;
                }
                this.tableSize = font_size/100;
                document.documentElement.style.fontSize = font_size+'px';
                document.title = "深度合成语音伪造检测软件";

                if (localStorage.getItem("access-admin") !== null) {
                    // access-admin字段存在
                    this.$axios.post('http://112.11.139.202:8090/get_user_info', {},
                    {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token}}).then(res => {
                        console.log(res.data);
                        
                        this.login_flag = true;
                        this.usernameInput = res.data.email;
                        this.surplus_detect_times = res.data.residue;
                        this.user_grade_num = res.data.role;
                        
                    }).catch((error) => { 
                        if (error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            this.login_flag = false;
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    });
                } else {
                    // access-admin字段不存在
                    console.log("登录已过期");
                }

                this.getSubAccountList();
            }
        },

        created(){
            this.initHtml();
        },

        beforeDestroy(){
            this.cancelTokenSource.cancel('请求被取消');
            console.log('destory request');
        },

        computed: {
        },
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
    width: 172px;
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
    width: 60px;
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

#sub_account_div{
    width: 1200px;
    height: 750px;
    opacity: 1;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(224, 227, 235, 1);
    box-shadow: 0px 8px 20px  rgba(44, 51, 67, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 34px;
}

#sub_account_top_div{
    width: 1200px;
    height: 70px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(229, 230, 235, 1);
}

#sub_account_top_left_div{
    width: 1003.52px;
    height: 42.35px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
}

#sub_account_top_img{
    width: 40px;
    height: 42.35px;
    opacity: 1;
    display: flex;
}

#sub_account_top_span{
    margin-left: 16px;
    width: 150px;
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

#sub_account_top_button{
    width: 146.48px;
    height: 48px;
    opacity: 1;
    border-radius: 6px;
    background: rgba(22, 93, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-style: none;

    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 15px;
}

#sub_account_mid_div{
    width: 1144px;
    height: 72px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 28px;
}

#sub_account_mid_button{
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
    cursor: pointer;
}

#sub_account_mid_span{
    width: 658px;
    height: 20px;
    opacity: 1;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20.27px;
    color: rgba(153, 153, 153, 1);
    text-align: left;
    vertical-align: top;
    margin-top: 16px;
}

#sub_account_table_div{
    width: 1200px;
    height: 510px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 16px;
}

#file_table_small_div{
    width: 1144px;
    display: flex;
}

.playButtons_span{
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: rgba(22, 93, 255, 1);
    cursor: pointer;
}

#pagination_div{
    width: 1200px;
    height: 40px;
    opacity: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#pagination{
    width: 1144px;
    height: 32px;
}

::v-deep #pagination .el-pagination__rightwrapper{
    height: 32px;
}

#create_sub_account_div{
    position: fixed;
    margin-top: 250px;
    width: 564px;
    height: 532px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 32px 32px 32px;
    z-index: 8;
}

#create_sub_top_div{
    width: 500px;
    height: 61px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid rgba(229, 230, 235, 1);
}

#create_sub_top_center_div{
    width: 144px;
    height: 36px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#create_sub_top_center_img{
    width: 36px;
    height: 36px;
    opacity: 1;
    display: flex;
}

#create_sub_top_center_span{
    margin-left: 8px;
    width: 100px;
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

#create_sub_mid_div{
    width: 500px;
    height: 336px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.create_sub_mid_span{
    margin-top: 25px;
    margin-bottom: 10px;
    width: 200px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    align-items: center;
}

::v-deep #create_sub_mid_div .el-input__inner{
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

#create_sub_mbottom_div{
    width: 144px;
    height: 32px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
}

#create_sub_mbottom_button1{
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
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

#create_sub_mbottom_button2{
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
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

#modify_sub_account_div{
    position: fixed;
    margin-top: 250px;
    width: 564px;
    height: 532px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 32px 32px 32px;
    z-index: 8;
}

#modify_sub_top_div{
    width: 500px;
    height: 61px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid rgba(229, 230, 235, 1);
}

#modify_sub_top_center_div{
    width: 194px;
    height: 36px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#modify_sub_top_center_img{
    width: 36px;
    height: 36px;
    opacity: 1;
    display: flex;
}

#modify_sub_top_center_span{
    margin-left: 8px;
    width: 140px;
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

#modify_sub_mid_div{
    width: 500px;
    height: 336px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

#modify_sub_mid_top_div{
    width: 500px;
    height: 48px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 25px;
}

.create_sub_mid_span2{
    width: 140px;
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

.modify_sub_delete_span{
    width: 100px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(245, 63, 63, 1);
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

::v-deep #modify_sub_mid_div .el-input__inner{
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

#modify_sub_mbottom_div{
    width: 200px;
    height: 32px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
}

#modify_sub_mbottom_button1{
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
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

#modify_sub_mbottom_button2{
    width: 116px;
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
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

</style>
