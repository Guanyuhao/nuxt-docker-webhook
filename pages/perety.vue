<template>
    <div class='container'>
        <!--标注实体-->
        <div class="left-side" :class="{hide:hide,showActive:showActive}" v-show="show">
            <div class="retract" @click="hideClick">
                <img src="~assets/img/close.png">
            </div>
            <aside-name></aside-name>
            <aside-infor></aside-infor>
            <aside-progress></aside-progress>
            <aside-result></aside-result>
            <model-accuracy></model-accuracy>
            <aside-task></aside-task>
        </div>
        <div class="little-left-side" v-show="!show">
            <div class="recovery" @click="showClick">
                 <img src="~assets/img/open.png">
            </div>
            <aside-little-progress></aside-little-progress>
            <aside-list></aside-list>
            <little-model></little-model>
        </div>
        <div class="right-content">
            <div class="right-txt">
                <div class="white-space">
                    <tool-bar ref="toolbar" :list="list" @typechoose="getIndex" @autoChange='autoChange' @changReplace='changReplace' @changSpecial='changSpecial' @clearAll='clearAll'></tool-bar>
                    <div class="textarea clearfix">
                        <div class="title">1001 全国监察机关一年半公诉金融犯罪2000人</div>
                        <div class="txt-bar">
                            <div class="font">
                                <img src="~assets/img/font.png" alt="">
                            </div>
                            <div class="reduct">
                                <img src="~assets/img/reduct.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="content"  >
                        <span class="span" v-for="(item,index) in dataArr" @mousedown="star(index)"  @mouseup="end" @mouseenter="enter(index)"   :key="index" :style="{background:item.background,color:item.color}">
                            {{item.value}}
                            <div  v-for="(it,i) in item.typeList" :key="i" class="typeName" :style="{background:it.background}">{{it.type}}
                                <img src="~assets/img/shanchu.png" @click="deleteType(index,i,it)">
                                <div class="tri"  :style="{borderRightColor:it.background}"></div>
                            </div>
                        </span>
                    </div>
                    <div class="bottom-group clearfix">
                        <div class="gruop clearfix">
                            <div class="pre">
                                <img src="~assets/img/pre.png" alt="">
                            </div>
                            <div class="next">
                                <img src="~assets/img/next.png" alt="">
                            </div>
                            <div class="yes">
                                <img src="~assets/img/yes.png" alt="">
                            </div>
                            <div class="delete">
                                <img src="~assets/img/delete.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <bot-com></bot-com>
        </div>
    </div>
