<template>
  <div class="svg-demo">
    <svg id="svg2" width="100%" height="620" :style='move_style'>
      <circle
        :style='move_style'
        id="circle1"
        cx="300"
        cy="200"
        r="100"
        stroke="black"
        strokeWidth="1"
        fill="#EED5D2"
      />
    </svg>
    <svg id="imgSvg" width="400" height="267"  style="cursor: crosshair;" >
      <image xlink:href="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;s=5f95e549145a348231c9b41143de33bd" width="400" height="267" style="opacity: 0.8;"></image>
    </svg>
    <!-- viewBox 左上角的横坐标 纵坐标 视窗的宽度跟高度 -->
    <svg width="100" height="100" viewBox="-50 -50 100 100">
      <circle id="mycircle" cx="50" cy="50" r="50" />
    </svg>
    <svg width="300" height="180">
      <circle cx="30"  cy="50" r="25" />
      <circle cx="90"  cy="50" r="25" class="red" />
      <circle cx="150" cy="50" r="25" class="fancy" />
    </svg>
    <svg class="c0172 c0174" preserveAspectRatio="xMinYMin meet" viewBox="0 0 400 267" width="400" height="267" draggable="false" style="cursor: crosshair;">
      <image xlink:href="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;s=5f95e549145a348231c9b41143de33bd" width="400" height="267" style="opacity: 0.8;"></image>
      <g class="c0151" style="opacity: 1;">
        <path d="M173.5,78,277.5,89,
        258.5,156z" fill="none" fill-opacity="0" stroke-width="4" stroke="yellow"></path>
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
export default {
  data(){
    return {
       move_style: { cursor: 'col-resize' }
    }
  },
  created() {

  },
  mounted() {
    this.zoom()
    this.initEvent()
  },
  methods: {
    init(){

    },
    initEvent(){
      var imgSvg = document.getElementById('imgSvg')
      let isDown = false
      let isMove = false
      let m_move_x, m_move_y, m_down_x, m_down_y

      imgSvg.onmousedown = () => {
        m_down_x = event.pageX
        m_down_y = event.pageY
        isDown = true
      }

      imgSvg.onmouseup = () => {
        isDown = false
      }
      imgSvg.onmousemove = () => {

        m_move_x = event.pageX
        m_move_y = event.pageY
        console.log(m_move_x)
      }
    },

    zoom(){
      const svg2 = document.getElementById('svg2')
      let circle = document.getElementById('circle1')
      let isDown = false
      let isMove = false
      let m_move_x, m_move_y, m_down_x, m_down_y
      let move_div
      svg2.onmousedown = () => {
          isDown = true
      }

      circle.onmouseup = () => {
        isDown = false
      }

      svg2.onmousemove = () => {
        move_div = document.getElementById('circle1')
        //获取鼠标移动实时坐标
        m_move_x = event.pageX
        m_move_y = event.pageY
        let newR = Math.sqrt(
          (m_move_x - circle.getAttribute('cx')) *
            (m_move_x - circle.getAttribute('cx')) +
            (m_move_y - circle.getAttribute('cy')) *
              (m_move_y - circle.getAttribute('cy'))
        )
        if (newR > 50 && newR < circle.getAttribute('r')) {
          isMove = true
         this.move_style = { cursor: 'col-resize' }
        } else if (newR > circle.getAttribute('r')) {
         this.move_style = { cursor: 'default' }
        } else {
          isMove = false
         this.move_style = { cursor: 'move' }
        }
        //鼠标按下时移动才触发
        if (isDown) {
          if (isMove) {
            circle.setAttribute('r', newR)
          } else {
            circle.setAttribute('cx', m_move_x)
            circle.setAttribute('cy', m_move_y)
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
          const element = object[key];
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
    // 折线
    polyline2path(points){
      var path = 'M' + points.slice(0,2).join(' ') + 'L' + points.slice(2).join(' ');
      return path;
    },
    polygon2path(points){
      var path = 'M' + points.slice(0,2).join(' ') + 'L' + points.slice(2).join(' ') + 'z';
      return path;
    },
    // 多边形转换

    // 直线
    line2Path(){
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
