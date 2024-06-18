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
                    <span id="banner_title">语音合成检测平台</span>
                </div>
                <div id="banner_right" v-show="login_flag==false">
                    <span class="login_button" @click="show_login_box(true)">登录</span>
                    <!-- <span class="register_button" @click="show_login_box(false)">注册</span> -->
                    <span class="register_button" @click="consulting">体验申请</span>
                </div>
                <div id="banner_user" v-show="login_flag==true">
                    <img id="banner_user_img" src="../assets/home_page/user.png">
                    <span id="banner_user_span" @mouseover="handleMouseOver"
                     @mouseleave="startHideTimer">{{ usernameInput }}</span>
                </div>
                <div id="user_div" v-if="showDropdown==true" @mouseleave="startHideTimer" @mouseenter="cancelHideTimer">
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
                            <span id="user_div_span4">升级体验请联系我们</span>
                        </div>
                        <button id="user_mid_button" @click="consulting">立即咨询</button>
                    </div>
                    <div id="user_bottom_div">
                        <div class="user_bottom_small_div" @click="go_modify_password">
                            <span class="user_div_span5">修改密码</span>
                            <img class="user_div_span_icon" src="../assets/home_page/right.svg">
                        </div>
                        <div class="user_bottom_small_div" @click="subAccount" v-if="user_grade_num<3">
                            <span class="user_div_span5">子账户管理</span>
                            <img class="user_div_span_icon" src="../assets/home_page/right.svg">
                        </div>
                        <div class="user_bottom_small_div" @click="log_out">
                            <span class="user_div_span5">退出登录</span>
                            <img class="user_div_span_icon2" src="../assets/home_page/login_out.svg">
                        </div>
                    </div>
                </div>
            </div>
            <div id="login_div" v-show="login_box_flag==true">
                <div id="login_top_div">
                    <div id="login_top_top_div">
                        <!-- 现阶段不开发注册功能，右上角注册按钮和登录区域中均去除相关选项，需要恢复的话，修改display_choose样式 -->
                        <div :class="login_or_register?'display_choose':'display_no_choose'" @click="select_login_register(true)">登录</div>
                        <!-- <div :class="login_or_register?'display_no_choose':'display_choose'" @click="select_login_register(false)">注册</div> -->
                    </div>
                    <div class="login_top_mid_div" v-show="login_or_register==true">
                        <span class="usernameText">用户名</span>
                        <el-input
                            class="input_style"
                            placeholder="登录邮箱"
                            v-model="usernameInput"
                            prefix-icon="el-icon-user"
                            clearable>
                        </el-input>
                        <span class="passwordText">密码</span>
                        <el-input 
                            class="input_style" 
                            placeholder="请输入密码" 
                            v-model="passwordInput" 
                            prefix-icon="el-icon-lock" show-password clearable>
                        </el-input>
                        <button class="login_top_button" @click="login">登录</button>
                    </div>
                    <div class="login_top_mid_div" v-show="login_or_register==false && register_step==true">
                        <span class="usernameText">注册邮箱</span>
                        <el-input
                            class="input_style"
                            placeholder="输入注册邮箱example@mail.com"
                            v-model="register_email"
                            clearable>
                        </el-input>
                        <span class="passwordText">验证码</span>
                        <el-input 
                            class="input_style" 
                            placeholder="请输入验证码" 
                            v-model="register_code" 
                            clearable>
                            <template #append>
                                <span :class="button_flag?'code_button_ti':'code_button'" :disabled="button_flag" @click="getCode">获取验证码</span>
                            </template>
                        </el-input>
                        <button class="login_top_button" @click="register_go">注册</button>
                    </div>
                    <div class="login_top_mid_div" v-show="login_or_register==false && register_step==false">
                        <span class="usernameText">设置登录密码</span>
                        <el-input
                            class="input_style"
                            placeholder="6-20位字母或数字"
                            v-model="register_pass1"
                            clearable
                            @input="checkPassword">
                        </el-input>
                        <el-input 
                            class="input_style" 
                            placeholder="再次输入确认密码" 
                            v-model="register_pass2" 
                            clearable
                            @input="checkPassword"
                            style="margin-top: 11px;">
                        </el-input>
                        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
                        <button class="login_top_button" @click="register">确认设置登录密码</button>
                    </div>
                </div>
                <div class="login_close_img_div" @click="close_login_box">
                    <img class="login_close_img" src="../assets/home_page/close2.svg">
                </div>
            </div>
            <div id="modify_div" v-if="modify_password_flag==true">
                <div id="modify_top_div">
                    <div id="modify_top_top_div">
                        <span id="modify_top_top_span">修改密码</span>
                    </div>
                    <div id="modify_top_mid_div">
                        <div id="modify_top_mid_top_div">
                            <span id="modify_top_mid_top_span1">当前登录邮箱</span>
                            <span id="modify_top_mid_top_span2">{{ usernameInput }}</span>
                        </div>
                        <span class="passwordText2">验证码</span>
                        <el-input 
                            class="input_style" 
                            placeholder="请输入验证码" 
                            v-model="modify_code" 
                            clearable>
                            <template #append>
                                <span :class="button_flag?'code_button_ti':'code_button'" :disabled="button_flag" @click="getCode">获取验证码</span>
                            </template>
                        </el-input>
                        <span class="usernameText2">设置登录密码</span>
                        <el-input
                            class="input_style"
                            placeholder="6-20位字母或数字"
                            v-model="modify_pass1"
                            clearable
                            @input="checkPassword2">
                        </el-input>
                        <el-input 
                            class="input_style" 
                            placeholder="再次输入确认密码" 
                            v-model="modify_pass2" 
                            clearable
                            @input="checkPassword2"
                            style="margin-top: 11px;">
                        </el-input>
                        <div class="error-message" v-if="errorMessage2">{{ errorMessage2 }}</div>
                    </div>
                    <button class="login_top_button2" @click="showConfirmDialog">确认修改登录密码</button>
                </div>
                <div class="login_close_img_div" @click="close_modify_box">
                    <img class="login_close_img" src="../assets/home_page/close2.svg">
                </div>
            </div>
            <div id="intro_div">
                <p id="intro_title">语音深度合成检测</p>
                <span id="intro_content">深度合成(Deep synthesis) 是指利用深度学习、虚拟现实等生成合成类算法制作图像、音频、视<br>
                    频、文本、虚拟场景等网络信息的技术。DeepFake语音合成通过人工智能技术可以合成逼真的音<br>
                    频内容，让重要人物说从未说过的话。仅通过公开网络渠道人人可获取的音频素材，就能训练出<br>
                    一个能够合成带有目标重要人物音色音频的深度伪造模型。
                </span>
                <button id="experience_button">立即体验</button>
            </div>
            <div id="navigation_div">
                <div id="navigation_title_div">
                    <span id="navigation_title">语音合成检测平台功能</span>
                    <img id="navigation_img" src="../assets/home_page/separate_line.png">
                </div>
                <div id="navigation_content_div">
                    <div class="navigation_item_div" @click="toPage(1)">
                        <div class="navigation_item_div_div">
                            <img class="navigation_item_img1" src="../assets/home_page/icon1.png">
                            <span class="navigation_item_span1">单条检测</span>
                            <img class="navigation_item_img2" src="../assets/home_page/arrow.png">
                        </div>
                        <span class="navigation_item_span2">上传一条语音音频文件，立即进行语音深度合成检测。</span>
                    </div>
                    <div class="navigation_item_div" @click="toPage(2)">
                        <div class="navigation_item_div_div">
                            <img class="navigation_item_img1" src="../assets/home_page/icon2.png">
                            <span class="navigation_item_span1">检测历史</span>
                            <img class="navigation_item_img2" src="../assets/home_page/arrow.png">
                        </div>
                        <span class="navigation_item_span2">查看单个语音音频文件深度合成检测历史记录。</span>
                    </div>
                    <div class="navigation_item_div" @click="toPage(3)">
                        <div class="navigation_item_div_div">
                            <img class="navigation_item_img1" src="../assets/home_page/icon3.png">
                            <span class="navigation_item_span1">批量检测</span>
                            <img class="navigation_item_img2" src="../assets/home_page/arrow.png">
                        </div>
                        <span class="navigation_item_span2">批量上传语音音频文件，进行语音深度合成检测，并输出检测报告。</span>
                    </div>
                    <div class="navigation_item_div" @click="toPage(4)">
                        <div class="navigation_item_div_div">
                            <img class="navigation_item_img1" src="../assets/home_page/icon4.png">
                            <span class="navigation_item_span1">检测报告</span>
                            <img class="navigation_item_img2" src="../assets/home_page/arrow.png">
                        </div>
                        <span class="navigation_item_span2">查看深度合成语音批量检测的历史检测报告。</span>
                    </div>
                </div>
            </div>
            <div id="content_div" v-if="user_grade_num<5">
                <div id="content_top_div">
                    <img id="content_top_left_img" src="../assets/home_page/icon4.png">
                    <span id="content_top_left_span">检测报告</span>
                </div>
                <div id="content_mid_div">
                    <span id="content_mid_span">已完成 {{total_batch_report}} 批语音文件检测, 共计检测 {{ total_batch_file }} 个文件</span>
                    <div id="content_mid_bottom_div">
                        <span class="demonstration">检测日期</span>
                        <el-date-picker
                            v-model="se_time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <button id="content_mid_bottom_button" @click="search_file">查找</button>
                    </div>
                </div>
                <div id="file_table_div">
                    <div id="file_table_small_div">
                        <el-table
                            class="tableClass"
                            :data="tableData"
                            :width="1144*tableSize"
                            :header-row-style="{height:'0.45rem'}"
                            :header-cell-style="{color:'rgba(29, 33, 41, 1)',padding:'0','background-color': 'rgba(242, 243, 245, 1)'}"
                            :row-style="{height:'0.45rem'}"
                            :cell-style="{padding:'0','background-color': 'rgba(255, 255, 255, 1)',color:'rgba(29, 33, 41, 1)'}"
                            >

                            <el-table-column
                                prop="taskIndex"
                                align = "center"
                                label="序号"
                                :width="68*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="buildTime"
                                align = "center"
                                label="检测日期"
                                :width="416*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="useWay"
                                align = "center"
                                label="检测调用方式"
                                :width="159*tableSize"
                                >
                                <template slot-scope="scope">
                                    <div class="scroll-text">网页上传</div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="testTime"
                                align = "center"
                                label="检测用时"
                                :width="102*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="audioNum"
                                label="文件数量"
                                align = "center"
                                :width="135*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="proportion"
                                align = "center"
                                label="伪造占比"
                                :width="176*tableSize"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="checkTime"
                                align = "center"
                                label="详细结果"
                                :width="88*tableSize"
                                >
                                <template slot-scope="scope">
                                    <el-button style="color: rgba(22, 93, 255, 1);" v-show="scope.row.detectFinish==1" @click="handleClick(scope.row.taskId)" type="text"  > 查看 </el-button>
                                    <el-button style="color: gray;" v-show="scope.row.detectFinish==0"  type="text"  disabled> 查看 </el-button>
                                </template>
                                
                            </el-table-column>

                        </el-table>
                    </div>
                </div>
                <div id="pagination_div">
                    <el-pagination id="pagination" :page-sizes="[8, 10]" @current-change="get_page_list"
                    :pager-count="7" layout="->,total,prev,pager,next,sizes" :total="total_num" @size-change="get_size_list">
                    </el-pagination>
                </div>
            </div>
            <div id="grade_not_div" v-if="user_grade_num>4">
                <div id="grade_not_top_div">
                    <img id="grade_not_top_img" src="../assets/home_page/kefu.svg">
                    <span id="grade_not_top_span">温馨提示</span>
                </div>
                <div id="grade_not_mid_div">
                    <span class="grade_not_mid_span">该功能当前未开放。</span>
                    <span class="grade_not_mid_span">咨询体验, 请邮件联系: VOcert@outlook.com </span>
                </div>
                <button id="grade_not_bottom_button">确定</button>
            </div>
        </div>
    </div>   
