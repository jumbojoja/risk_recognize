<template >
    <div id="audiofakeDiv" >
        <img id="backImg" src="../assets/page2/back.png">

      
        <!-- <div id="titleDiv">
            <span id="titleSpan">语音伪造检测</span>
            <span id="introSpan">语音伪造检测可以检测一段语音是由深度合成技术伪造的还是真人发出的。近年来伪造检测算法的网络结构快速迭代，由阶段式处理（Two-stage）逐渐演变为端到端（End-to-end）形式，基于专家知识的音频特征逐渐被基于神经网络的特征所替代。我们兼顾数据与算法，构建适用于中英语种且能够应对不同伪造算法的检测模型 ，实现批量检测音频是否为深度伪造合成产物。</span>
        </div> -->

        <div id="titleDiv">
            <div id="titleSpan">语音伪造检测</div>

            <div id="titleDiv1">
                
                <button class="titlePageDiv_"   @click="toPage(1)">单次检测</button>
                <button class="titlePageDiv"   @click="toPage(2)">批量检测</button>
                <button class="titlePageDiv"   @click="toPage(3)">任务历史</button>
             
            </div>

            <div id="userIconDiv" @click="toPage(4)">
                    <img id="userIcon" src="../assets/user_page/user_icon.svg" >
            </div>
            <span id="introSpan">语音伪造检测可以检测一段语音是由深度合成技术伪造的还是真人发出的。近年来伪造检测算法的网络结构快速迭代，由阶段式处理（Two-stage）逐渐演变为端到端（End-to-end）形式，基于专家知识的音频特征逐渐被基于神经网络的特征所替代。我们兼顾数据与算法，构建适用于中英语种且能够应对不同伪造算法的检测模型 ，实现批量检测音频是否为深度伪造合成产物。</span>
       
        </div>

        <div id="testDiv">
            <img id="testbackImg" src="../assets/page2/uploadback.svg">
            <div id = "uploadDiv" >
                <span id="uploadSpan">上传2~10秒wav音频文件</span>
                <!-- <img id="uploadiconImg" src="../assets/page2/upload_icon.svg"> -->
                <el-upload
                    ref="my-upload"
                    class="upload-demo"
                    action="http://112.11.139.202:8090/receive_file"
                    multiple
                    :limit="1"
                    :headers="config"
                    :data="nick_name"
                    :before-upload="handleBefore"
                    :on-progress="handleProgress"
                    :on-exceed="handleExceed"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :show-file-list="false"
                    >
                    <el-button size="mid" class="uploadButton" type="primary" v-show="uploadSuccess==false"></el-button>
                </el-upload>
            </div>

            <span class="loadingSpan" v-show="uploadSuccess==false">准备中...</span>
            <span class="loadingSpan" v-show="uploadSuccess==true && doneSign==false">准备就绪</span>
            <span class="loadingSpan" v-show="uploadSuccess==true && doneSign==true">检测完成</span>

            <img class="detectImg" src="../assets/page2/test_not_icon.svg" v-show="uploadSuccess==false || loadingSign==true || doneSign==true" >
            <img class="detectImg2" src="../assets/page2/test_icon.svg" v-show="uploadSuccess==true && loadingSign==false && doneSign==false" @click="startTest">

            <span id="wavenameSpan" ref="wavenameRef">{{ wavefileName }}</span>

            <img id="deleteImg" ref="deleteimgRef" src="../assets/page2/delete_icon.svg"  v-show="uploadSuccess==true && loadingSign==false" @click="deleteAudio">
            
            <div id="loadDiv">
                <div id="loadbackDiv">
                </div>
                <div id="loadrecDiv">
                    <div class = "loadsmallDiv"  v-for=" (result_row, index) in loadList">
                            <div class="loadsmallImg" v-show="showlist.includes(index) || doneSign==true"></div>
                    </div>
                </div>
          

            </div>
        </div>

        <div id="resultDiv">
            <span id="resulttitleSpan">检测结果</span>
            <span id="resultwaveSpan" v-show="doneSign==true">{{ resultfileName }}</span>
            <span id="resulttimeSpan" v-show="doneSign==true">{{ resultTime }}</span>
            <span class="resultSpan" v-show="doneSign==true && resultDetect==0" >检测结果: 该音频文件存在深度伪造痕迹</span>
            <span class="resultSpan" v-show="doneSign==true && resultDetect==1">检测结果: 未检测到深度伪造痕迹</span>
            <span class="resultSpan" v-show="doneSign==true && resultDetect==-2">未检测到人声或音频质量过低</span>
            <span class="resultSpan" v-show="doneSign==true && resultDetect==3">请联系管理员增加检测次数</span>
            <span id="resultvaluetitleSpan" v-show="doneSign==true">置信度</span>
            <span id="resultvalueSpan" v-show="doneSign==true">{{ resultValue }}</span>

            <audio id="audio1"  ref="audio1" controls v-show="false" @ended="overAudio" @timeupdate="updateProgress">
                <source :src="src"  type="audio/wav" >
            </audio>
  
        </div>

        <!-- <div class="modelDiv" v-show="resultDetect==1"> -->
        <div class="modelDiv" v-show="wavShowSign==true && (resultDetect==0 || resultDetect==1)">
            <span class="model_span">检测详情</span>
            <div class="model_div_dvi">
                <p class="model_title">高质量音频检测模型(High-Quality Model)</p>
                <div class="confidence_div">
                    <div v-for="(item, index) in segmentResultList[1]" class="confidence_div_" :class="{'red_': item == '0', 'green_': item == '1', 'grey_': item == '2'}">{{segmentScoreList[1][index]}}</div>
                </div>
                <canvas ref="recorderGraph1" class = "model_img"></canvas>    
                <div class="slider-block">
                    <span class = "audio-progress">
                        <el-slider v-model="audioProgress1" :show-tooltip="false" @change="progressChange(1)"></el-slider>
                    </span>
                </div> 
                <span v-show="modelResultList[1]=='0'" class="model_result_" :style="{ color: 'red' }">该音频文件存在深度伪造痕迹，合计置信度{{modelScoreList[1]}}</span>
                <span v-show="modelResultList[1]=='1'" class="model_result_" :style="{ color: 'green' }">未检测到深度伪造痕迹，合计置信度{{modelScoreList[1]}}</span>
            </div>
            <div class="model_div_dvi">
                <p class="model_title">精简视角检测模型(Part-In Model)</p>
                <div class="confidence_div">
                    <div v-for="(item, index) in segmentResultList[0]" class="confidence_div_" :class="{'red_': item == '0', 'green_': item == '1', 'grey_': item == '2'}">{{segmentScoreList[0][index]}}</div>
                </div>
                <canvas ref="recorderGraph0" class = "model_img"></canvas>
                <div class="slider-block">
                    <span class = "audio-progress">
                        <el-slider v-model="audioProgress2" :show-tooltip="false" @change="progressChange(2)"></el-slider>
                    </span>
                </div> 
                <span v-show="modelResultList[0]=='0'" class="model_result_" :style="{ color: 'red' }">该音频文件存在深度伪造痕迹，合计置信度{{modelScoreList[0]}}</span>
                <span v-show="modelResultList[0]=='1'" class="model_result_" :style="{ color: 'green' }">未检测到深度伪造痕迹，合计置信度{{modelScoreList[0]}}</span>  
            </div>
            <div class="model_div_dvi">
                <p class="model_title">全视角检测模型(All-In Model)</p>
                <div class="confidence_div">
                    <div v-for="(item, index) in segmentResultList[2]" class="confidence_div_" :class="{'red_': item == '0', 'green_': item == '1', 'grey_': item == '2'}">{{segmentScoreList[2][index]}}</div>
                </div>
                <canvas ref="recorderGraph2" class = "model_img"></canvas>
                <div class="slider-block">
                    <!-- <button class="audioplayButton" v-show="doneSign==true && audioPlay==true" @click="playContent()">
                        <img class="audioplayImg" src="../assets/page1/audio_play.svg">
                    </button>
                    <button class="audioplayButton" v-show="doneSign==true && audioPlay==false" @click="playStopContent()">
                        <img class="audioplayImg" src="../assets/page1/audio_pause.svg">
                    </button> -->
                    <span class = "audio-progress">
                        <el-slider v-model="audioProgress3" :show-tooltip="false" @change="progressChange(3)"></el-slider>
                    </span>
                </div> 
                <span v-show="modelResultList[2]=='0'" class="model_result_" :style="{ color: 'red' }">该音频文件存在深度伪造痕迹，合计置信度{{modelScoreList[2]}}</span>
                <span v-show="modelResultList[2]=='1'" class="model_result_" :style="{ color: 'green' }">未检测到深度伪造痕迹，合计置信度{{modelScoreList[2]}}</span>
           
            </div>
        </div>
    </div>

