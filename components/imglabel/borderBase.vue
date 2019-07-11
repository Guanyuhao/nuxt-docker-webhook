<template>
  <div class="v-boderbase">
    <svg id="imgSvg" v-if="baseImg" :width="baseImg.width" :height="baseImg.height" preserveAspectRatio="xMinYMin meet"  style="cursor: crosshair;">
      <image :xlink:href="baseImg.url"
        :width="baseImg.width"
        :height="baseImg.height"
         style="opacity: 0.8;"
      ></image>
      <g v-for="(item,index) in lableObj"
        style="opacity:1;"
        :key="index"
        :data-index='index'
        :class="[item.svgFont?'stopDraw':'','group_'+index]"
        >
        <path
          :d="item.d"
          :fill="item.fill"
          :fill-opacity="item['fill-opacity']"
          stroke-width="4"
          :stroke="item.stroke"
          :data-index='index'>
        </path>
        <g v-if="item.text" :data-index='index'>
          <defs>
            <filter x="0" y="0" width="1" height="1" :id="'bg'+index">
              <feFlood :flood-color="item.stroke"></feFlood>
              <feComposite in="SourceGraphic"></feComposite>
            </filter>
          </defs>
          <text
            :filter="'url(#bg'+index+')'"
            :x="item.text.x"
            :y="item.text.y"
            class="svgFont stopDraw"
          >&nbsp;{{item.text.txt}}&nbsp;
          </text>
          <g
            v-show="item.text.svgCloseStyle"
            :class="['svg-icon--close stopDraw','svgCloseStyle_'+index]"
            :data-index='index'>
            <svg
            class="icon stopDraw"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1161"
            width="21"
            height="21"
            ><path
              :filter="'url(#bg'+index+')'"
              d="M512 1024C228.072727 1024 0 795.927273 0 512S228.072727 0 512 0s512 228.072727 512 512-228.072727 512-512 512z m0-46.545455c256 0 465.454545-209.454545 465.454545-465.454545S768 46.545455 512 46.545455 46.545455 256 46.545455 512s209.454545 465.454545 465.454545 465.454545z m0-514.327272l148.945455-148.945455c13.963636-13.963636 34.909091-13.963636 48.872727 0 13.963636 13.963636 13.963636 34.909091 0 48.872727L560.872727 512l148.945455 148.945455c13.963636 13.963636 13.963636 34.909091 0 48.872727-13.963636 13.963636-34.909091 13.963636-48.872727 0L512 560.872727l-148.945455 148.945455c-13.963636 13.963636-34.909091 13.963636-48.872727 0-13.963636-13.963636-13.963636-34.909091 0-48.872727l148.945455-148.945455-148.945455-148.945455c-13.963636-13.963636-13.963636-34.909091 0-48.872727 13.963636-13.963636 34.909091-13.963636 48.872727 0l148.945455 148.945455z"
              fill="#ffffff"
              fill-opacity='0.75'
              p-id="1162"
              class="stopDraw">
              </path>
          </svg>
          </g>
        </g>
        <g :data-index='index'>
          <circle
            v-for="(c,j) in lableObj[index].circle"
            :cx="c.cx"
            :cy="c.cy"
            r="5"
            :fill="item.stroke"
            stroke="transparent"
            stroke-width="20"
            :class="['circle_'+index+'_'+j,'drag','Stretch']"
            :circle-index='j'
            :data-index='index'
            >
          </circle>
        </g>
      </g>
    </svg>

  </div>
</template>
<script>