</template>
<script>
import asideName from '../components/aside/asideName.vue'
import asideInfor from '../components/aside/asideInfor.vue'
import asideProgress from '../components/aside/asideProgress.vue'
import asideResult from '../components/aside/asideResult.vue'
import modelAccuracy from '../components/aside/modelAccuracy.vue'
import asideTask from '../components/aside/asideTask.vue'
import asideLittleProgress from '../components/littleside/asideProgress.vue'
import asideList from '../components/littleside/asideList.vue'
import littleModel from '../components/littleside/littleModel.vue'
import toolBar from '../components/toolbar/index'
import botCom from '../components/bottom/btmCom.vue'
import { async } from 'q';
export default {
      layout: 'home',
      components:{
          asideName,
          asideInfor,
          asideProgress,
          asideResult,
          modelAccuracy,
          asideTask,
          asideLittleProgress,
          asideList,
          littleModel,
          toolBar,
          botCom
      },
       mounted() {
        
        this.initClass();
        //this.initBottom()
        for(let i in this.str){
            let obj = {};
            obj.value = this.str[i];
            obj.background = 'white';
            obj.color = 'black';
            obj.typeList = [];
            this.dataArr.push(obj)
        }
      
    },
      data (){
          return {
                show:true,
                hide:false,
                showActive:false,
                str:'空间的十分开机速度快付款几点睡，阿斗积分时间，防守打法艾尔，第三方桑撒的，是打发顺风玩的，撒旦法三国杀的飞洒，撒地方阿士大夫撒旦法师，撒地方萨嘎，师大环境法律框架阿萨德了开机费卢卡斯。撒旦个沙发上阿斯顿发生，阿斯蒂芬噶水电费啥打法是否，勾搭法尔范第三方。',
                start:false,
                dataArr:[],
                index:0,
                activeColor:"#ccc",
                colorArr:[{color:'#2873EE',background:'#E6F0FF'},{color: '#22894B',background: 'rgba(108,176,143,0.22)'},{color: '#D12B2B',background: '#FFF3F3'},{color: '#AC3796',background: '#FDF6FB'},{color: '#525DD7',background: 'rgba(158,161,255,0.22)'}],
                classArr:[],
                list:[],
                startIndex:0,
                endIndex:0,
                activeType:"",
                timer:null,
                allReplace:true,
                selection:"",
                ingore:true,
                // 项目接受的参数
                proid:4195,
                autoPre:true
          }
      },
      methods:{
          //特殊字符
          changSpecial(){
              
              this.ingore = this.$refs.toolbar.speacilWord;
              console.log(this.ingore)
          },
          //全文匹配
          changReplace(){
              this.allReplace = this.$refs.toolbar.replaceAll;
          },
          //自动预测
          autoChange(){
              this.autoPre = this.$refs.toolbar.autoForecast;
          },
          clearAll(){
              for(let i in this.dataArr){
                  this.dataArr[i].background = 'white' 
                  this.dataArr[i].color = 'black'
                  this.dataArr[i].typeList = []
              }
          },
          hideClick() {
              if(this.show){
                   this.showActive = false
                    this.hide = true
                    setTimeout(()=>{
                        this.show = false;
                        this.hide = false
                    },900)   
              }
          },
          showClick() {
              if(!this.show){
                  this.showActive = true;
                  this.show = true
              }
          },
          colorRgb(str){
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = str.toLowerCase();
            if(sColor && reg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
                }
                return "RGB(" + sColorChange.join(",") + ",0.2)";
            }else{
                return sColor;	
            }
        },
          //鼠标抬起
           enter(index){
           // console.log(window.getSelection().toString())
            if(this.start){
                if(this.index==index-1||this.index==index+1){
                    if(this.timer!=null){
                        clearTimeout(this.timer)
                    }
                    this.index = index;
                    //this.dataArr[index].color = this.activeColor
                    this.endIndex = this.index;
                   //
                    this.timer = setTimeout(()=>{
                     if(this.activeType){
                         //this.small(); //不完全匹配
                        // console.log('----selection',this.selection)
                        this.correct() //修正索引
                       
                        if(this.allReplace){
                             this.all();    //完全匹配
                        }else{
                             this.small(); //不完全匹配
                        }
                     }
                    },1200)
                }
            }
        },
        //修正索引
        correct(){
            let str =  window.getSelection().toString().replace(/\s/g,"")
            if(this.startIndex<this.endIndex){
                let strat = this.startIndex;
                let end = this.endIndex;
                 for(let i=strat;i<=end;i++){
                        if(this.dataArr[i].value==str[0]){
                            this.startIndex = i;
                            break;
                        }
                    }
                    for(let i=strat;i<=end;i++){
                        if(this.dataArr[i].value==str[str.length-1]){
                            this.endIndex = i;
                            break;
                        }
                    }
            }else{
                let strat = this.startIndex;
                let end = this.endIndex;
                for(let i=end;i<=strat;i++){
                        if(this.dataArr[i].value==str[0]){
                            this.startIndex = i;
                            break;
                        }
                }
                for(let i=end;i<=strat;i++){
                    if(this.dataArr[i].value==str[str.length-1]){ 
                        this.endIndex = i;
                        break;
                    }
                }
            }
        },
        out(){

        },
        star(index){
            this.start = true
            //this.dataArr[index].color = this.activeColor;
            this.index = index;
            this.startIndex = index;
        },
        end(){
            this.start = false
        },
        small(){
                if(this.ingore){
                    let reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
                    let re = new RegExp(reg)
                    if(re.test(this.dataArr[this.startIndex].value)){
                        this.startIndex++;
                    }
                    if(re.test(this.dataArr[this.endIndex].value)){
                        this.endIndex--;
                    }
                }
              if(this.first(this.startIndex,this.endIndex,this.dataArr)){
                    this.changeColor(this.startIndex,this.endIndex)
                }else{
                    this.changeBack(this.startIndex,this.endIndex)
                }
        },
        all(){
            let str;
            if(this.startIndex>this.endIndex){
                  str = this.str.substring(this.endIndex,this.startIndex+1)
            }else{
                  str = this.str.substring(this.startIndex,this.endIndex+1)
            }
            if(this.ingore){
                str = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g,""); 
            }
            let length = 0;
            for(let i=0;i<this.dataArr.length;i++){
                if(this.dataArr[i].value==str[0]){
                    length=0;
                    for(let j = 0;j<str.length;j++){
                        if(this.dataArr[i+j].value==str[j]){
                            length++
                        }
                    }
                }
                if(length==str.length){
                    if(this.first(i,i+str.length,this.dataArr)){
                        this.changeColor(i,i+str.length-1)
                        length=0;
                    }else{
                        this.changeBack(i,i+str.length-1)
                        length=0;
                    }
                }
            }
        },
        setClass(i){
            this.activeColor = this.list[i].color;
            this.activeType = this.classArr[i]
            for(let j in this.list){
                if(j!=i){
                    this.list[j].class = ""
                }else{
                    this.list[j].class = "active"
                }
            }
        },
        first(start,end,arr){
            // for(let i = start;i<end;i++){
            //     if(arr[i].background!="white"){
            //         return false
            //     }
            // }
             for(let i = start;i<end;i++){
                if(arr[i].color!="black"){
                    return false
                }
            }
            return true
        },
        changeColor(start,end){
             for(let i = start;i<=end;i++){
                this.dataArr[i].color = this.activeColor;
            }
            // this.dataArr[this.startIndex].color = this.activeColor;
            // this.dataArr[index].color = this.activeColor;
                this.dataArr[end].typeList.push({
                    type:this.activeType,
                    background:this.activeColor,
                    index:[start,end],
                    back:"color",
                    value:this.str.substring(start,end+1)
                })
        },
        changeBack(start,end){
                for(let i = start;i<=end;i++){
                    console.log(this.activeColor)
                    this.dataArr[i].background = this.colorRgb(this.activeColor);
                    //this.dataArr[i].color = 'white'
                }
                //this.dataArr[this.startIndex].background = this.activeColor;
                //this.dataArr[index].background = this.activeColor
                this.dataArr[end].typeList.push({
                    type:this.activeType,
                    background:this.activeColor,
                    index:[start,end],
                    back:"background",
                    value:this.str.substring(start,end+1)
                })
        },
        deleteType(index,i,list){
            if(this.allReplace){
                let str = list.value;
                console.log('-----',str)
                for(let i=0;i<this.dataArr.length;i++){
                    if(this.dataArr[i].typeList.length!=0){
                        for(let j=0;j<this.dataArr[i].typeList.length;j++){
                            if(str==this.dataArr[i].typeList[j].value){
                                if(this.dataArr[i].typeList[j].back=="background"){
                                    for(let z=this.dataArr[i].typeList[j].index[0];z<=this.dataArr[i].typeList[j].index[1];z++){
                                        this.dataArr[z].background = "white"
                                    }
                                }else{
                                    for(let z=this.dataArr[i].typeList[j].index[0];z<=this.dataArr[i].typeList[j].index[1];z++){
                                        this.dataArr[z].color = "black"
                                    }
                                }
                                this.dataArr[i].typeList.splice(j,1)
                            }
                        }
                    }
                }

            }else{
                if(list.back=='background'){
                    for(let i=list.index[0];i<=list.index[1];i++){
                        this.dataArr[i].background = "white"
                    }
                }else{
                    for(let i=list.index[0];i<=list.index[1];i++){
                        this.dataArr[i].color = "black"
                    }
                }
                this.dataArr[index].typeList.splice(i,1)
            }
        },
        async initClass(){
            let {data} = await this.$axios.$post("label/getTypeValueByProId",{
               proId: 4184,
              
            })
            this.classArr = data;
            for(let i in this.classArr){
                this.list.push({
                    type:this.classArr[i].name,
                    color:this.colorArr[i].color,
                    background:this.colorArr[i].background,
                    class:""
                })
            }
            this.list[0].class = 'active';
              this.activeType =  this.list[0].type;
             this.activeColor = this.list[0].color;
        },
        async initBottom(){
            let {data} = await this.$axios.$post("label/getExampleListByProId_ner",{
                curPagerNo:1,
                pageSize:10,
                proId:4160
            })
            console.log(data)
        },
        getIndex(index,type){
            for(let i in this.list){
                this.list[i].class = "";
            }
             this.list[index].class = 'active';
             this.activeType = type;
             this.activeColor = this.list[index].color;
            
        }
      }
}
</script>
<style lang="stylus" scoped>
@keyframes hideline {
    from{
        left 0
    }
    to{
        left -200px
       
    }
}
@keyframes showline {
    from{
        left -200px
    }
    to{
        left 0
       
    }
}
.container{
    width 100%
    height 100%
    position relative
    display flex
}
.tri{
    width: 0;
    left: -10px;
    height: 0;
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-top-color:transparent;
    border-left-color:transparent;
    border-bottom-color:transparent;
    position: absolute;
    top: 0px;
    border-radius: 2px;
}
.typeName{
    display inline
    color white
    margin-left 12px
    padding-left 6px
    padding-right 0px
    overflow hidden
    
    position relative
    img{
        width 16px
        height 16px
        position relative
        cursor pointer
        right: 0px;
        top: 3px;
    }
}
.left-side {
    width 273px;
    height 100%;
    overflow  auto
    background: #313440;
    position relative
}
.right-content{
    flex 1
    display flex
    overflow hidden
    flex-direction column
}
.hide{
    animation:hideline 1s alternate forwards;
}
.showActive{
    left -200px
    animation:showline 1s alternate forwards;
}
.little-left-side{
    width 76px;
    height 100%;
    box-sizing border-box
    padding-left 6px
    padding-right 6px
    overflow  auto
    background: #313440;
    position relative
}
.right-txt{
    width 100%
    flex 1
    overflow hidden
}
.retract{
    position absolute
    right 0
    cursor pointer
    top 236px
}
.retract img{
    width 14px;
    height 41px
}
.recovery{
    position absolute
    right 0
    cursor pointer
    top 236px
}
.recovery img{
    width 14px;
    height 41px
}
.right-txt{
    padding 12px 26px 16px 10px
    background #262832
    box-sizing: border-box;
    .white-space{
        width 100%
        height 100%
        background white
        display flex
        flex-direction column
        .textarea{
            padding-left 16px
            padding-right 16px
            box-sizing border-box
            border-bottom : 1px solid #E0E6ED;
            .title{
                float left
                font-size: 14px;
                color: #252D3F;
                margin-top 12px
            }
            .txt-bar{
                float right 
                .font{
                    float left
                    cursor pointer
                    img{
                        width 24px
                        height 24px
                        margin-top 12px
                        margin-right 12px
                    }
                }
                .reduct{
                    float left
                    cursor pointer
                    img{
                        width 24px
                        height 24px
                        margin-top 12px
                        margin-right 12px
                    }
                }

            }
        }
    }
}
.content{
    padding 16px 
    box-sizing border-box
    font-size: 14px;
    color: rgba(0,0,0,0.80);
    letter-spacing: 0.6px;
    text-align: justify;
    line-height: 25px;
    flex 1
    overflow auto
}
.bottom-group{
    height 58px
    background: rgba(195,215,232,0.18);
    .gruop{
        float right 
        .pre{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-top 12px
            text-align center
            background: #626C76;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
        .next{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-left 16px
            margin-top 12px
            text-align center
            background: #626C76;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
        .yes{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-left 34px
            margin-top 12px

            text-align center
            background: #10B66F;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
        .delete{
            cursor pointer
            float left
            width 60px
            height 36px
            margin-left 16px
            margin-top 12px
            margin-right 16px
            text-align center
            background: #D12B2B;
            border-radius: 2px;
            border-radius: 2px;
            img{
                width 25px
                height 25px
                margin-top 6px

            }
        }
    }
}
</style>