</template>

<script>

export default{
    name: 'AudioFakeView',

    data(){
        return{
            wavefileName:"",
            uploadSuccess:false,
            doneSign:false,
            resultfileName:'',
            resultTime:'',
            resultDetect: 3,
            resultValue:'',
            audioPlay:true,

            loadingSign:false,

            
            loadList: Array.from({length: 44}),
            // showlistold:[-1,-2,-3,-4,-5,-6,-7,-8,-9],
            showlist:[-1,-2,-3,-4,-5,-6,-7,-8,-9],

            count:0,
            timer: null,

            file_path: "",
            nick_name: {},

            src:'',
          
            modelScoreList:[],
            modelResultList:[],
            segmentScoreList:[[],[],[]],
            segmentResultList:[[],[],[]],
            wavShowSign:false,

            // 播放进度条
            audioProgressCurrent:1,
            audioProgress1:0,
            audioProgress2:0,
            audioProgress3:0,
    

            wavPermissionSign: (JSON.parse(window.localStorage.getItem('access-admin')).permissions)['/audiotest']['options'].audio_info,


            // abortController: new AbortController() //用于取消请求
            cancelTokenSource: this.$axios.CancelToken.source(), // 用于取消请求

        }
    },

    methods:{
        handleProgress(event, file, fileList){
            console.log(`文件 ${file.name} 上传中，上传进度：${event.percent}%`);
            console.log(event.percent);
        },
        // 页面初始化
        initHtml:function () {
            console.log("当前屏幕分辨率: " + window.screen.width);
            console.log("当前屏幕分辨率: " + window.screen.height);
            var font_size = window.screen.width/1920.0*100;
            // if(window.screen.width<1920){
            //         font_size=100;
            // }
            if(window.screen.width<1280){
                    font_size=66;
            }
            // this.tableSize = font_size/100;
            document.documentElement.style.fontSize = font_size+'px';
            document.title = "深度合成语音伪造检测软件";

           
        },

             //跳转页面
        toPage:function (num){
            this.$refs['my-upload'].abort();
            if(num===2){
                this.$router.push('/pic_batch_test');
            }
            if(num===3){
                this.$router.push('/pic_history');
            }
            if(num===4){
                this.$router.push('/user');
            }
        },
        

        handleBefore(file) {
            this.nick_name.name = file.name;
            console.log(file.name)
            console.log(this.nick_name)
            const legalType = file.type === 'audio/wav';
            const legalSize = file.size / 1024 / 1024 < 100;
            if (!legalType) {
                this.wavefileName = '请上传音频文件!';
                console.log('请上传音频文件!');
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
            if (response.hasOwnProperty('dir')) {
                console.log('上传完成');
                this.uploadSuccess = true;
                this.wavefileName = file.name;
                this.file_path = response.dir;
            } else {
                this.file_path = "";
                this.$refs['my-upload'].clearFiles();
                this.uploadSuccess = false;
                this.wavefileName = "";  
                this.doneSign = false;
                this.resultfileName = "";
                this.resultTime = "";
                this.resultDetect = 1;
                this.resultValue = "";
                this.loadingSign = false;
                // alert(response.err);
                this.$alert(response.err,'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
            }
            // console.log(this.file_path);

            console.log(this.$refs['wavenameRef'].clientWidth);
        },

        handleError(info, file, fileList){
            if (info.status && info.status === 401) {
                console.log('token 验证失效!');
                this.$alert("登录失效",'提示',{confirmButtonText: '确定',callback: action => {this.$router.push('/login');}});
            }
            else{
                console.log('请求发生错误：', info);
            } 
        },

        //删除音频文件，同时清除结果
        deleteAudio:function (){
            this.delInit();
            // this.showlist = this.showlistold;
        },


        delInit(){
            this.$refs['my-upload'].clearFiles();
            this.uploadSuccess = false;
            this.wavefileName = "";  
            this.doneSign = false;
            this.resultfileName = "";
            this.resultTime = "";
            this.resultDetect = 3;
            this.resultValue = "";
            this.loadingSign = false;
            this.wavShowSign = false;

            var audio1 =document.querySelector('#audio1');
            this.$refs.audio1.src =  require("../static/audio/2.wav");
            audio1.load();

            if(this.timer){
                clearInterval(this.timer); // 清除定时任务
                this.timer = null;
            }
            console.log('定时器已经清除');
            for(let i = 0;i<this.showlist.length;i++){
                this.showlist[i] = i-9;
            }

        },


        startTest:function (){

            this.loadingSign = true;
            this.doneSign = false;

            for(let i = 0;i<this.showlist.length;i++){
                this.showlist[i] = i-9;
            }
            // console.log(this.showlist);
            
            this.timer = setInterval(() => {
                this.count++;
                // console.log('count:', this.count);
                for(let i = 0;i<this.showlist.length;i++){

                    this.showlist[i] = this.showlist[i]+1;
                    if(this.showlist[i]===44){
                        this.showlist[i]=0;
                    }
                    // console.log(this.showlist[i])
                    this.$forceUpdate();
                }
            }, 100);

           
            this.$axios.get('http://112.11.139.202:8090/detect_file', {params:{"dir":this.file_path}, headers:{
                "Authorization": JSON.parse(window.localStorage.getItem('access-admin')).token
            },cancelToken: this.cancelTokenSource.token}).then(res => {
                console.log(res.data);
                // 检测结果为真或假
                if(res.data.sign === 1){
                    this.resultTime = "文件时长: "+res.data.time;
                    this.resultDetect = parseInt(res.data.result);
                    this.resultValue = res.data.value;

                    console.log(res.data.model_score);
                    console.log(res.data.segment_score);

                    this.parseResult(this.file_path, res.data.time, res.data.result, res.data.model_score, res.data.segment_score);
 
                    this.resultfileName = "文件名："+this.wavefileName;
                    this.loadingSign = false;
                    this.doneSign = true;
                    this.audioPlay = true;
                    var audio1 =document.querySelector('#audio1');
                    this.$refs.audio1.src =new URL(res.data.url);
                    // this.$refs.audio1.src.searchParams.append('token', JSON.parse(window.localStorage.getItem('access-admin')).token);
                    audio1.load();
                    if(this.timer){
                        clearInterval(this.timer); // 清除定时任务
                        this.timer = null;
                    }
                    console.log('定时器已经清除');
                    for(let i = 0;i<this.showlist.length;i++){
                        this.showlist[i] = i-9;
                    }
                }
                // 检测次数不足
                else if(res.data.sign === -1){
                    this.$alert("剩余检测次数不足，请联系管理员增加次数",'提示',{confirmButtonText: '确定',  closeOnClickModal: false, showClose: false });
                    this.delInit();
                }
                // 静默
                else if(res.data.sign === -2){
                    this.resultTime = "文件时长: "+res.data.time;
                    if(res.data.result==="-2"){
                        this.resultDetect = -2;
                    }
                    this.resultfileName = "文件名："+this.wavefileName;
                    this.loadingSign = false;
                    this.doneSign = true;
                    this.audioPlay = true;
                    var audio1 =document.querySelector('#audio1');
                    this.$refs.audio1.src =new URL(res.data.url);
                    audio1.load();
                    if(this.timer){
                        clearInterval(this.timer); // 清除定时任务
                        this.timer = null;
                    }
                    console.log('定时器已经清除');
                    for(let i = 0;i<this.showlist.length;i++){
                        this.showlist[i] = i-9;
                    }
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
                if (this.$axios.isCancel(error)) {
                    console.log('请求被取消');
                } else {
                    if (error.response.status === 401) {
                        console.log('token 验证失效!');
                        this.$alert("登录失效",'提示',{confirmButtonText: '确定',callback: action => {this.$router.push('/login');}});
                    }
                    else{
                        console.log('请求发生错误：', error);
                    } 
                }
            }); 
        },

        
        playContent:function(){
            //暂停其他音频输出
            console.log('开始播放音频')
            var audio =document.querySelector('#audio1');
            audio.play();
            this.audioPlay = false;
        },

        // 暂停播放音频audio1
        playStopContent:function(){
            var audio =document.querySelector('#audio1');
            audio.pause(); //暂停
            this.audioPlay = true;
        },

        overAudio(){
            this.audioPlay=true;
        },

        updateProgress(){
            var currentTime = this.$refs.audio1.currentTime;
            // console.log(currentTime);

            if(this.audioProgressCurrent===1){
                this.audioProgress1 = currentTime*100/this.$refs.audio1.duration;
            }
            else if(this.audioProgressCurrent===2){
                this.audioProgress2 = currentTime*100/this.$refs.audio1.duration;
            }
            else{
                this.audioProgress3 = currentTime*100/this.$refs.audio1.duration;
            }
        },

        progressChange(index){
            // console.log('++++');
            // console.log(this.audioProgress);

            // this.audioProgress1 = 0;
            // this.audioProgress2 = 0;
            // this.audioProgress3 = 0;


            if (index===1){
                this.audioProgress2 = 0;
                this.audioProgress3 = 0;
                this.audioProgressCurrent=1;
                this.$refs.audio1.currentTime = this.$refs.audio1.duration*this.audioProgress1/100;
             
            }
            else if (index===2){
                this.audioProgress1 = 0;
                this.audioProgress3 = 0;
                this.audioProgressCurrent=2;
                this.$refs.audio1.currentTime = this.$refs.audio1.duration*this.audioProgress2/100;
              
            }
            else{
                this.audioProgress1 = 0;
                this.audioProgress2 = 0;
                this.audioProgressCurrent=3;
                this.$refs.audio1.currentTime = this.$refs.audio1.duration*this.audioProgress3/100;
              
            }

            // console.log('中间开始播放音频')
            var audio =document.querySelector('#audio1');
            audio.play();
            this.audioPlay = false;
        },

        // 解析结果
        parseResult(wavId, wavSecond, detectResult, modelScore, segmentScore){
            // wavSecond = 9.0;
            // detectResult = '1';
            // modelScore = '0.1643|0.7817|0.6523';
            // segmentScore = '0.6643|0.7817|0.6523,_,0.677|0.7608|0.6507';
            if(modelScore===""){
                return 
            }
      
            this.audioProgress1=0;
            this.audioProgress2=0;
            this.audioProgress3=0;

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
                this.wavShowSign = true;
                
            }).catch((error) => { 
                if (this.$axios.isCancel(error)) {
                    console.log('请求被取消');
                } else {
                    if (error.response.status === 401) {
                        console.log('token 验证失效!');
                        this.$alert("登录失效",'提示',{confirmButtonText: '确定',callback: action => {this.$router.push('/login');}});
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
            // if (!analyserContext) {
                // var canvas = document.getElementById("recorderGraph");
                // canvasWidth = canvas.width;
                // canvasHeight = canvas.height;
                // analyserContext = canvas.getContext('2d');
            // }
            // console.log(segmentResult);
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


   
    },
    created(){
        this.initHtml();
     
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer); // 清除定时任务
            this.timer = null;
        }
        console.log('定时器已经清除');
        this.cancelTokenSource.cancel('请求被取消');
        console.log('destory request');
    },
    computed: {
        config() {
            return { "Authorization": JSON.parse(window.localStorage.getItem('access-admin')).token};
        },
    },
    
}
</script>


<style scoped>

#userIconDiv{
    cursor: pointer;
    position: absolute;
    top:0px;
    left: 1700px;
    width: 50px;
    height: 50px;
    float: right;
}

#userIcon{
        position: absolute;
        right: 20px;
        top: 0px;
        width: 60px;
        height: 34px;
    }

.titlePageDiv{
    cursor: pointer;
    height:56px;
    width:470px;
    font-weight: 400;
    font-size: 16px;
    line-height: 47px;
    color: rgba(255, 255, 255, 0.8);
    background: none;
    padding: 0;
    border-width: 0;
    padding-bottom: 8px;
}

.titlePageDiv_{
    height:56px;
    width:470px;
    font-weight: 400;
    font-size: 16px;
    line-height: 47px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    background: none;
    padding: 0;
    border-width: 0;
    padding-bottom: 8px;
}

#titleSpan{
    height:56px;
    width:470px;
    font-weight: 700;
    font-size: 32px;
    line-height: 47px;
    color: #FFFFFF;
}

#titleDiv{
    position: absolute;
    left: 52px;
    top: 80px;
    width:700px;
    display: flex;
    justify-content: space-between;
}