export default {
  props: {
    base: {
      type: Object,
      default: null
    },
    labelText: {
      type: String,
      default: 'text'
    }
  },
  components: {

  },
  data(){
    return {
      lableObj: [],
      isReactLabel: true,
      // colorConfig:['yellow','cyan','magenta','springgreen','tomato','deepskyblue','orange'],
      colorConfig:['red'],
      pathArr: [], // 存储PathArr
      labelTagArr: [],
      baseImg: null,
      // 图形操作状态
      operateingState: false,
      zomm: 0
    }
  },
  created(){
    // 图形操作状态
    // 标注状态, 操作状态
  },
  mounted() {

  },
  methods: {
    init(){
      this.$nextTick(()=>{
        this.baseEvent()
      })
    },
    getLabelObjArr(){
      return this.lableObj
    },
    setImg(obj){
      // this.baseImg = null
      this.baseImg = {}
      // url width height
      Object.assign(this.baseImg,obj)
    },
    demoInit(){
      this.setImg({
        url: 'http://192.168.1.244:88/images/e6509678ebf44c8bbf99eeb8d6da7096/图片2/timg (8).jpg',
        width: 700,
        height: 700,
      })
      this.init()
    },
    openOperateingState(){
      // 开启 图形标注状态
      this.operateingState = true
    },
    setLabelObj(obj){
      this.lableObj = obj
    },
    setTransform(isallowMoveIndex){
      let groupSvg = imgSvg.getElementsByClassName(`group_${isallowMoveIndex}`)[0]
      groupSvg.style.transform = `translate(${0}px, ${0}px)`;
    },
    // 矩形标注
    rectangularLabel(){
      this.isReactLabel = true
    },
    // 不规则标注
    irregularLabeling(){
      this.isReactLabel = false
    },
    // base Event
    baseEvent(){
      let imgSvg = document.getElementById('imgSvg')
      // 事件状态
      let isDown = false
      let isMove = false
      let isClick = false
      // 控制折现反转转变
      let isPolyline = false
      // 是否继续矩形标注
      let isGoReactLable = true
      // 可以拖动
      let isallowMove = false
      let isallowMoveIndex = 0
      let t_down_x,t_down_y
      // 坐标
      let m_move_x, m_move_y,
          m_down_x, m_down_y,
          m_click_x,m_click_y,
          m_up_x,m_up_y;
      // 矩形
      let reactW,reactH,rectX,rectY
      // 绘制状态
      let stopDraw = false // 禁止拖拽
      let Stretch = false // 拉伸功能
      let isStretchIndex = 0
      // 监控对象变更 控制dom操作
      let pathProxy = new Proxy({},{
        get(target, key, receiver){
          return Reflect.get(target, key, receiver);
        },
        set(target, key, receiver){
          // if(key == 'd'){
          //   target[key] && path.setAttribute('d',pathProxy.d)
          // }
          return Reflect.set(target, key, receiver);
        }
      })
      // let downStart = true
      // let downClickDealy = this.$helper.debounce(()=>{

      // },500)
      // 鼠标事件顺序 down=>up=>click
      imgSvg.onmousedown = () => {
        m_down_x = event.offsetX
        m_down_y = event.offsetY
        let dom = event.target
            ,classList = dom.classList
        if(classList.contains('stopDraw')){
          stopDraw = true
          return
        }
        stopDraw = false
        // click 选中不继续

        if(classList.contains('Stretch')){
          // 拉伸
          pathProxy.Stretch = true
          console.log(event.target)
          isStretchIndex = dom.getAttribute('data-index')
          pathProxy.StretchX = dom.getAttribute('cx')
          pathProxy.StretchY = dom.getAttribute('cy')
          pathProxy.isCricleIndex = dom.getAttribute('circle-index')
          // console.log(this.pathArr[isStretchIndex],isCricleIndex,dom.getAttribute('cx'),dom.getAttribute('cy'))
          Stretch = true
          return
        }
        Stretch = false
        if(dom.getAttribute('data-index') && this.lableObj[dom.getAttribute('data-index')].svgFont){
          isallowMove = true
          // isallowMove = false
          t_down_x = event.offsetX
          t_down_y = event.offsetY
          isallowMoveIndex = dom.getAttribute('data-index')
          return
        }
        // !isClick
        // react 操作流程 需要点击2次 结束绘画
        // 第一次点击开始绘画
        // 第二次点击结束绘画
        // 事件喜欢2次 只发生一次
        if(this.isReactLabel){
          if(isClick){
            isDown = false
            // 2次点击
          }else{
            //
            isDown = true
            rectX = m_down_x
            rectY = m_down_y
            // if(this.lableObj.length >=5){
            //   console.log('最多允许标注5个')
            //   isGoReactLable = false;
            //   return
            // }
            pathProxy.startReactDraw = true
            pathProxy.starReactTime = +new Date()
            pathProxy.reactFirstArr = [rectX,rectY]
            this.saveLabeObj({
              d:'',
              circle: [],
              shape_type: 'rectangle'
            })
          }
        }
      }
      imgSvg.onmouseup = () => {
        m_up_x = event.offsetX
        m_up_y = event.offsetY
        if(isallowMove){
          // 更改坐标
          // 解决二次拖拽问题
          if(pathProxy.moveTransform){
            this.lableObj[isallowMoveIndex].transformPoint = [pathProxy.moveTransform.x,pathProxy.moveTransform.y]
          }
          // 认定为 移动完成
        }
        if(Stretch){
          Stretch = false
        }
        isallowMove = false
      }
      imgSvg.onmouseleave = ()=>{
        if(isallowMove){
          isallowMove = false
          if(pathProxy.moveTransform){
            this.lableObj[isallowMoveIndex].transformPoint = [pathProxy.moveTransform.x,pathProxy.moveTransform.y]
          }
        }
        pathProxy.stopMoveEvent = true

      }
       imgSvg.onmouseenter = ()=>{
        pathProxy.stopMoveEvent = false
      }
      imgSvg.onmousemove = () => {
        if(pathProxy.stopMoveEvent){
          return
        }
        m_move_x = event.offsetX
        m_move_y = event.offsetY

        let dom = event.target
        if(isallowMove){
            /*
              MouseEvent.movementX 是只读属性，
              它提供了当前事件和上一个mousemove事件之间鼠标在水平方向上的移动值。
              换句话说，这个值是这样计算的 :
              currentEvent.movementX = currentEvent.screenX - previousEvent.screenX.
            */
          //  console.log(t_down_x,t_down_y)
            let transformX = m_move_x - t_down_x
            let transformY = m_move_y - t_down_y
            this.$nextTick(()=>{
              // console.log(imgSvg.getElementsByClassName(`group_${isallowMoveIndex}`)[0].style.transform)
              let groupSvg = imgSvg.getElementsByClassName(`group_${isallowMoveIndex}`)[0]
              let transformPoint = this.lableObj[isallowMoveIndex].transformPoint
              if(transformPoint){
                 transformX += transformPoint[0]
                 transformY += transformPoint[1]
              }

              let cxArr = this.lableObj[isallowMoveIndex].circle.map(item=>item.cx)
              let cyArr = this.lableObj[isallowMoveIndex].circle.map(item=>item.cy)
              let MaxX = Math.max(...cxArr)
              let MinX = Math.min(...cxArr)
              let MaxY = Math.max(...cyArr)
              let MinY = Math.min(...cyArr)
              if(MinX+transformX  <= 0){
                return
              }
              if(MaxX+transformX >= this.baseImg.width){
                return
              }
              if(MinY+transformY - 22 <= 0){
                return
              }
              if(MaxY+transformY >= this.baseImg.height){
                return
              }
              // 拖拽边界限制
              pathProxy.moveTransform = {
                x: transformX,
                y: transformY
              }
              groupSvg.style.transform = `translate(${transformX}px, ${transformY}px)`;
            })

            return
        }
        if(Stretch){
          /*
          1. 区分是否为矩形
          2. 利用一个跟随鼠标的原点 对角线点勾画
          3. 多边形勾画单独一个点
          */
         let currLabelObj = this.lableObj[isStretchIndex]
         let pathIndex = pathProxy.isCricleIndex*2
         let pathArr_item = this.pathArr[isStretchIndex]
         let StretchArr = []
          if(currLabelObj['shape_type'] === 'rectangle'){
            /*
              矩形拖拽 对角线的点不变
              由：      clircle (index*2) reactArr
                x1,y1;    0                 0,1
                x2,y2;    1                 2,3
                x3,y3;    2                 4,5
                x4,y4;    3                 6,7

                x1 = x2; y1 = y4;
                x3 = x4; y2 = y3;
              得：          diagonal
                  0:[2,7], 4
                  2:[0,5], 6
                  4:[6,3], 0
                  6:[4,1], 2
            */
            let x = pathArr_item[pathIndex]
                ,y = pathArr_item[pathIndex+1]
                ,realChangeObj = {
                  0: [2,7],
                  2: [0,5],
                  4: [6,3],
                  6: [4,1],
                },
                diagonal = {
                  0: 4,
                  2: 6,
                  4: 0,
                  6: 2,
                };
                pathArr_item[realChangeObj[pathIndex][0]] = m_move_x
                pathArr_item[realChangeObj[pathIndex][1]] = m_move_y
                pathArr_item[pathIndex] = m_move_x
                pathArr_item[pathIndex+1] = m_move_y

                let textX = pathArr_item[0]
                let textY = pathArr_item[1]
                /* 解决绘制过程中发生 move text坐标出现偏差 */
                let diagonalX = pathProxy.reactArr[4]
                let diagonalY = pathProxy.reactArr[3]
                if(textX > diagonalX){
                  if(textY > diagonalY){
                    textX = diagonalX
                    textY = diagonalY
                  }else{
                    // 变X
                    textX = diagonalX
                  }
                }else{
                  // 无论上下 变Y
                  if(textY > diagonalY){
                    textY = diagonalY
                  }
                }
                this.lableObj[isStretchIndex].text.x = textX
                this.lableObj[isStretchIndex].text.y = textY-6
                this.lableObj[isStretchIndex].circle = pathArr_item.map((point,index,arr)=>{
                  if(index%2 === 0){
                    return {
                      cx: arr[index],
                      cy: arr[index+1],
                    }
                  }
                  return null
                }).filter(circle=>circle);

                this.lableObj[isStretchIndex].d = this.polygon2path(pathArr_item)
          }else{
            pathArr_item[pathIndex] = m_move_x
            pathArr_item[pathIndex+1] = m_move_y
            if(pathIndex === 0){
              let l = pathArr_item.length
              pathArr_item[l-2] = m_move_x
              pathArr_item[l-1] = m_move_y
              this.lableObj[isStretchIndex].text.x = m_move_x
              this.lableObj[isStretchIndex].text.y = m_move_y
            }
            this.lableObj[isStretchIndex].circle[pathProxy.isCricleIndex].cx = m_move_x
            this.lableObj[isStretchIndex].circle[pathProxy.isCricleIndex].cy = m_move_y
          }
          this.lableObj[isStretchIndex].d = this.polygon2path(pathArr_item)
          return
        }
        if(this.isReactLabel && isDown && isGoReactLable){
          //需要注意矩形画图的四个放行
          // svg矩形开始的点位 永远左上角的点位
          // 思路参考田字格
          //经过各种情况测试 建议试用不规则图形绘制矩形
          // x,y x,y1, x1,y1, x1,y
          pathProxy.reactArr = [rectX,rectY,rectX,m_move_y,m_move_x,m_move_y,m_move_x,rectY]
          // console.log(pathProxy.reactArr)
          this.fixLabelObjPath(`${this.polygon2path(pathProxy.reactArr)}`)

          return
        }
        if(this.isReactLabel){
          return
        }
        // 不规则图形绘画
        if(isClick){
          if(!pathProxy.pointArr){
            pathProxy.pointArr = [m_click_x,m_click_y,m_move_x,m_move_y]
          }else{
            //是否有园
            if(isPolyline){
              pathProxy.pointArr.push(m_move_x,m_move_y)
              isPolyline = false
            }else{
              let l = pathProxy.pointArr.length
              pathProxy.pointArr[l-1] = m_move_y
              pathProxy.pointArr[l-2] = m_move_x
            }
          }
          this.fixLabelObjPath(`${this.polyline2path(pathProxy.pointArr)}`)

        }
      }
      imgSvg.onclick = () => {
        m_click_x = event.offsetX
        m_click_y = event.offsetY
        let dom = event.target
            ,classList = dom.classList
        // click 选中不继续
        if(dom.getAttribute('data-index') && this.lableObj[dom.getAttribute('data-index')].svgFont){
          return
        }

        if(classList.contains('stopDraw') || stopDraw){
          // 不能继续绘图
          if(classList.contains('drag')){
            // 可以拖拽 既修改path 地址

          }
          if(classList.contains('svgFont')){
            // 文本点击 修改path fill 与 fill-opacity
            let index = dom.parentNode.getAttribute('data-index')
            let item = this.lableObj[index]
            let {
              stroke
            } = item
            if(!item.svgFont){
              item.svgFont = true
              item.fill = stroke
              item['fill-opacity'] = '0.75'
            }else{
              item.svgFont = false
              item.fill = 'none'
              item['fill-opacity'] = '0'
            }
          }
          return
        }
        if(isallowMove){
          return
        }

        if(this.isReactLabel && !stopDraw && pathProxy.startReactDraw){
          if(!isGoReactLable){
            //矩形不在继续
            return
          }
          // 从矩形开始到结束使用 500ms 时间差控制 500ms 的时间查控制
          if(!isClick){

            isClick = true

          }else{
            // 关闭 move 事件
            // 消除move 坐标对最后生成
            // 无效绘制矩形问题
            pathProxy.startReactDraw = false
            if(!pathProxy.reactArr ){
              // 首次勾画没有 无效
              this.lableObj.splice(this.lableObj.length-1,1)
              isClick = false
              return
            }
            // 在此勾画矩形无效 经测试该方法不准
            let  oldReact = this.pathArr[this.pathArr.length-1]
            if(oldReact){
              if(oldReact.toString() === pathProxy.reactArr.toString()){
                // 无效勾画 需要回撤 状态 删除变量数据
                this.lableObj.splice(this.lableObj.length-1,1)
                isClick = false
                return
              }
            }
            // 时间差距 失败 使用时间差
            // console.log(+new Date() - pathProxy.starReactTime)
            if( +new Date() - pathProxy.starReactTime < 250){
              this.lableObj.splice(this.lableObj.length-1,1)
              isClick = false
              return
            }
            pathProxy.stopMoveEvent = true
            pathProxy.reactArr.forEach((element,index,arr) => {
              if(index%2 === 0){
                this.addLabelCricle({
                  cx: arr[index],
                  cy: arr[index+1],
                })
              }
            });
            //是否进入图片操作状态
            if(!this.operateingState){
              // pathProxy.reactArr = [rectX,rectY,rectX,m_move_y,m_move_x,m_move_y,m_move_x,rectY]
              let textX = rectX
              let textY = rectY
              /* 解决绘制过程中发生 move text坐标出现偏差 */
              let m_move_x = pathProxy.reactArr[4]
              let m_move_y = pathProxy.reactArr[3]
              if(rectX > m_move_x){
                if(rectY > m_move_y){
                  textX = m_move_x
                  textY = m_move_y
                }else{
                  // 变X
                  textX = m_move_x
                }
              }else{
                // 无论上下 变Y
                if(rectY > m_move_y){
                  textY = m_move_y
                }
              }
              this.addLabelObjText({
                x: textX,
                y: textY-6,
                txt: this.labelText
              })
            }

            this.savePathd(pathProxy.reactArr)
            pathProxy.stopMoveEvent = false
            isClick = false
          }
          return
        }
        if(this.isReactLabel){
          return
        }
        // 多边形
        if(!isClick){
          // if(this.lableObj.length >=5){
          //   console.log('最多允许标注5个')
          //   return
          // }
          if(pathProxy.Stretch){
            pathProxy.Stretch = false
            return
          }
          pathProxy.circlePointArr = [[m_click_x,m_click_y]]
          isClick = true

          this.saveLabeObj({
            d: '',
            circle: [
              {
                cx: m_click_x,
                cy: m_click_y,
              }
            ],
            shape_type: 'polygon'
          })
        }else{
          //  非第一次点击
          //  避免重复的点
          let area = 10  //重复范围
          //  最后一次结束 画图
          let isLast = false
          // 超过3个点需要判读是否闭合 结束该不规则的多边形
          if(pathProxy.circlePointArr.length >=3 ){
            let element = pathProxy.circlePointArr[0]
            let absx = [element[0] - area,element[0] + area]
            let absy = [element[1] - area,element[1] + area]
            if((m_click_x >= absx[0] && m_click_x <= absx[1]) && (m_click_y >= absy[0] && m_click_y <= absy[1]) ){
              isLast = true
            }
          }
          if(isLast){
            // 最后一个点变成第一个点
            if(pathProxy.Stretch){
              pathProxy.Stretch = false
            }
            let l = pathProxy.pointArr.length
            pathProxy.pointArr[l-1] = pathProxy.pointArr[1]
            pathProxy.pointArr[l-2] = pathProxy.pointArr[0]
            // 增加是因为接下来他要为null
            this.fixLabelObjPath(`${this.polygon2path(pathProxy.pointArr)}`)
            // this.saveLabelTagArr({
            //   style:{
            //     left: pathProxy.pointArr[0],
            //     top: pathProxy.pointArr[1]
            //   },
            //   text: 'faoiwq'
            // })
            this.addLabelObjText({
              x: pathProxy.pointArr[0],
              y: pathProxy.pointArr[1],
              txt: this.labelText
            })
            this.savePathd(pathProxy.pointArr)
            // 清楚所有的状态
            pathProxy.pointArr = null
            isClick = false
          }else{
            let isGoCircle = true
            // console.log(m_click_x,m_click_y)
            // +-10 区间内无效点击
            for(let i = 0 ; i < pathProxy.circlePointArr.length; i++){
              let element = pathProxy.circlePointArr[i]
              let absx = [element[0] - area,element[0] + area]
              let absy = [element[1] - area,element[1] + area]
              if( (m_click_x >= absx[0] && m_click_x <= absx[1]) && (m_click_y >= absy[0] && m_click_y <= absy[1]) ){
                isGoCircle = false
              }
            }
            // 原点在不在误差范围之内
            if(isGoCircle){
              isPolyline = true
              // g.appendChild(newCircle)
              this.addLabelCricle({
                cx: m_click_x,
                cy: m_click_y,
              })
              pathProxy.circlePointArr.push([m_click_x,m_click_y])
            }
          }

        }
      }
    },
    //
    // 自定义svg组 g
    saveLabeObj(item){``
      // 校验标注对象
      let colorConfig = this.colorConfig
      let stroke = colorConfig[Math.floor(Math.random() * colorConfig.length)];
      // colorConfig.splice(colorConfig.indexOf(stroke),1);
      item.stroke = stroke
      item['fill-opacity'] = '0';
      item['fill'] = 'none';
      this.lableObj.push(item)

    },
    // 修改对应path
    fixLabelObjPath(d,arr){
      this.lableObj[this.lableObj.length-1]['d'] = d
    },
    // 增加标注文字
    addLabelObjText(item){
      this.lableObj[this.lableObj.length-1]['text'] = item
      // this.$nextTick(()=>{
      //   this.addClose(item,this.lableObj.length-1)
      // })
    },
    addClose(item,index){
      let imgSvg = document.getElementById('imgSvg')
      let groupSvg = imgSvg.getElementsByClassName(`group_${index}`)[0]
      let textBox = groupSvg.getElementsByTagName('text')[0].getBBox()
      let svgCloseStyle = groupSvg.getElementsByClassName('svg-icon--close')[0]
      item.svgCloseStyle = {
        x: Math.floor(textBox.x + textBox.width),
        y: textBox.y
      }
      this.lableObj[index]['text'] = item
      svgCloseStyle.style.display = `unset`;
      svgCloseStyle.style.transform = `translate(${item.svgCloseStyle.x}px, ${item.svgCloseStyle.y}px)`;
    },
    // 文字存储
    saveLabelTagArr(item){
      this.labelTagArr.push(item)
    },
    // 添加新的原点
    addLabelCricle(item){
      this.lableObj[this.lableObj.length-1]['circle'].push(item)
    },
    // 存储SVG Path的 d
    savePathd(arr){
      this.pathArr.push(arr)
    },
    // del All label
    delLabel(){
      //
      this.lableObj = []
      this.labelTagArr = []
      this.pathArr = []
      // this.colorConfig = ['yellow','cyan','magenta','springgreen','tomato','deepskyblue','orange']

    },
    /* svg base 方法 */
    // 创建svg 标签
    createSvg(tag,attr){
      if(!document.createElementNS){
        return
      }
      let $svg = document.createElementNS('http://www.w3.org/2000/svg',tag)
      for (const key in attr) {
        if (attr.hasOwnProperty(key)) {
          const element = attr[key];
            switch(key) {
              case 'xlink:href'://文本路径添加属性特有
                  $svg.setAttributeNS('http://www.w3.org/1999/xlink', key, attr[key]);
              break;
              default:
              $svg.setAttribute(key, attr[key]);
            }
        }
      }
      return $svg
    },
    //折线转换
    polyline2path(points){
      var path = 'M' + points.slice(0,2).join(' ') + 'L' + points.slice(2).join(' ');
      return path;
    },
    // 多边形转换
    polygon2path(points){
      var path = 'M' + points.slice(0,2).join(' ') + 'L' + points.slice(2).join(' ') + 'z';
      return path;
    },
    // 直线
    line2Path(x1,y1,x2,y2){
      if (isNaN(x1 - y1 + x2 - y2)) return;
      x1 = x1 || 0;
      y1 = y1 || 0;
      x2 = x2 || 0;
      y2 = y2 || 0;
      var path = 'M' + x1 + ' '+ y1 + 'L' + x2 + ' ' + y2;
      return path;
    },
    //矩形转path
    rect2path(x,y,width,height,rx,ry){
      /* * rx 和 ry 的规则是： * 1. 如果其中一个设置为 0 则圆角不生效 * 2. 如果有一个没有设置则取值为另一个 */
      rx = rx || ry || 0; ry = ry || rx || 0;
      //非数值单位计算，如当宽度像100%则移除
      if (isNaN(x - y + width - height + rx - ry)) return;
       rx = rx > width / 2 ? width / 2 : rx; ry = ry > height / 2 ? height / 2 : ry;
       //如果其中一个设置为 0 则圆角不生效
       if(0 == rx || 0 == ry){
          // var path =
          // 'M' + x + ' ' + y +
          // 'H' + (x + width) + 不推荐用绝对路径，相对路径节省代码量
          // 'V' + (y + height) +
          // 'H' + x +
           // 'z';
            var path =
            'M' + x + ' ' + y +
            'h' + width +
            'v' + height +
            'h' + -width +
            'z';
        }else{
          var path =
          'M' + x + ' ' + (y+ry) +
          'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + (-ry) +
          'h' + (width - rx - rx) +
          'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + ry +
          'v' + (height - ry -ry) +
          'a' + rx + ' ' + ry + ' 0 0 1 ' + (-rx) + ' ' + ry +
          'h' + (rx + rx -width) +
          'a' + rx + ' ' + ry + ' 0 0 1 ' + (-rx) + ' ' + (-ry) + 'z';
        }
      return path;
    },
    getImgNaturalDimensions(img, callback) {
        var nWidth, nHeight
        if (img.naturalWidth) { // 现代浏览器
            nWidth = img.naturalWidth
            nHeight = img.naturalHeight
        } else { // IE6/7/8
            var imgae = new Image()
            image.src = img.src
            image.onload = function() {
                callback(image.width, image.height)
            }
        }
        return [nWidth, nHeight]
    },
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/scss/mixins';

.v-boderbase{
  position: relative;
  #imgSvg{
    position: relative;
    image{
      display: block;
    }
  }
  .svgFont{
    font-weight: bold;
    user-select: none;
    fill: #000;
    cursor: pointer;
  }
  .stopDraw{
    cursor: pointer;
  }
}
</style>
