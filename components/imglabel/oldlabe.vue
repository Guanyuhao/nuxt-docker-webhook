<template>
  <div class="svg-demo">
    <svg id="imgSvg" width="400" height="267" preserveAspectRatio="xMinYMin meet"  style="cursor: crosshair;" >
      <image xlink:href="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;s=5f95e549145a348231c9b41143de33bd" width="400" height="267" style="opacity: 0.8;"></image>
    </svg>
    <!-- viewBox 左上角的横坐标 纵坐标 视窗的宽度跟高度 -->
    <svg width="100" height="100" viewBox="-50 -50 100 100">
      <circle id="mycircle" cx="50" cy="50" r="50" />
    </svg>
    <svg width="300" height="180">
      <line x1="10" x2="50" y1="110" y2="150" stroke="yellow" stroke-width="4"/>
      <circle cx="30"  cy="50" r="25" />
      <circle cx="90"  cy="50" r="25" class="red" />
      <circle cx="150" cy="50" r="25" class="fancy" />
    </svg>
    <svg class="c0172 c0174" preserveAspectRatio="xMinYMin meet" viewBox="0 0 400 267" width="400" height="267" draggable="false" style="cursor: crosshair;">
      <image xlink:href="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;s=5f95e549145a348231c9b41143de33bd" width="400" height="267" style="opacity: 0.8;"></image>
      <g class="c0151" style="opacity: 1;">
        <path d="M173.5,78,277.5,89,
        258.5,156z" fill="none" fill-opacity="0" stroke-width="4" stroke="yellow">
        </path>
        <g>
          <defs>
            <filter x="0" y="0" width="1" height="1" id="bg0">
              <feFlood flood-color="yellow"></feFlood>
              <feComposite in="SourceGraphic"></feComposite>
            </filter>
          </defs>
          <text class="c0178" filter="url(#bg0)" x="173.5" y="74" style="font-size: 16px;">&nbsp;FRUIT&nbsp;</text>
        </g>
      </g>
      <g class="c0151 c0153" style="opacity: 1;">
        <path d="
        M
        112.5,77,
        272.5,119,
        190.5,
        204,
        512.5,177"
        fill="yellow" fill-opacity="0"
        stroke-width="4" stroke="yellow" style="pointer-events: none;"></path>
        <circle cx="112.5" cy="77" r="5" fill="yellow" stroke="transparent" stroke-width="20"></circle>
        <circle r="5" fill="yellow" stroke="transparent" stroke-width="20" style="" cx="272.5" cy="119"></circle>
        <circle r="5" fill="yellow" stroke="transparent" stroke-width="20" style="" cx="190.5" cy="204"></circle>
        <circle cx="512.5" cy="177" r="5" fill="yellow" stroke="transparent" stroke-width="20" style="pointer-events: none;"></circle>
      </g>
    </svg>

  </div>
</template>
<script>
import borderBase from '~/components/imglabel/borderBase';

export default {
  data(){
    return {
       move_style: { cursor: 'col-resize' },
       circleSvg: [], // 存储标注的点
    }
  },
  components: {
    borderBase
  },
  created() {

  },
  mounted() {
    this.initEvent()
  },
  methods: {
    init(){
      //
    },
    initEvent(){
      // click 创建一组svg 有园 path
      // move 有clik状态需要画线
      // 第二次click 结束这组画线
      var imgSvg = document.getElementById('imgSvg')
      // 事件状态
      let isDown = false
      let isMove = false
      let isClick = false
      // 控制折现反正转变
      let isPolyline = false
      // 坐标
      let m_move_x, m_move_y,
          m_down_x, m_down_y,
          m_click_x,m_click_y,
          m_up_x,m_up_y;
      // 自定义svg 组
      let g,path;
      // 控制设置次数
      let moveDebounce = this.$helper.debounce(()=>{
        path.setAttribute('d',pathProxy.d)
      },10)
      // 代理对象动态修改 path
      let pathProxy = new Proxy({},{
        get(target, key, receiver){
          return Reflect.get(target, key, receiver);
        },
        set(target, key, receiver){
          if(key == 'd'){
            target[key] && path.setAttribute('d',pathProxy.d)
          }
          return Reflect.set(target, key, receiver);
        }
      })
      // 鼠标事件顺序 down=>up=>click
      imgSvg.onmousedown = () => {
        m_down_x = event.pageX
        m_down_y = event.pageY
        isDown = true
      }

      imgSvg.onmouseup = () => {
        m_up_x = event.pageX
        m_up_y = event.pageY
        isDown = false
      }

      imgSvg.onmousemove = () => {
        m_move_x = event.pageX
        m_move_y = event.pageY
        // console.log(m_move_x)
        if(isClick){
          // pathProxy.pointArr = []
          // pathProxy.d = `${this.line2Path(m_click_x,m_click_y,m_move_x,m_move_y)}`
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
          // pathProxy.d = `M${pathProxy.pointArr.join(',')}`
          pathProxy.d = `${this.polyline2path(pathProxy.pointArr)}`

        }

      }
      imgSvg.onclick = () => {
        m_click_x = event.pageX
        m_click_y = event.pageY
        let newCircle = this.createSvg('circle',{
          cx: m_click_x,
          cy: m_click_y,
          r: 5,
          fill: 'yellow',
          stroke: 'transparent',
          strokeWidth: "20",
          class: 'newCircle'
        })
        if(!isClick){
          g = this.createSvg('g',{
            style: 'opacity: 1;'
          })
          path = this.createSvg('path',{
            d: '',
            style: 'pointer-events: none;',
            fill: 'none',
            'fill-opacity': 0,
            stroke: 'yellow',
            'stroke-width': '4'
          })
          pathProxy.circlePointArr = [[m_click_x,m_click_y]]
          g.appendChild(path)
          g.appendChild(newCircle)
          imgSvg.appendChild(g)
          isClick = true
        }else{
          //  非第一次点击
          //  避免重复的点
          let area = 7  //重复范围
          //  最后一次结束 画图
          let isLast = false
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
            let l = pathProxy.pointArr.length
            pathProxy.pointArr[l-1] = pathProxy.pointArr[1]
            pathProxy.pointArr[l-2] = pathProxy.pointArr[0]
            // pathProxy.d = `M${pathProxy.pointArr.join(',')}`
            pathProxy.d = `${this.polygon2path(pathProxy.pointArr)}`
            // 增加是因为接下来他要为null
            path.setAttribute('d',pathProxy.d)
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
              g.appendChild(newCircle)
              pathProxy.circlePointArr.push([m_click_x,m_click_y])
            }
          }

        }
      }
    },
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
    }


  }
}
</script>