#titleDiv1{
    width:400px;
    display: flex;
    justify-content: space-between;
}


#audiofakeDiv{
    position: relative;
    width: 100%;
    /* width: 1920px; */
    /* height: 1080px; */
    height: 1080px;
    /*小于min-width会出现横向滚动条*/
    min-width: 1220px;  
    margin-left: auto;
    margin-right: auto;
    /*margin: 必要，否则会有留边*/
    text-align: left;
    /*overflow:hidden超出div的图像会被裁剪掉*/
    overflow:hidden;
    font-family:"PingFang SC", "Microsoft yahei";
    font-style: normal;
}

#backImg{
    position: relative;
    width: 1920px;  
    height: 1080px;
}


#introSpan{
    position: absolute;
    left: 0px;
    top: 39px;
    height:198px;
    width:857px;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
}

#testDiv{
    position: absolute;
    left: 55px;
    top: 372px;
}

#testbackImg{
    position: absolute;
    left: 0px;
    top: 0px;
    height: 262px;
    width: 911px;
}

#resultDiv{
    position: absolute;
    left: 58px;
    top: 676px;
}



#uploadDiv{
    position: absolute;
    left: 258px;
    top: 23px;
    height: 58px;
    width: 370px;
}



#uploadSpan{
    position: absolute;
    left: 0px;
    top: 0px;
    height: 60px;
    width: 259px;
    font-weight: 400;
    font-size: 22px;
    line-height: 31px;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #00B3FF 5.23%, #33F3FF 40.1%, #7000FF 72.18%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  
}

