<template>
    <div class='container'>
        <!--标注分类-->
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
                        {{str}}
                    </div>
                    <div class="bottom-group clearfix">
                        <div class="gruop clearfix">
                            <div class="pre">
                                <img src="~assets/img/pre.png" alt="">
                            </div>
                            <div class="next">
                                <img src="~assets/img/next.png" alt="">
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
        
        
        
      
    },
      data (){
          return {
                show:true,
                hide:false,
                showActive:false,
                str:'空间的十分开机速度快付款几点睡，阿斗积分时间，防守打法艾尔，第三方桑撒的，是打发顺风玩的，撒旦法三国杀的飞洒，撒地方阿士大夫撒旦法师，撒地方萨嘎，师大环境法律框架阿萨德了开机费卢卡斯。撒旦个沙发上阿斯顿发生，阿斯蒂芬噶水电费啥打法是否，勾搭法尔范第三方。',
                colorArr:[{color:'#2873EE',background:'#E6F0FF'},{color: '#22894B',background: 'rgba(108,176,143,0.22)'},{color: '#D12B2B',background: '#FFF3F3'},{color: '#AC3796',background: '#FDF6FB'},{color: '#525DD7',background: 'rgba(158,161,255,0.22)'}],
                classArr:[],
                list:[],
                activeType:"",
                // 项目接受的参数
                proid:4195,
          }
      },
      methods:{
        
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
        async initBottom(){
            let {data} = await this.$axios.$post("label/getExampleListByProId_ner",{
                curPagerNo:1,
                pageSize:10,
                proId:4160
            })
            console.log(data)
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
    flex-direction column
    overflow hidden
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
