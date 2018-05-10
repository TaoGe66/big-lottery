<template>
  <section class="home" :class="typeTab=='GAME'?'gameType':(typeTab=='TD'?'lotteryType':'remoteType')">
    <header class="header" :class="typeTab=='GAME'?'gameType':(typeTab=='TD'?'lotteryType':'remoteType')">
      距离<span>{{startInfo.issueNumber}}</span>期截止时间还剩<span>{{timeContent}}</span><span style="color: white;margin-left: 10px;" v-show="typeTab=='TD'">奖池金额{{lotteryPrice}}亿</span><img class="head_img" src="./title_jindou.png" alt="" v-show="typeTab=='GAME'"><span style="float: right;color: white;" v-show="kjNum">第{{oldInfo[0].issueNumer}}期开奖结果 <div class="old_num" v-for="itemOld in oldInfo[0].bonusCode.red">{{itemOld}}</div><div class="old_num_blue" v-for="itemBlue in oldInfo[0].bonusCode.blue">{{itemBlue}}</div></span>
    </header>
    <!--左侧操作-->
    <div class="left">
      <div v-title>大乐透主页面</div>

      <!--选号区-->
      <div class="box">
        <ul class="head">
          <li v-for="(item,index) in redBall" @click="chooseRed(index,item)" :style="{background:redBallArrIdex.indexOf(index)==-1?'#ecd6fa':'#ff51aa',color:redBallArrIdex.indexOf(index)==-1?'red':'white'}" >{{item}}</li>
        </ul>
        <ul class="head">
          <li v-for="(item,index) in blueBall" @click="twoChooseRed(index,item)" :style="{background:blueBallArrIdex.indexOf(index)==-1?'#ecd6fa':'#5d83fe',color:blueBallArrIdex.indexOf(index)==-1?'blue':'white'}" >{{item}}</li>
        </ul>
        <p class="betting_demo" v-show="typeTab=='GAME'">您选了<span> {{betsNum}} </span>注，共<span> {{betsNum*2*times*100}} </span>金豆</p>
        <p class="betting_demo" v-show="typeTab=='TD'">您选了<span> {{betsNum}} </span>注，共<span> {{betsNum*2*times*100}} </span>积分</p>
      </div>

      <!--票池-->
      <div class="show_select">
        <el-table
          :data="tableData"
          :class="typeTab=='GAME'?'gameType':(typeTab=='TD'?'lotteryType':'remoteType')"
          style="width: 100%"
          height="327">
          <el-table-column type="index" width="100" label="序号" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="playType" label="单/复式" width="150" header-align="center" align="center">
            <template slot-scope="scope">
              {{scope.row.playType === 1 ? "单选" : (scope.row.playType === 2 ? "复式" : "胆拖")}}
            </template>
          </el-table-column>
          <el-table-column prop="redBall" label="红球号码" header-align="center" align="center">
            <template slot-scope="scope">
              {{scope.row.redBall | numberBall}}
            </template>
          </el-table-column>
          <el-table-column prop="blueBall" label="蓝球号码" header-align="center" align="center">
            <template slot-scope="scope">
              {{scope.row.blueBall | numberBall}}
            </template>
          </el-table-column>
          <el-table-column prop="multiple" label="倍数" width="150" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="investCount" label="注数" width="150" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="money" :label="typeTab=='GAME'?'金豆':'积分'" width="150" header-align="center" align="center">
            <template slot-scope="scope">
              {{scope.row.money*100}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button @click="deleteOne(scope.row,scope.$index)" type="text" size="medium">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--右侧操作-->
    <div class="right" :class="typeTab=='GAME'?'gameType':(typeTab=='TD'?'lotteryType':'remoteType')">
      <img style="width: 200px" src="./jindouDLT.png" alt="" v-show="typeTab=='GAME'">
      <p class="random_lottery" @click="Rondom" :class="typeTab=='GAME'?'gameType_btn':(typeTab=='TD'?'lotteryType_btn':'remoteType_btn')">机选一注</p>
      <div>
        投 <span class="reduce" :class="typeTab=='GAME'?'gameType_btn':(typeTab=='TD'?'lotteryType_btn':'remoteType_btn')" @click="reduce()">－</span><input type="number" class="times" v-model="times" :class="typeTab=='GAME'?'gameType':(typeTab=='TD'?'lotteryType':'remoteType')"><span class="add" @click="add()" :class="typeTab=='GAME'?'gameType_btn':(typeTab=='TD'?'lotteryType_btn':'remoteType_btn')">＋</span> 倍
      </div>
      <p class="max_add" @click="maxAdd()" :class="typeTab=='GAME'?'gameType_btn':(typeTab=='TD'?'lotteryType_btn':'remoteType_btn')">99倍</p>
      <!--<p class="dancing_drag" @click="showDanTuo">胆拖</p>-->
      <p class="add_lottery" @click="addLottery" :class="typeTab=='GAME'?'gameType_btn':(typeTab=='TD'?'lotteryType_btn':'remoteType_btn')">确认选号</p>
    </div>

    <!--底部-->
    <footer :class="typeTab=='GAME'?'gameType':(typeTab=='TD'?'lotteryType':'remoteType')">
      <button @click="deleteAll" class="delete_all" :class="typeTab=='GAME'?'gameType_btn':(typeTab=='TD'?'lotteryType_btn':'remoteType_btn')">清空选号</button><span class="sub_btn" @click="subAll" v-show="submitBtn1" :class="{isSub_btn,isSub_btn_red}">提交订单</span><span class="sub_btn2" v-show="submitBtn2">提交订单</span><p class="footer_text">共计金额：<span v-show="typeTab=='GAME'">{{totalPrice*100}} 金豆</span><span v-show="typeTab=='TD'">{{totalPrice*100}} 积分</span></p>
    </footer>

    <!--投注截止时间到弹窗-->
    <div class="login-wrap" v-show="model">
      <div class="bg_model">
        <div class="ms-login">
          <p class="model_tips">温馨提示</p>
          <p class="model_content">本期时间已截止</p>
          <p class="model_btn" @click="modelHide()">确定</p>
        </div>
      </div>
    </div>
    <!--切换模式弹窗-->
    <div class="login-wrap" v-show="typeTabModel">
      <div class="bg_model">
        <div class="ms-login">
          <p class="model_tips">温馨提示</p>
          <p class="model_content">当前模式已经切换</p>
          <p class="model_btn" @click="typeTabModelHide()">确定</p>
        </div>
      </div>
    </div>
    <!--加载中tips-->
    <div class="load_tips" v-show="loadTips">正在加载中...</div>
  </section>
</template>

<script>
  export default{
    data(){
      return{
        typeTab:'GAME',
        uid:'',
        deviceNo:'',
        kjNum: true,
        awardcode:['01','02','03','04','05','06','07'],
        redBall:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35'],
        blueBall:['01','02','03','04','05','06','07','08','09','10','11','12'],
        startInfo:[],  //获取开奖数据
        newPid:'',  //获取最新期次
        oldInfo:[{
          issueNumer:'', //获取历史开奖期号
          is_empty:'',
          bonusCode:{
            red:[],
            blue:[],
          },
        }],  //获取历史开奖数据
        lotteryPrice:'',  //奖池总金额
        tableData: [], //添加进入票池数据
        redBallArr:[],
        blueBallArr:[],
        redBallArrIdex:[],
        blueBallArrIdex:[],
        redBallRondom:[],
        blueBallRondom:[],
        betsNum:0,
        times:1,
        totalPrice:0,
        isSub_btn:true,
        isSub_btn_red:false,
        model:false,
        typeTabModel:false,
        loadTips:false,
        redBallLen:0, //红球选择长度
        blueBallLen:0, //蓝球选择长度
        row:'',
        index:'',
        timeContent:'',  //倒计时载体
        submitBtn1:true,
        submitBtn2:false,
      }
    },
    created(){
      let _this = this;
      // 获取query参数
      this.GetRequest();
      this.query();
      setInterval(function () {
        _this.getInfo();
      },60000*30);
      setInterval(function () {
        _this.getType();
      },2000)
    },
    methods:{
      // 获取query参数
      GetRequest(){
        this.uid = this.$route.query.uid;
        this.deviceNo = this.$route.query.deviceNo;
//        console.log(this.uid);
//        console.log(this.deviceNo);
//        alert(this.uid);
//        alert(this.deviceNo);
      },
      //查询期号和开奖时间
      query(){
//        console.log("________________ffffdf_________________");
        let _this = this;
        let params = {
          deviceNo: this.deviceNo,
//          deviceNo: '0123456789ABCDE2',
        };
        _this.startInfo = [];
        _this.$http.post('/dlt/queryIssueInfo',params).then((res)=>{
//          console.log(res.data.data);
          _this.startInfo = res.data.data;
          _this.typeTab = res.data.data.type;
//          console.log(_this.startInfo);
          _this.lotteryPrice = _this.startInfo.poolMoney.toFixed(2);
          localStorage.setItem("localTypeTab",_this.typeTab);
          _this.getInfo();
          _this.addTime();
        },(err)=>{
          console.log(err);
        });
      },
      //获取历史开奖信息
      getInfo(){
        let _this = this;
        let cparams = {
          listNumber:1,
          lotteryId:"dlt",
        };
        _this.$http.post('/dlt/queryDltAwardNumberList',cparams).then((res)=>{
//          console.log(res);
          if(res.data.code == 10000){
            _this.oldInfo = res.data.data;
            if(_this.oldInfo[0].is_empty == 1){
              _this.oldInfo[0].bonusCode.red = ['--','--','--','--','--'];
              _this.oldInfo[0].bonusCode.blue = ['--','--'];
            }
          }
        },(err)=>{
          console.log(err);
        });
      },
      //获取模式
      getType(){
        let _this = this;
        let params = {
          deviceNo: this.deviceNo,
//          deviceNo:'0123456789ABCDE2',
        }
//        _this.$http.post('http://v3api.hcb66.com/device/mode/query',params).then(function (res) {
        _this.$http.post('http://dev.hcb66.com:7300/device/mode/query',params).then(function (res) {
//          console.log(res.data);
          if(res.data.status == 10000){
            _this.typeTab = res.data.data;
            let localTypeTab = localStorage.getItem("localTypeTab");
            if(localTypeTab == _this.typeTab){
              _this.typeTabModel = false;
//              _this.model = false;
            }else {
              _this.typeTabModel = true;
              localStorage.setItem("localTypeTab",_this.typeTab);
              setTimeout(function () {
                _this.typeTabModel = false;
//                _this.model = false;
              },5000)
            }
          }
        },function (err) {
          console.log(err);
        })
      },

      // 点击第一行红球
      chooseRed(index,item){
        if(this.redBallArr.indexOf(item)==-1){
          this.redBallArr.push(item);
          this.redBallArrIdex.push(index);
        }else{
          this.redBallArr.splice(this.redBallArr.indexOf(item),1);
          this.redBallArrIdex.splice(this.redBallArrIdex.indexOf(index),1);
        }
        this.redBallLen = this.redBallArrIdex.length;
      },
      // 点击第二行蓝球
      twoChooseRed(index,item){
        if(this.blueBallArr.indexOf(item)==-1){
          this.blueBallArr.push(item);
          this.blueBallArrIdex.push(index);
        }else{
          this.blueBallArr.splice(this.blueBallArr.indexOf(item),1);
          this.blueBallArrIdex.splice(this.blueBallArrIdex.indexOf(index),1);
        }
//        console.log(this.blueBallArr);
        this.blueBallLen = this.blueBallArrIdex.length;
      },
      //添加选择进入票池
      addLottery(){
        let params = {
          playName: 1,  //玩法方式，暂无追号
          playType: '',  //单选1 or 复选2 or 胆拖5
          redBall: '',
          blueBall: '',
          multiple: '',  //倍数
          investCount: '',  //注数
          money: '',  //单注积分
        };
        if(this.redBallLen<5||this.blueBallLen<2){
          this.$message.error({
            showClose: true,
            message: '请至少选择一注',
          });
        }else {
          if(this.redBallLen>5||this.blueBallLen>2){
            params.playType = 2;
          }else {
            params.playType = 1;
          }
          if(this.times == 0||this.times == ''){
            this.times = 1;
          }
          params.multiple = this.times;
          params.redBall = this.redBallArr;
          params.blueBall = this.blueBallArr;
          params.money = this.betsNum*2*this.times;
          params.investCount = this.betsNum;
          console.log(this.times);
          if(params.money < 20000){
            this.tableData.unshift(params);
            this.redBallArr = [];
            this.blueBallArr = [];
            this.redBallArrIdex = [];
            this.blueBallArrIdex = [];
            this.redBallLen = 0;
            this.blueBallLen = 0;
//            this.betsNum = 0;
            this.times = 1;
            this.totalPrice += params.money;
            this.isSub_btn = false;
            this.isSub_btn_red = true;
          }else {
            this.$message.error({
              showClose: true,
              message: '单注积分不能超过200万',
            });
          }
          console.log(this.tableData);
        }
      },
      subAll(){
        let _this = this;
//        console.log(_this.tableData);
        let params = {
          playName: 1,  //玩法方式，暂无追号
          playType: '',  //单选1 or 复选2 or 胆拖5
          redBall: '',
          blueBall: '',
          multiple: '',  //倍数
          investCount: '',  //注数
          money: '',  //单注积分
        };
        if(this.betsNum == 0&&this.tableData.length == 0){
          _this.submitBtn1 = true;
          _this.submitBtn2 = false;
          _this.$message.error({
            showClose: true,
            message: '请至少选择一注',
          });
        }

        if(this.betsNum !== 0){
          if(this.redBallLen>5||this.blueBallLen>2){
            params.playType = 2;
          }else {
            params.playType = 1;
          }
          if(this.times == 0||this.times == ''){
            this.times = 1;
          }
          params.multiple = this.times;
          params.redBall = this.redBallArr;
          params.blueBall = this.blueBallArr;
          params.money = this.betsNum*2*this.times;
          params.investCount = this.betsNum;
//          console.log(this.times);
          if(this.times !== ''&&this.times !== 0&&params.money < 20000){
            this.tableData.unshift(params);
            this.redBallArr = [];
            this.blueBallArr = [];
            this.redBallArrIdex = [];
            this.blueBallArrIdex = [];
            this.redBallLen = 0;
            this.blueBallLen = 0;
//            this.betsNum = 0;
            this.times = 1;
            this.totalPrice += params.money;
            this.isSub_btn = false;
            this.isSub_btn_red = true;
          }
        }
//        console.log(this.tableData);
        this.submitBtn1 = false;
        this.submitBtn2 = true;
        if(this.betsNum !== 0||this.totalPrice !== 0){
          let total = this.betsNum*this.times*2;
          if(total > 20000){
            _this.submitBtn1 = true;
            _this.submitBtn2 = false;
            _this.$message.error({
              showClose: true,
              message: '单注金额不能超过200万',
            });
          }else {
            let paramsPid = {
              deviceNo:this.deviceNo,
//              deviceNo:"0123456789ABCDE2",
            };
            this.loadTips = true;
            _this.$http.post('/dlt/queryIssueInfo',paramsPid).then((res)=>{
//            console.log(res.data.data);
              if(res.data.code == 10000){
                _this.newPid = res.data.data.issueNumber;
                _this.tzSub();
              }else {
                console.log('没有pid')
              }
            },(err)=>{
              console.log(err);
            })
          }
        }
      },
      // 投注
      tzSub(){
        let _this = this;
        let paramsSubmit = {
          userId: _this.uid,
          deviceNo:_this.deviceNo,
//          userId: '5a72e459f57b05216546d540',
//          deviceNo: '0123456789ABCDE2',
          lotteryName: 'dlt',
          issueNumber: _this.newPid,
          moneySum:_this.totalPrice,
          tableData: _this.tableData,
          type:this.typeTab,
        };
        console.log(paramsSubmit);
        _this.$http.post('/dlt/betting',paramsSubmit).then(function (res) {
          console.log(res.data.data);
          let msg = res.data.data;
          if(res.data.code == 10000){
            _this.loadTips = false;
            _this.toastMessage(msg);
            _this.callBackPay();
            _this.submitBtn1 = true;
            _this.submitBtn2 = false;
          }
//          if(res.data.code == 10005){
//            _this.model2 = false;
//          }
        },function (err) {
          console.log(err);
        });
      },
      callBackPay(){
        this.tableData = [];
        this.betsNum = 0;
        this.totalPrice = 0;
      },
      // 票池内单注删除
      deleteOne(row,index) {
        this.row = row;
        this.index = index;
        this.tableData.splice(index,1);
        this.totalPrice -= this.row.money;
        if(this.totalPrice == 0){
          this.isSub_btn = true;
          this.isSub_btn_red = false;
        }
      },
      // 随机方法
      rondomRedBall(){
        let rondomNum = [];
        this.redBallArrIdex = [];
        this.redBallArr = [];
        this.redBallRondom = new Array(35)
          .fill(0)
          .map((v,i)=>i)
          .sort(()=>0.5 - Math.random())
          .filter((v,i)=>i<5);
        for(var i=0;i<this.redBallRondom.length;i++){
          rondomNum = this.num(this.redBallRondom[i]+1);
          this.redBallArr.push(rondomNum);
        }
        this.redBallArrIdex = this.redBallRondom;
        this.redBallLen = this.redBallArrIdex.length;
      },
      rondomBlueBall(){
        let rondomNum = [];
        this.blueBallArr = [];
        this.blueBallArrIdex = [];
        this.blueBallRondom = new Array(12)
          .fill(0)
          .map((v,i)=>i)
          .sort(()=>0.5 - Math.random())
          .filter((v,i)=>i<2);
        for(var i=0;i<this.blueBallRondom.length;i++){
          rondomNum = this.num(this.blueBallRondom[i]+1);
          this.blueBallArr.push(rondomNum);
        }
        this.blueBallArrIdex = this.blueBallRondom;
        this.blueBallLen = this.blueBallArrIdex.length;
      },
      //开奖倒计时
      addTime:function () {
//        console.log(444)
        let _this = this;
        let timer = setInterval(function(){
          let nowTime = new Date();
          let endTime = new Date((_this.startInfo.stopTime));
//          console.log(endTime);
//          console.log(nowTime);
          let t = endTime.getTime() - nowTime.getTime();
//          console.log(t);
          if(t>0){
            let day=Math.floor(t/1000/60/60/24);
            let hour=Math.floor((t/1000/60/60)%24);
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format =`${day}天${hour}时 ${min} : ${sec}`;
            _this.timeContent = format;
          }else{
            clearInterval(timer);
//            console.log('清除定时器');
            _this.model = true;
            _this.kjNum = false;
            _this.query();
            setTimeout(function () {
              _this.model = false;
              _this.kjNum = true;

              let localTypeTab = localStorage.getItem("localTypeTab");
              if(localTypeTab == _this.typeTab){
                _this.typeTabModel = false;
//                _this.model = false;
              }else {
                _this.typeTabModel = true;
//                _this.model = false;
              }

            },5000);
            setTimeout(function () {
              _this.typeTabModel = false;
//              _this.model = false;
            },10000);
          }
        },1000);
      },
      //隐藏截止时间到弹窗
      modelHide(){
        this.model = false;
        this.kjNum = true;
        let localTypeTab = localStorage.getItem("localTypeTab");
        if(localTypeTab == this.typeTab){
          this.typeTabModel = false;
          this.model = false;
        }else {
          this.typeTabModel = true;
          this.model = false;
        }
        this.query();
      },
      //隐藏截止时间到弹窗
      typeTabModelHide(){
        this.typeTabModel = false;
        this.model = false;
//        this.query();
      },
      // 随机投注方式
      Rondom(){
        this.rondomRedBall();
        this.rondomBlueBall();
        this.submitBtn1 = true;
        this.submitBtn2 = false;
      },
      // 减倍数
      reduce(){
        this.times--;
        if(this.times<1){
          this.times=1;
        }
//        this.tableDemo.multiple = this.times;
      },
      // 增加倍数
      add(){
        this.times++;
        if(this.times>99){
          this.times=99;
        }
//        this.tableDemo.multiple = this.times;
      },
      // 最大倍数
      maxAdd(){
        this.times = 99;
//        this.tableDemo.multiple = this.times;
      },
      //清空票池所有
      deleteAll(){
        this.tableData = [];
        this.totalPrice = 0;
      },
      // 返回修改数字
      num:function (n) {
        return n<10 ? "0" + n : "" + n
      },
      // 阶乘
      jC(num){
        var sum = 1;
        for(var i=1;i<=num;i++){
          sum = sum*i
        }
        return sum
      },
      // 组合
      zH(all,choseNum){
        return this.jC(all)/(this.jC(choseNum)*this.jC(all-choseNum))
      },
    },
    updated(){
      if(this.redBallLen<5||this.blueBallLen<2){
        this.betsNum = 0;
      }else {
        this.isSub_btn = false;
        this.isSub_btn_red = true;
        this.betsNum = Math.round(this.zH(this.redBallLen,5))*Math.round(this.zH(this.blueBallLen,2));
      }
      if(this.betsNum>0||this.totalPrice>0){
        this.isSub_btn = false;
        this.isSub_btn_red = true;
      }else{
        this.isSub_btn = true;
        this.isSub_btn_red = false;
      }
    }
  }
</script>

<style>
  .home{
    position: relative;
  }
  .gameType{
    background: #7034b0;
  }
  .lotteryType{
    background: #2a3040;
  }
  .gameType_btn{
    background: #7a41df;
  }
  .lotteryType_btn{
    background: #373c52;
    border: 1px solid transparent;
  }
  .left{
    width: 85%;
  }
  .header{
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: left;
    padding: 0 40px;
    border-bottom: 1px solid #E4E4E4;
    color: white;
  }
  .head_img{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 50px;
    /*vertical-align: top;*/
    /*margin: 25px 0 0 300px;*/
  }
  .header span{
    color: #ff51aa;
    padding: 0 5px;
  }
  .old_num{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background: #ff51aa;
    color: white;
    text-align: center;
    margin-left: 10px;
  }
  .old_num_blue{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background: #5d83fe;
    color: white;
    text-align: center;
    margin-left: 10px;
  }
  .type_select{
    padding: 20px 30px;
    background: white;
    border-bottom: 1px solid #E4E4E4;
  }
  .type_select .select_btn .method_type{
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin: 10px 10px;
    text-align: center;
    border: 1px solid #ccc9c9;
    border-radius: 5px;
  }
  .classname{
    background: red;
    color: white;
  }
  .tips{
    background: white;
    padding: 10px 0 10px 40px;
    border-bottom: 1px solid #e4e4e4;
  }

  .box{
    position: relative;
    height: 48vh;
    padding: 0 40px 10px;
  }
  .box ul{
    padding: 20px 0;
  }
  .box li{
    display: inline-block;
    width:60px;
    height:60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    margin-right:30px;
    margin-top:20px;
  }
  .box .head li{
    border:1px solid #E4E4E4;
    color: red;
    font-weight: 600;
  }
  .box .betting_demo{
    position: absolute;
    right: 40px;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    color: white;
  }

  .right{
    position: absolute;
    top: 100px;
    left: 85%;
    bottom: 0;
    width: 15%;
    border-left: 1px solid #E4E4E4;
    text-align: center;
    padding: 50px 0 50px;
    color:white;
  }
  .right .reduce,
  .right .add{
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #d1d1d5;
    vertical-align: top;
  }
  .max_add{
    display: inline-block;
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #d1d1d5;
    vertical-align: top;
  }
  .right .reduce:active,
  .right .add:active,
  .right .dancing_drag:active,
  .right .random_lottery:active,
  .right .add_lottery:active,
  .right .history:active,
  .right .my_order:active,
  .right .quit:active,
  .right .save:active,
  .max_add:active{
    background: #46277e;
  }
  .right .times{
    width: 80px;
    height: 50px;
    margin: 10px 10px 0;
    border-radius: 5px;
    border: 1px solid #d1d1d5;
    text-align: center;
    font-size: 20px;
    color:white;
  }
  .right .dancing_drag,
  .right .random_lottery,
  .right .add_lottery,
  .right .history,
  .right .my_order,
  .right .quit,
  .right .save{
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: 40px auto;
    border-radius: 5px;
    border: 1px solid #d1d1d5;
  }
  .right .random_lottery{
    margin-top: 150px;
  }
  .right a .my_order{
    color: black;
  }

  footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px 0 30px 20px;
    border-top: 1px solid #E4E4E4;
    color: white;
  }
  .footer_text{
    /*display: inline-block;*/
    float: right;
    height: 50px;
    line-height: 50px;
    margin-right: 5%;
  }
  .delete_all{
    /*float: left;*/
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #ccc9c9;
    border-radius: 5px;
    color: white;
    outline: none;
    font-size: 20px;
  }
  .delete_all:active{
    background: #46277e;
  }
  .sub_btn{
    float: right;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-right: 2.2%;
    /*background: red;*/
    border-radius: 5px;
    color: white;
  }
  .sub_btn2{
    float: right;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-right: 2.2%;
    background: #c4c4c4;
    border-radius: 5px;
    color: white;
  }
  .isSub_btn{
    background: #c4c4c4;
  }
  .isSub_btn_red{
    background: #ff51aa;
  }

  .dan1, .tuo2{
    margin: 10px 20px;
  }

  /*登录、退出、弹窗*/
  .login,.out{
    display: inline-block;
    width: 100px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    border: 1px solid #ccc9c9;
  }
  .login:active,.out:active{
    background: #e4e4e4;
  }

  .bg_model{
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.6);
    z-index: 100;
  }
  .login-wrap{
    /*position: absolute;*/
    width:100%;
    height:100%;
  }
  .ms-login{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    width:20%;
    height:180px;
    margin: auto;
    /*padding:40px;*/
    border-radius: 10px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:50px;
  }
  .ms-input{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    border: 1px solid #ccc9c9;
    font-size: 20px;
    padding: 0 10px;
    outline: none;
  }
  .model_tips{
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #ccc9c9;
  }
  .model_content{
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-bottom: 1px solid #ccc9c9;
  }
  .model_btn{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: red;
  }

  .load_tips{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 150px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: white;
    border-radius: 5px;
  }

</style>