.uploadButton{
    position: absolute;
    height: 58px;
    width: 370px;
    left: 0px;
    top: 0px;
    padding: 0px;
    border: none;
    background: inherit;
}

.loadingSpan{
    position: absolute;
    width: 100px;
    height: 31px;
    left: 78px;
    top: 82px;
    font-weight: 400;
    font-size: 22px;
    line-height: 31px;
    display: flex;
    align-items: center;
    color: #00FFF5; 
}

.detectImg{
    position: absolute;
    width: 144px;
    height: 79px;
    left: 46px;
    top: 106px;
}

.detectImg2{
    position: absolute;
    width: 144px;
    height: 79px;
    left: 46px;
    top: 106px;
    cursor: pointer;
}

#wavenameSpan{
    position: absolute;
    /* width: 300px; */
    max-width: 200px;
    height: 22px;
    left: 259px;
    top: 136px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#deleteImg{
    cursor: pointer;
    position: absolute;
    width: 13px;
    height: 13px;
    top: 140px;
    left: 465px;
}

.el-upload-list{
    display:none

}

#resulttitleSpan{
    position: absolute;
    width: 96px;
    height: 34px;
    top: 14px;
    left: 718px;
    font-weight: 400;
    font-size: 24px;
    line-height: 34px;
    color: #FFFFFF;
}