</template>
   
<script>
    export default {
        name: 'HomeView',
        data(){
            return{
                total_batch_report: 0,
                total_batch_file: 0,
                se_time: [],
                tableSize: 1,
                // user_grade_dict:{2: "企业用户", 3: "企业子账户", 4: "付费用户", 5: "体验用户"},
                user_grade_dict:{2: "体验用户", 3: "体验用户", 4: "体验用户", 5: "体验用户"},
                user_grade_num: 2,
                login_flag: false,
                modify_password_flag: false,

                surplus_detect_times: 0,
                usernameInput: '',
                passwordInput: '',
                register_email: '',
                register_code: '',
                register_pass1: '',
                register_pass2: '',
                errorMessage: '',
                modify_code: '',
                modify_pass1: '',
                modify_pass2: '',
                errorMessage2: '',
                passwordCheck: false,
                ModifyPasswordCheck: false,
                login_box_flag: false,
                login_or_register: true,
                register_step: true,
                button_flag: false,
                consulting_flag: false,

                search_text: '',
                tableData:[],
                total_table_data: [],
                showDropdown: false,
                hideTimer: null,
                file_path: "",
                modelScoreList:[],
                modelResultList:[],
                segmentScoreList:[[],[],[]],
                segmentResultList:[[],[],[]],
                cancelTokenSource: this.$axios.CancelToken.source(),
                detectProg: 0,
                fabProp: '',
                batch_task_id:-1,  // 存放后端返回的batch_task_id
                queryTimer: null,
                per_page_num: 10,
                page: 1,
                total_num: 0,
                audioPlay: true,
                queryTimer: null,  // 批量任务历史轮询定时器
                queryFinish: 0,
                cancelTokenSource: this.$axios.CancelToken.source(), // 用于取消请求
            }
        },
        methods:{
            //跳转页面
            toPage:function (num){
                if(num===1){
                    this.$router.push('/home');
                }
                if(num===2){
                    this.$router.push('/history');
                }
                if(num===3){
                    this.$router.push('/batchtest');
                }
                // if(num===4){
                //     this.$router.push('/batchhistory');
                // }
            },

            consulting(){
                this.consulting_flag=true;
            },

            cancel_consulting_div(){
                this.consulting_flag=false;
            },

            startHideTimer() {
                this.hideTimer = setTimeout(() => {
                    this.showDropdown = false;
                }, 1000); // 设置200毫秒的延迟
            },

            cancelHideTimer() {
                clearTimeout(this.hideTimer); // 取消延迟隐藏
            },

            select_login_register(flag){
                this.login_or_register = flag;
            },
            
            login(){
                var this_ = this
                this.$axios.post('http://112.11.139.202:8090/login',{
                "email": this.usernameInput,
                "password": this.passwordInput,
                }).then(res=>{
                console.log(res.data);
                if (res.status == 200) {
                    // console.log(res.data);
                    localStorage.setItem("access-admin", JSON.stringify(res.data));
                    this_.login_flag = true;
                    this_.login_box_flag = false;
                    this_.surplus_detect_times = res.data.detectTimes;
                    this_.user_grade_num = res.data.user_grade;

                    // console.log(JSON.parse(window.localStorage.getItem('access-admin')));
                    // this_.$router.push('/home');
                }
                else{
                    // this.$alert("用户名/密码错误,请重新登录",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                    this.$message({
                        message: '密码错误！',
                        type: 'warning',
                        center: true
                    });
                }   
                }).catch((error) => {
                    console.log('请求发生错误：', error);
                });
            },

            register_go(){
                this.register_step = false;
            },

            checkPassword() {
                //判断密码长度是否大于6位
                if (this.register_pass1.length < 6) {
                    this.errorMessage = '密码长度不能少于6位';
                    return;
                }
                // 判断两次输入的密码是否一致
                if (this.register_pass1 !== this.register_pass2) {
                    this.errorMessage = '两次输入的密码不一致';
                    return;
                }
                // 通过验证
                this.passwordCheck = true;
                this.errorMessage = '';
            },

            checkPassword2() {
                //判断密码长度是否大于6位
                if (this.modify_pass1.length < 6) {
                    this.errorMessage2 = '密码长度不能少于6位';
                    return;
                }
                // 判断两次输入的密码是否一致
                if (this.modify_pass1 !== this.modify_pass2) {
                    this.errorMessage2 = '两次输入的密码不一致';
                    return;
                }
                // 通过验证
                this.ModifyPasswordCheck = true;
                this.errorMessage2 = '';
            },

            getCode() {
                this.button_flag = true;
                var this_ = this
                setTimeout(function() {
                    this_.button_flag = false;
                }, 10000);
                this.$axios.get('http://112.11.139.202:8090/code',{params:{
                        "email":this_.register_email}
                        }).then(res=>{
                            if (res.status == 200){
                                console.log(res.data);  
                                this.$alert("验证码已发送，有效期5分钟！",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                            } 
                            else{
                                console.log(res.data);
                                // this.$alert(res.data,'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                            }  
                        }).catch((error) => {
                            console.log('请求发生错误：', error);
                        });
            },

            register(){
                if (this.passwordCheck){
                    this.$axios.post('http://112.11.139.202:8090/register',{
                        "email":this.register_email,
                        "code":this.register_code,
                        "password": this.register_pass1,
                        }).then(res=>{
                            if (res.status == 200){
                                this.$alert('请前往登录', '注册成功', {
                                    confirmButtonText: '确定',
                                    showClose: false,
                                    // callback: action => {
                                    //     this.$router.push('/login');   
                                    // }
                                });
                            } 
                            else{
                                console.log(res.data);
                                // this.$alert("异常",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                            }  
                        }).catch((error) => {
                            console.log('请求发生错误：', error);
                        });
                    this_.login_flag = false;
                    this_.login_box_flag = false;
                }else{
                    this.$alert("请检查属输入");
                }
            },

            go_modify_password(){
                this.modify_password_flag = true;
            },

            log_out(){
                localStorage.removeItem("access-admin");
                this.login_flag = false;
                this.toPage(1);
            },

            subAccount:function(){
                let routeUrl = this.$router.resolve({
                        path: "/subaccount",
                        query: {}
                    });
                window.open(routeUrl.href, '_blank');
            },

            close_modify_box(){
                this.modify_password_flag = false;
            },

            showConfirmDialog() {
                this.$confirm('确定要修改密码吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 用户点击了确定按钮，执行修改密码的操作
                    this.modify_password();
                }).catch(() => {
                    // 用户点击了取消按钮，不执行任何操作
                });
            },

            modify_password(){
                if(this.ModifyPasswordCheck){
                    var this_ = this;
                    this.$axios.post('http://112.11.139.202:8090/modify',{
                    "email":this_.usernameInput,
                    "code":this_.modify_code,
                    "password": this_.modify_pass1,
                    },{headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token}}).then(res=>{
                        if (res.status == 200){
                            this.$alert('请前往登录', '修改成功', {
                                confirmButtonText: '确定',
                                showClose: false,
                                // callback: action => {
                                //     this.$router.push('/login');   
                                // }
                            });
                        } 
                        else{
                            console.log(res.data);
                            // this.$alert(res.data,'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                        }  
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
                }else{
                    this.$alert("请检查属输入");
                };
                this.modify_password_flag = false;
            },

            show_login_box(flag){
                if(flag){
                    this.login_box_flag = true;
                    this.login_or_register = true;
                }else{
                    this.login_box_flag = true;
                    this.login_or_register = false;
                }
            },

            close_login_box(){
                this.login_box_flag = false;
            },

            get_page_list(pager){
                this.page = pager;
                this.$axios.post('http://112.11.139.202:8090/search_task', {"page": this.page, "pageNum": this.per_page_num, "seTime": this.se_time},
                {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res => {
                    console.log('获取批量任务历史请求');
                    console.log(res.data);
                    this.tableData = res.data.taskList;
                    this.queryFinish = res.data.query_finish;
                    this.total_num = res.data.totalCount;

                    for (let i=0; i<this.tableData.length; i++){
                        if (this.tableData[i].detectFinish==1){
                            let baifen = (this.tableData[i].dfNum / this.tableData[i].audioNum)*100;
                            this.tableData[i].proportion = baifen.toFixed(2) + '%';
                        }
                    }

                }).catch((error) => { 
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } 
                    else {
                        if (error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            this.login_flag = false;
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    }
                });
            },

            get_size_list(limit){
                this.per_page_num = limit;
                this.get_page_list(this.page);
            },

            search_file(){
                this.page = 1;
                if(this.queryTimer){
                    clearInterval(this.queryTimer); // 清除定时任务
                    this.queryTimer = null;
                }

                this.$axios.post('http://112.11.139.202:8090/search_task', {"pageNum": this.per_page_num, "page": this.page, "seTime": this.se_time},
                {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res => {
                    console.log('获取批量任务历史请求');
                    console.log(res.data);
                    this.tableData = res.data.taskList;
                    this.queryFinish = res.data.query_finish;
                    this.total_num = res.data.totalCount;

                    for (let i=0; i<this.tableData.length; i++){
                        if (this.tableData[i].detectFinish==1){
                            let baifen = (this.tableData[i].dfNum / this.tableData[i].audioNum)*100;
                            this.tableData[i].proportion = baifen.toFixed(2) + '%';
                        }
                    }

                }).catch((error) => { 
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } 
                    else {
                        if (error.response && error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            this.login_flag = false;
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    }
                });
            },

            getBatchTaskHistoryList(){
                this.$axios.post('http://112.11.139.202:8090/get_task', {"pageNum": this.per_page_num, "page": this.page, "seTime": this.se_time},
                {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res => {
                    console.log('获取批量任务历史请求');
                    console.log(res.data);
                    this.tableData = res.data.taskList;
                    this.queryFinish = res.data.query_finish;
                    this.total_num = res.data.totalCount;

                    for (let i=0; i<this.tableData.length; i++){
                        if (this.tableData[i].detectFinish==1){
                            let baifen = (this.tableData[i].dfNum / this.tableData[i].audioNum)*100;
                            this.tableData[i].proportion = baifen.toFixed(2) + '%';
                        }
                    }

                    if (this.queryFinish==1){
                        if(this.queryTimer){
                            clearInterval(this.queryTimer); // 清除定时任务
                            this.queryTimer = null;
                        }
                    }
                    
                }).catch((error) => { 
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } 
                    else {
                        if(this.queryTimer){
                            clearInterval(this.queryTimer); // 清除定时任务
                            this.queryTimer = null;
                        }
                        if (error.response && error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            this.login_flag = false;
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    }
                });
            },

            handleMouseOver(){
                this.showDropdown = true;
                this.$axios.post('http://112.11.139.202:8090/get_user_info', {},
                    {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token}}).then(res => {
                        this.surplus_detect_times = res.data.residue;
                        
                    }).catch((error) => { 
                        if (error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            this.login_flag = false;
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    }
                );
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

                this.getBatchTaskHistoryList();
                // 每隔一段时间（例如5秒）发送一次请求, 更新评估状态, 单位毫秒

                if (this.queryTimer===null){
                    this.queryTimer = setInterval(() => {
                    this.getBatchTaskHistoryList();
                    }, 5000);
                }
            },

            handleClick(taskId){
                if(this.queryTimer){
                    clearInterval(this.queryTimer); // 清除定时任务
                    this.queryTimer = null;
                }
                console.log(taskId);
                this.$router.push({
                path: '/report',
                query: {
                    taskId: taskId
                }
                });
            },
        },

        created(){
            this.initHtml();
        },

        beforeDestroy(){
            this.cancelTokenSource.cancel('请求被取消');
            console.log('destory request');
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
    /* margin-left: 680px; */
    width: 560px;
    height: 725px;
    opacity: 1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.resultTextColor{
    color: rgb(217, 0, 27);
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
    background-size: cover; /* 让背景图片铺满整个区域 */
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
    width: 93.96px;
    height: 29.48px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: top;
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
    margin-top: 40px;
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(224, 227, 235, 1);
    box-shadow: 0px 8px 20px  rgba(44, 51, 67, 0.06);
}

#file_table_div{
    width: 1200px;
    height: 510px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 15px;
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
}

.recorderSpan{
    width: 52px;
    height: 22px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
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
    z-index: 999;
}

::v-deep #pagination .el-input__inner{
    height: 32px;
    margin-top: -3px;
}

#content_top_div{
    width: 1200px;
    height: 70px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(229, 230, 235, 1);
}

#content_top_left_img{
    margin-left: 15px;
    width: 40px;
    height: 42.35px;
    opacity: 1;
    display: flex;
}

#content_top_left_span{
    margin-left: 16px;
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

#content_mid_div{
    margin-top: 28px;
    width: 1144px;
    height: 78px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

#content_mid_span{
    width: 800px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: middle;
}

#content_mid_bottom_div{
    margin-top: 18px;
    margin-top: 18px;
    width: 1144px;
    height: 32px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.demonstration{
    margin-right: 10px;
    width: 90px;
    height: 28px;
    opacity: 1;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 28.96px;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: top;
}

#content_mid_div input:focus {
    border-color: blue; /* 设置选中时的边框颜色为蓝色 */
}

#content_mid_bottom_button{
    margin-left: 16px;
    width: 77px;
    height: 32px;
    opacity: 1;
    border-radius: 5px;
    background: rgba(11, 85, 244, 0.96);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-style: none;

    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

::v-deep #content_mid_div .el-input__inner{
    height: 32px;
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

::v-deep #content_mid_div .el-range-separator{
    display: flex;
    align-items: center;
    justify-content: center;
}

::v-deep #content_mid_div .el-icon-date{
    display: flex;
    align-items: center;
    justify-content: center;
}

::v-deep #content_mid_div .el-range__close-icon{
    display: flex;
    align-items: center;
    justify-content: center;
}

#grade_not_div{
    margin-top: 50px;
    width: 464px;
    height: 220px;
    opacity: 1;
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 12px 24px  rgba(178, 178, 178, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 32px 32px 32px;
}

#grade_not_top_div{
    margin-top: 20px;
    width: 100px;
    height: 28px;
    opacity: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#grade_not_top_img{
    width: 28px;
    height: 28px;
    opacity: 1;
    display: flex;
}

#grade_not_top_span{
    margin-left: 8px;
    width: 64px;
    height: 24px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(29, 33, 41, 1);
    text-align: left;
    vertical-align: middle;
}

#grade_not_mid_div{
    margin-top: 30px;
    width: 400px;
    height: 60px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.grade_not_mid_span{
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

#grade_not_bottom_button{
    margin-top: 30px;
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

</style>
