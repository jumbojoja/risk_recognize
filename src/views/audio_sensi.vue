<template >
    <div id="main">
        <div id="homo_div">
            <div id="navigation_div">
                <div id="navigation_title_div">
                    <span id="navigation_title">敏感内容检测</span>
                    <img id="navigation_img" src="../assets/home_page/separate_line.png">
                </div>
            </div>
            <div id="content_div">
                <div id="single_detect_div">
                    <div id="single_detect_top_div">
                        <div id="single_detect_top_left_div">
                            <img id="single_detect_top_left_img" src="../assets/home_page/icon1.png">
                            <span id="single_detect_top_left_span">单条检测</span>
                        </div>
                        <!-- <div id="single_detect_top_right_div">
                            <button :class="loadingSign?'single_detect_top_right_button_':'single_detect_top_right_button'" @click="startTest" :disabled="loadingSign">开始检测</button>
                        </div> -->
                    </div>
                    <div id="single_detect_bottom_div">
                        <span id="single_detect_bottom_span_1">上传待检测文件</span>
                        <div id="upload_div" v-show="upload_flag==true">
                            <div id="upload_left_div">

                                <el-button type="primary" @click="playAudio">
                                    试听
                                </el-button>
                            </div>
                            <el-upload
                                ref="my-upload"
                                class="upload-demo"
                                action="http://115.233.223.42:20008/audio/sensitive/one"
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
                                <button id="uploadButton" @click="handleFileSelect">上传音频</button>
                                <!-- <button id="uploadButton" @click="judge_login">立即上传</button> -->                               
                            </el-upload>
                            <!-- <button id="uploadButton" @click="handleFileSelect">上传音频</button> -->
                            <!-- <div>
                                <button id="uploadButton1" @click="playAudio">播放音频</button>
                            </div> -->
                        </div>
                        <div id="progress_div" v-show="upload_flag==false">
                            <span id="progress_span_1">{{ wavefileName }}</span>
                            <div id="progress_bottom_div">
                                <div id="progress_bottom_left_div">
                                    <div id="progress_bar_div">
                                        <div class = "loadsmallDiv"  v-for=" (result_row, index) in loadList">
                                            <div class="loadsmallImg" v-show="showList.includes(index)"></div>
                                        </div>
                                    </div>
                                    <span id="progress_span_2">{{ upload_progress }}</span>
                                </div>
                                <button id="reselection_button" @click="reselection_file">重新选择</button>
                            </div>
                        </div>
                        <span id="single_detect_bottom_span_2">支持wav、mp3等格式、长度大于2秒的音频文件</span>
                    </div>
                    <!-- <div id="detailed_result_div" v-show="doneSign==true"> -->
                    
                        <div id="content_top_div">
                                <img id="content_top_left_img" src="../assets/home_page/icon4.png">
                                <span id="content_top_left_span">{{buildTime}} 检测报告</span>
                            </div>
                            <div id="content_middle_div">
                                <div id="content_middle_top_div">
                                    <span id="content_middle_top_span">本次检测总得分</span>
                                    <div id="content_middle_top_bottom">
                                        <span id="content_middle_top_bottom_span">{{ all_score }}</span>
                                    </div>
                                </div>
                                <div id="content_middle_mid_div">
                                    <span id="content_middle_mid_span">本次检测综合得分 {{ all_score }}, 敏感音频标签：{{ tag }}, 音频名称：{{ audioName }}</span>
                                </div>
                                <div id="content_middle_bottom_div">
                        <!-- <div id="content_middle_bottom_top_div">
                            <span class="content_middle_bottom_span">检测日期</span>
                            <span class="content_middle_bottom_span">检测调用方式</span>
                            <span class="content_middle_bottom_span">文件数量</span>
                            <span class="content_middle_bottom_span">检测用时</span>
                            <span class="content_middle_bottom_span">伪造痕迹文件占比</span>
                        </div>
                        <div id="content_middle_bottom_bottom_div">
                            <span class="content_middle_bottom_span">{{ buildTime }}</span>
                            <span class="content_middle_bottom_span">网页上传</span>
                            <span class="content_middle_bottom_span">{{ dfNum }}</span>
                            <span class="content_middle_bottom_span">30s</span>
                            <span class="content_middle_bottom_span">{{ proportion }}</span>
                        </div> -->
                                </div>
                                <div id="table_div">
                                    <!-- <e-charts class="echarts-1" :option="option1"></e-charts> -->
                                    <e-charts class="echarts-1" :option="option2"></e-charts>
                                </div>
                                <input type="file" ref="audioInput" @change="handleFileUpload" style="opacity: 0;">
                                <!-- <button @click="handleFileSelect">选择音频文件</button>
                                <button @click="playAudio">播放音频</button> -->
                    </div>
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
                // user_grade_dict:{2: "企业用户", 3: "企业子账户", 4: "付费用户", 5: "体验用户"},
                all_score : 70,
                tag : "嘲讽",
                audioName: "test",
                user_grade_dict:{2: "体验用户", 3: "体验用户", 4: "体验用户", 5: "体验用户"},
                user_grade_num: 5,
                login_flag: true,
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

                showDropdown: false,
                hideTimer: null,
                consulting_flag: false,

                wavefileName:"",
                nick_name: {name: ""},
                upload_flag: true,
                upload_progress: "",
                feasible_detect: false,
                loadingSign:true,
                doneSign:false,
                loadList: Array.from({length: 41}),
                showList:[],
                audioPlay: true,
                resultDetect: 3,
                resultTime: '',
                resultValue:'',
                audioProgress:0.5,
                src:'',
                file_path: "",
                modelScoreList:[],
                modelResultList:[],
                segmentScoreList:[[],[],[]],
                segmentResultList:[[],[],[]],
                cancelTokenSource: this.$axios.CancelToken.source(),
                audioContext: null,
                audioBuffer: null,
                audioSource: null,
                audioFile: null
            }
        },
        methods:{
            handleFileSelect() {
            // this.$refs.audioInput.click()
            },
            handleFileUpload(event) {
             // 获取上传的音频文件
            this.audioFile = event.target.files[0]
            this.audioName = event.target.files[0].name
 
             // 创建新的音频上下文
            this.audioContext = new AudioContext()
 
            let reader = new FileReader()
            reader.onload = e => {
             let audioData = e.target.result
 
             // 解码音频数据
             this.audioContext.decodeAudioData(audioData, buffer => {
                  this.audioBuffer = buffer
                this.playAudio()
                }, error => {
                console.error('音频解码错误', error)
                })
            }
            reader.readAsArrayBuffer(this.audioFile)
            },
            playAudio() {
            // 停止正在播放的音频
            if (this.audioSource) {
             this.audioSource.stop()
            }
 
            // 创建音频源并开始播放
            this.audioSource = this.audioContext.createBufferSource()
            this.audioSource.buffer = this.audioBuffer
            this.audioSource.loop = false
            this.audioSource.connect(this.audioContext.destination)
            this.audioSource.start()
            },
            //跳转页面
            toPage:function (num){
                this.$refs['my-upload'].abort();
                // if(num===1){
                //     this.$router.push('/home');
                // }
                if(num===2){
                    this.$router.push('/history');
                }
                if(num===3){
                    this.$router.push('/batchtest');
                }
                if(num===4){
                    this.$router.push('/batchhistory');
                }
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
                localStorage.removeItem("access-admin");
                var this_ = this
                this.$axios.post('http://112.11.139.202:8090/login',{
                "email": this.usernameInput,
                "password": this.passwordInput,
                }).then(res=>{
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
                var this_ = this;
                console.log(this_.register_email);
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

            getModifyCode() {
                this.button_flag = true;
                var this_ = this
                setTimeout(function() {
                    this_.button_flag = false;
                }, 10000);
                this.$axios.get('http://112.11.139.202:8090/code',{params:{
                    "email":this_.usernameInput}
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
                    this.$alert("请检查输入");
                }
            },

            go_modify_password(){
                this.modify_password_flag = true;
            },

            log_out(){
                localStorage.removeItem("access-admin");
                this.login_flag = false;
                this.surplus_detect_times = 0;
                this.usernameInput = '';
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
                        if (error.response && error.response.status === 401) {
                            console.log('token 验证失效!');
                            this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                            this.login_flag = false;
                        }
                        else{
                            console.log('请求发生错误：', error);
                        } 
                    });
                }else{
                    this.$alert("请检查输入");
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

            handleProgress(event, file, fileList){
                // console.log(`文件 ${file.name} 上传中，上传进度：${event.percent}%`);
                let progress = Math.round((parseInt(event.percent)/100)*41);
                this.upload_progress = Math.floor(event.percent).toString() + "%";
                let len = this.showList.length;
                if ( len < progress){
                    for (;len < progress; len++){
                        this.showList.push(len);
                    }
                }
            },

            judge_login(){
                if(!this.login_flag){
                    this.$message({
                        message: '请先登录！',
                        center: true
                    });
                }
            },

            handleBefore(file) {
                this.upload_flag = false
                this.nick_name.name = file.name;
                const legalType = file.type === 'audio/wav';
                const legalSize = file.size / 1024 / 1024 < 100;
                if (!legalType) {
                    this.wavefileName = '请上传wav格式的音频文件!';
                    console.log('请上传wav格式的音频文件!');
                }
                if (!legalSize) {
                    this.wavefileName = '文件须小于100MB!';
                    console.log('请确保上传文件小于100MB!');
                }
                if (legalType && legalSize) {
                    this.wavefileName = '正在上传...';
                }
                return legalType && legalSize ;
            },

            //上传超过limit文件数时提示信息
            handleExceed(files, fileList) {
                this.wavefileName = '请上传一个音频文件！';
                console.log('当前限制上传 1 个文件');
            },

            handleSuccess(response, file, fileList){
                console.log(response)
                console.log(response.isoffensive)
                // if (response.hasOwnProperty('dir')) {
                //     console.log('上传完成');
                //     this.wavefileName = file.name;
                //     this.file_path = response.dir;
                //     this.feasible_detect = true;
                //     this.loadingSign = false;
                // } else {
                //     this.file_path = "";
                //     this.$refs['my-upload'].clearFiles();
                //     this.wavefileName = "";  
                //     this.doneSign = false;
                //     this.resultTime = "";
                //     this.resultDetect = 3;
                //     this.resultValue = "";
                //     this.$alert(response.err,'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                // }
                // console.log(this.$refs['wavenameRef'].clientWidth);
            },

            handleError(info, file, fileList){
                console.log(info);
                if (info.status && info.status === 401) {
                    console.log('token 验证失效!');
                    this.$alert("登录失效",'提示',{confirmButtonText: '确定'});
                    this.login_flag = false;
                }
                else{
                    console.log('请求发生错误：', info);
                } 
            },

            reselection_file() {
                this.delInit();
            },

            delInit() {
                this.$refs['my-upload'].clearFiles();
                this.upload_flag = true;
                this.showList = [];
                this.wavefileName = "";  
                this.resultDetect = 3;
                this.resultValue = "";
                this.resultTime = "";
                this.doneSign = false;
                this.loadingSign = true;
                this.feasible_detect = false;
            },

            updateProgress(){
                var currentTime = this.$refs.audio1.currentTime;
                this.audioProgress = currentTime*100/this.$refs.audio1.duration;
            },

            overAudio(){
                this.audioPlay=true;
            },

            progressChange(){
                this.$refs.audio1.currentTime = this.$refs.audio1.duration*this.audioProgress/100;

                // console.log('中间开始播放音频')
                var audio =document.querySelector('#audio1');
                audio.play();
                this.audioPlay = false;
            },

            play_audio(){
                this.audioProgress = 0;
                var audio =document.querySelector('#audio1');
                audio.play();
                this.audioPlay = false;
            },

            startTest:function (){

                if(!this.feasible_detect){
                    return
                }

                this.loadingSign = true;
                this.doneSign = false;

                this.$axios.get('http://112.11.139.202:8090/detect_file', {params:{"dir":this.file_path}, headers:{
                    "Authorization": JSON.parse(window.localStorage.getItem('access-admin')).token
                },cancelToken: this.cancelTokenSource.token}).then(res => {
                    console.log(res.data);
                    // 检测结果为真或假
                    if(res.data.sign === 1){
                        this.resultTime = res.data.time + 's';
                        this.resultDetect = parseInt(res.data.result);
                        this.resultValue = res.data.value;

                        // console.log(res.data.model_score);
                        // console.log(res.data.segment_score);

                        this.parseResult(this.file_path, res.data.time, res.data.result, res.data.model_score, res.data.segment_score);

                        this.loadingSign = false;
                        this.doneSign = true;
                        this.audioPlay = true;
                        var audio1 =document.querySelector('#audio1');
                        this.$refs.audio1.src =new URL(res.data.url);
                        audio1.load();
                    }
                    // 检测次数不足
                    else if(res.data.sign === -1){
                        this.$alert("剩余检测次数不足，请联系管理员增加次数",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                        this.delInit();
                    }
                    // 静默
                    else if(res.data.sign === -2){
                        this.resultTime = res.data.time + 's';
                        if(res.data.result==="-2"){
                            this.resultDetect = -2;
                        }
                        this.loadingSign = false;
                        this.doneSign = true;
                        this.audioPlay = true;
                        var audio1 =document.querySelector('#audio1');
                        this.$refs.audio1.src =new URL(res.data.url);
                        audio1.load();
                    }
                    // 后台繁忙
                    else if(res.data.sign === 0){
                        this.$alert("后台繁忙，请稍后再上传检测",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                        this.delInit();
                    }
                    else{
                        this.$alert("检测异常，请稍后再试",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                        this.delInit();
                    }
                }).catch((error) => {
                    console.log(error);
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } else {
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

            // 解析结果
            parseResult(wavId, wavSecond, detectResult, modelScore, segmentScore){
                if(modelScore===""){
                    return 
                }

                this.audioProgress=0;

                if (detectResult=='0' || detectResult=='1'){

                    this.modelScoreList = [];
                    this.modelResultList = [];
                    this.segmentScoreList = [[],[],[]];
                    this.segmentResultList = [[],[],[]];

                    var modelScoreSplit = modelScore.split('|').map(parseFloat);
                    for(let i = 0;i<modelScoreSplit.length;i++){
                        this.modelScoreList.push(((modelScoreSplit[i]*100).toFixed(1)).toString()+'%');
                        if (modelScoreSplit[i]>=0.56305){
                            this.modelResultList.push('1');
                        }
                        else{
                            this.modelResultList.push('0');
                        }
                    }

                    let segmentScoreSplit = segmentScore.split(',').map(group => group.split('|'));

                    for(let i = 0;i<segmentScoreSplit.length;i++){
                        if (segmentScoreSplit[i].length==1){
                            for(let j = 0;j<this.segmentScoreList.length;j++){
                                this.segmentScoreList[j].push('静默片段');
                                this.segmentResultList[j].push(2);
                            }
                        }
                        else{
                            for(let j = 0;j<this.segmentScoreList.length;j++){
                                this.segmentScoreList[j].push(((parseFloat(segmentScoreSplit[i][j])*100).toFixed(1)).toString()+'%');
                                if(parseFloat(segmentScoreSplit[i][j])>=0.56305){
                                    this.segmentResultList[j].push(1);
                                }
                                else{
                                    this.segmentResultList[j].push(0); 
                                }
                            
                            }
                        }
                    }
            
                this.$axios.post('http://112.11.139.202:8090/audio_info', {"audio": wavId},
                {headers:{Authorization:JSON.parse(window.localStorage.getItem('access-admin')).token},cancelToken: this.cancelTokenSource.token}).then(res => {
                    var wavList = res.data.result;
                    var duration = res.data.duration;
                    this.drawAnalysers(wavList, duration, this.$refs.recorderGraph0, this.segmentResultList[0]);
                    this.drawAnalysers(wavList, duration, this.$refs.recorderGraph1, this.segmentResultList[1]);
                    this.drawAnalysers(wavList, duration, this.$refs.recorderGraph2, this.segmentResultList[2]);
                    // this.wavShowSign = true;
                    
                }).catch((error) => {
                    if (this.$axios.isCancel(error)) {
                        console.log('请求被取消');
                    } else {
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
                // var wavList = [-0.022246173, 0.011611759, -0.05370667, -0.4023055, 0.09318283, 0.01346108, -0.20841943, -0.04426442, 0.1304785, 0.0085333735, -0.11419595, -0.33498338, 0.110507995, 0.08962531, 0.19694279, -0.06562919, -0.56299454, -0.29372886, -0.6690906, -0.011255204, -0.45235896, -0.7089376, 0.22364804, 0.0027838948, -0.025959486, -0.0043266946, -0.0811679, -0.027576651, -0.03161356, 0.01949848, 0.5155589, -0.12418827, 0.4795956, -0.15993853, -0.22751977, -0.22109494, -0.1060967, 0.035303336, -0.6102198, -0.12642524, -0.16223772, -0.10703121, -0.32384285, 0.025898404, 0.02527695, -0.013373915, 0.024050113, 0.14224999, -0.1397198, -0.032619476, -0.027883029, 0.07436792, -0.15753336, -0.05574234, -0.047629457, 0.024940083, -0.1656023, 0.05916476, -0.00083302817, -0.16593757, -0.4681193, -0.45496586, 0.7543579, -0.19359094, 0.44639364, -0.09724937, 0.17354281, 0.053043097, -0.046571057, -0.023367798, -0.03117497, -0.0139728375, -0.019479102, -0.015079327, -0.019302024, -0.01589992, -0.01506739, 0.0071050227, -0.04424524, -0.25900644, -0.19256662, -0.016360302, -0.3641906, 0.040349577, 0.13288902, -0.04675888, -0.033523772, -0.061976973, 0.25384143, 0.096267655, -0.042307384, -0.010448433, -0.020133872, -0.013776709, -0.006103396, -0.41704047, -0.1745431, 0.13834895, -0.05574378, -0.084530264, -0.21794596, 0.11701309, -0.37906465, 0.25174135, 0.09065254, 0.4603746, -0.118306555, -0.018703965, -0.080901586, -0.13643663, -0.016743781, 0.015752563, -0.00070809637, -0.04747053, -0.07718118, -0.02747581, -0.017851673, 0.12641785, -0.08603949, -0.010927743, -0.1655548, -0.014623714, -0.020055572, -0.012050385, -0.018188404, -0.016600747, -0.017886665, -0.016245417, -0.01833934, -0.012603338, 0.01022908, -0.008443419, -0.07382443, 0.0010843878, 0.030520104, 0.082391605, -0.09593186, -0.024630273, -0.008321998, -0.005350738, -0.0047083814, -0.012436866, -0.30434725, -0.14593787, 0.5061729, 0.3864308, 0.031651154, -1.0, -0.86939895, -0.28691396, 0.06743252, 0.16672195, 0.1201106, 0.007462227, -0.38210416, 0.19509396, 0.18545164, -0.053662535, -0.06463848, -0.08617498, 0.04061794, 0.0847164, -0.15281376, -0.6316695, -0.69431895, -0.17815928, 0.04168138, 0.026829274, 0.020352995, -0.46438143, -0.34329334, -0.044749428, -0.07876679, -0.11954256, -0.019335352, -0.061995354, 0.179568, 0.33147722, -0.64587694, 0.2315255, -0.021259181, 0.020924427, -0.09235561, 0.034379363, 0.027836936, -0.007748355, 0.030973041, 0.56064636, 0.17388242, 0.33115163, 0.16076663, -0.05822947, -0.04528648, -0.046235893, -0.08603346, -0.0025879585, -0.021320423, 0.12273774, -0.044396415, -0.061056178, -0.01400491, -0.02460389, -0.09555996, -0.02129475, 0.30319104, -0.27934855, 0.09611069, 0.064011954, -0.11522971, 0.12150216, -0.017190224, -0.04125598, 0.015163995, 0.050604694, -0.40619195, -0.20048875, -0.035022065, 0.19989926, -0.021430718, 0.13431245, -0.050596125, -0.122662224, 0.05229644, -0.012750457, -0.015356896, -0.032260243, -0.10022549, -0.14161752, 2.7899923e-05, -0.008828423, -0.024751686, -0.024552984, -0.01693687, -0.026138028, -0.015755536, -0.014386184, 0.0028216604, 7.131624e-05, -0.029763974, -0.012021412, 0.11751977, -0.044745978, -0.036512975, -0.03258768, -0.0072333934, -0.00020256467, -0.011882081, -0.01831702, -0.03713879, -0.016334008, -0.010900285, -0.012831701, -0.01851082, -0.016903883, -0.012712231, -0.034238413, 0.044287097, -0.46729448, 0.1340956, 0.3202244, 0.8455946, -0.17517197, 0.2968125, 0.008604911, -0.025975645, -0.010275997, 0.5660417, 0.31616017, -0.0055145207, 0.53740245, -0.1560013, 0.23661835, 0.23091905, 0.16511597, 0.22231974, -0.19164442, -0.08304534, -0.05940441, -0.055358954, 0.024487115, -0.070718944, -0.014597155, -0.15836081, 0.06292137, -0.5149769, -0.24988021, 0.0011440063, -0.09837059, -0.39546764, 0.033209115, 0.22351755, 0.029111082, -0.0005899162, 0.1611365, -0.016486298, -0.010146262, -0.061796013, -0.03718756, -0.0049191113, -0.02876424, -0.011671463, -0.026378404, -0.022240676, -0.019263646, -0.016989633, -0.014824461, -0.01712784, -0.01425657, -0.016671969, -0.017766241, -0.015761795, -0.017420989, -0.017549464, -0.01274932, -0.030792043, 0.03261959, 0.0001150285, -0.06555211, -0.0011427718, -0.07931883, 0.0024487653, 0.20244423, -0.37138918, -0.26152948, -0.31558365, -0.13910665, 0.00627878, -0.088693164, 0.00404736, 0.04022622, -0.16302012, -0.007569159, 0.19125548, -0.0037068941, -0.023448482, -0.030331375, -0.007535782, -0.12419071, 0.46847737, -0.33349758, 0.20532286, 0.1571543, 0.23627831, -0.37919062, -0.03556691, -0.34590048, -0.15708666, 0.2849162, 0.06429425, -0.04888467, -0.090760395, -0.052791774, -0.053488474, 0.09467086, -0.12786408, -0.400782, -0.45321342, 0.13558626, 0.18260539, 0.31561202, -0.25833464, 0.0049280664, -0.000391058, 0.19637582, -0.051447798, 0.09744365, 0.055986695, -0.0785416, -0.027800778, 0.006538818, -0.034417395, -0.14190827, 0.08957354, -0.058137514, 0.029597221, -0.004014915, -0.0068756756, -0.00277232, 0.0014836731, 0.013927086, -0.0074593723, -0.021141745, 0.0058248877, -0.016252773, -0.015690276, -0.033642232, -0.24379133, -0.25047553, -0.19445361, 0.1725569, -0.09857271, 0.09006389, -0.06449417, -0.056784075, -0.03928091, 0.037808754, -0.009960216, -0.06953942, -0.084292665, 0.091348454];
                // // param: wavId
                // // res=> {
                // //     this.drawAnalysers(wavList, wavSecond, this.$refs.recorderGraph0, this.segmentResultList[0]);
                // //     this.drawAnalysers(wavList, wavSecond, this.$refs.recorderGraph1, this.segmentResultList[1]);
                // //     this.drawAnalysers(wavList, wavSecond, this.$refs.recorderGraph2, this.segmentResultList[2]);
                // // }
                // this.drawAnalysers(wavList, wavSecond, this.$refs.recorderGraph0, this.segmentResultList[0]);
                // this.drawAnalysers(wavList, wavSecond, this.$refs.recorderGraph1, this.segmentResultList[1]);
                // this.drawAnalysers(wavList, wavSecond, this.$refs.recorderGraph2, this.segmentResultList[2]);

                }
            },
            // 绘制波形图
            drawAnalysers(waveData, waveLength, canvas, segmentResult) {
                var canvasWidth = canvas.width;
                var canvasHeight = canvas.height;
                var analyserContext = canvas.getContext('2d');
                var numBars = 400;
                var numDiv = parseInt(numBars/waveLength*4);
                var SPACING = canvasWidth / numBars;
                var BAR_WIDTH = SPACING;
                var freqByteData = waveData;
                analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
                var segmentColorList = ["red","green","gray"];
                var segmentIndex = 0;
                var segmentColor = segmentColorList[segmentResult[segmentIndex]];

                for (var i = 0; i < freqByteData.length; ++i) {
                    var magnitude = 0;
                    magnitude = freqByteData[i]*canvasHeight/2;
                    if (i%numDiv == 0 && i!==0){
                        segmentIndex++;
                        if (segmentIndex<segmentResult.length){
                            segmentColor = segmentColorList[segmentResult[segmentIndex]];
                        }
                    }
                    analyserContext.fillStyle = segmentColor;
                    analyserContext.fillRect(i * SPACING, canvasHeight/2, BAR_WIDTH, -magnitude); 
                }
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

            consulting(){
                this.consulting_flag=true;
            },

            cancel_consulting_div(){
                this.consulting_flag=false;
            },

            initHtml:function () {
                console.log("当前屏幕分辨率: " + window.screen.width);
                var font_size = window.screen.width/2560*100;
                if(window.screen.width<1920){
                        font_size=100;
                }
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
                        if (error.response && error.response.status === 401) {
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
        config() {
            if (localStorage.getItem("access-admin") !== null){
                return { "Authorization": JSON.parse(window.localStorage.getItem('access-admin')).token};
            }
        },

        option2(){
                return{
                    // textStyle: {
                    //     color: '#fff'
                    // },
                
                    title: {
                        text: '敏感标签分布图',
                        left: 'center', // 标题水平居中
                        top: 'bottom', // 图例在底部
                        // textStyle: {
                        //     color: '#fff', // 设置标题颜色为橙色
                        // }
                    },
                

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                        type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        top:'3%',
                        bottom: '12%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                        type: 'category',
                        /* data: ['0~0.1', '0.1~0.2', '0.2~0.3', '0.3~0.4', '0.4~0.5', '0.5~0.6','0.6~0.7','0.7~0.8','0.8~0.9', '0.9~1.0'], */
                        data: ['恐怖', '威胁', '嘲讽', '粗鲁', '责怪', '辱骂','-','-','-', '-'],
                        axisTick: {
                            alignWithLabel: true
                        }
                        }
                    ],
                    // yAxis: [
                    //     {
                    //     type: 'value'
                    //     }
                    // ],
                    yAxis: {
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                    series: [
                        {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.scoreChartList, 
                        itemStyle: {
                        color: function(params) {
                            var colorList=['#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00', '#CCFF00', '#99FF00', '#66FF00', '#33FF00'];
                            return colorList[params.dataIndex];
                        }}
                        }
                    ]
                };
            },
        /* mounted(){
	        window.addEventListener('hashchange',()=>{
		        var currentPath = window.location.hash.slice(1); // 获取输入的路由
		        if(this.$router.path !== currentPath){
			        this.$router.push(currentPath); // 动态跳转
		        }
	        },false);
        } */

    },
    }
</script>
 

<style scoped>

#main{
    width: 100%;
    /* min-width: 1920px; */
    background-color: #f3f7ff;
    display: flex;
    justify-content: center;
    align-items: center;
}

#homo_div{
    /* width: 1920px; */
    width: 100%;
    /* min-width: 1920px; */
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
    height: 140px;
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

#uploadButton1{
    margin-left: 0px;
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

::v-deep .el-message {
    font-size: 14px; /* 设置提示框中文字的大小 */
    padding: 10px 15px; /* 设置提示框的内边距 */
    border-radius: 4px; /* 设置提示框的圆角 */
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
    width: 600px;
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

#content_middle_div{
    margin-top: 52px;
    width: 1144px;
    height: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#content_middle_top_div{
    width: 1144px;
    height: 186px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#content_middle_top_span{
    width: 140px;
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

#content_middle_top_bottom{
    margin-top: 16px;
    width: 142px;
    height: 142px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/report_page/score_back.png") ;
    background-repeat: no-repeat;
}

#content_middle_top_bottom_span{
    width: 58px;
    height: 56px;
    opacity: 1;
    font-size: 48px;
    font-weight: 600;
    letter-spacing: 0px;
    line-height: 56px;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    vertical-align: top;
}

#content_middle_mid_div{
    margin-top: 25px;
    width: 1144px;
    height: 60px;
    opacity: 1;
    background: rgba(238, 245, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
}

#content_middle_mid_span{
    width: 462px;
    height: 22px;
    opacity: 1;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(22, 93, 255, 1);
    text-align: center;
    vertical-align: top;
}

#content_middle_bottom_div{
    margin-top: 25px;
    width: 1144px;
    height: 92px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    opacity: 1;
}

#content_middle_bottom_top_div{
    width: 1144px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#content_middle_bottom_bottom_div{
    width: 1144px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(242, 243, 245, 1);
}

#content_top_left_span{
    margin-left: 16px;
    width: 600px;
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

#table_div{
    margin-top: 25px;
    width: 1144px;
    height: 227.3px;
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>