#resultwaveSpan{
    position: absolute;
    width: 200px;
    height: 43px;
    left: 56px;
    top: 101px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #0C0090;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#resulttimeSpan{
    position: absolute;
    width: 200px;
    height: 43px;
    left: 55px;
    top: 163px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #0C0090;
}

.resultSpan{
    position: absolute;
    width: 300px;
    height: 43px;
    left: 55px;
    top: 231px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #0C0090;

}

#resultvaluetitleSpan{
    position: absolute;
    left: 738px;
    top: 173px;
    width: 48px;
    height: 22px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #4AFFF6;
}

#resultvalueSpan{
    position: absolute;
    left: 729px;
    top: 199px;
    width: 68px;
    height: 25px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #4AFFF6;
    text-align: center;
}


.audioplayButton{
    /* position: absolute; */
    width: 20px;
    height: 20px;
    /* left: 602px;
    top: 113px; */
    background: inherit;
    padding: 0;
    border-width: 0;
}


.audioplayImg{
    /* position: absolute; 
    left: 0px;
    top: 0px; */
    height: 20px;
    width: 20px;
    padding-top: 8px;
}

#loadDiv{
    position: absolute;
    left: 250px;
    top: 172px;
    width: 641px;
    height: 34px;
    border: 0.75px solid #77E4EC;

}

#loadbackDiv{
    position: absolute;
    left: 7px;
    top: 7px;
    width:627px;
    height:20px;
    background: #77E4EC;
    opacity: 0.2;
    overflow: auto;
}

#loadrecDiv{
    position: absolute;
    left: 11px;
    top: 7px;
    width:627px;
    height:20px;
}



.loadsmallDiv{
    position:relative;
    top:0px;
    width:14px;
    height:20px;
    float: left;
     /* display: inline-block;   */
}

.loadsmallImg{
    position: absolute; 
    left: 2px;
    top: 2px;
    width:11px;
    height:16px;
    background: #77E4EC;
    box-shadow: 0px 0px 8.98px rgba(125, 255, 239, 0.95);
    opacity: 1;
}

.modelDiv{
    position: absolute;
    top: 180px;
    left: 1000px;
    width: 800px;
    height: 700px;
    display: flex;
    flex-direction: column;
}



.model_img{
    height: 60px;
    width: 800px;
    background-color: #000000a6;
}

.model_title{
    font-size: 18px;
    color: #77E4EC;
    font-weight: 700;
}

.model_span{
    font-weight: 700;
    font-size: 25px;
    color: white;
    margin-bottom: 20px;
}

.model_div_dvi{
    width: 800px;
    height: 200px;
    display: flex;
    flex-direction: column;
}

.confidence_div{
    width: 800px;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.confidence_div_{
    width: 100px;
    font-size: 15px;
    font-weight: 700;
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

.model_result_{
    font-size: 18px;
    font-weight: 600;
    /* margin-top: 10px; */
}



.confidence_div_c{
    width: 400px;
    font-size: 15px;
    font-weight: 700;
    color: green;
}

.confidence_div_e{
    width: 400px;
    font-size: 15px;
    font-weight: 700;
    color: red;
}

.model_result_c{
    font-size: 20px;
    font-weight: 700;
    color: green;
    margin-top: 10px;
}

.model_result_e{
    font-size: 20px;
    font-weight: 700;
    color: red;
    margin-top: 10px;
}

.slider-block{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  
}

.audio-progress{
    width: 800px;
}

/deep/ .el-slider__button-wrapper{
    top:-75px;
}

/deep/ .el-slider__button{
    width: 8px;
    height: 8px;
}

/deep/ .el-slider__runway{
    height: 3px;
}

/deep/ .el-slider__bar {
    height: 3px;
}

</style>