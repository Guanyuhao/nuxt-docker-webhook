<template>
<div class="img-label">
  <llpLabel ref="llpLabel">
    <template slot="left">
     <div>side</div>
    </template>
    <template slot="smallLeft">
     <div>close-side</div>
    </template>
    <template slot="right">
      <div class="right-wrapper">
        <div class="right-content">
          <imglabeFull
            @zoomOut='zoomOut'
            @full='full'
            @zoom='zoom'
            @restZoom='restZoom'
            :imgScale='imgScale'
          ></imglabeFull>
          <!-- <imglabeFull
            @full='full'
            :isBorderLable='true'
          ></imglabeFull> -->
          <!-- <bar :barBtnList='barBtnList' @btnClick='fixLabelText'></bar> -->
          <barInfor
            :title="barInforTitle"
            @switchLabelGrap='switchLabelGrap'
            @crop='crop'
            @rotate='rotate'
            @delAllLabel='delLabel'
            :btnState='btnState'
            :initEventEmitter='initEventEmitter'
            :isCorp='isCorp'
            ></barInfor>
          <borderBase
            :labelText='labelText'
            :colorIndex='colorIndex'
            @cropImg='cropImg'
            @setBtnState='setBtnState'
            ref="borderBase" />
          <div class="bottom-group">
            <div class="gruop">
              <el-tooltip class="item" effect="dark" content="上一篇" placement="top-start">
                <div class="pre" @click="checkPreClick">
                  <
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="下一篇" placement="top-start">
                <div class="next" @click="checkNextClick">
                  >
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="提交" placement="top-start">
                <div class="yes" @click="submitPre=false;submit()">
                  YES
                 </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="丢弃" placement="top-start">
                <div class="delete" @click="deleteClick">
                  DROP
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!-- <bot-com
        ref="bottomlist"
        @setIndex="setIndex"
        @changePage='changeBottom'
        @change='showNoData'
        :activeIndex="activeIndex"
        :type="true" :list="bottomList"
        :total="total"
        @next='nextPage'
        @pre="prePage"
        v-show="!orcFull"
       ></bot-com> -->
    </template>
  </llpLabel>
</div>
</template>

<script>
import llpLabel from '~/components/imglabel/llpLabel';
//right
import borderBase from '~/components/imglabel/borderBase';
import bar from '~/components/imglabel/bar';
import barInfor from '~/components/imglabel/barInfor';

//bottom
// import botCom from "~/components/imglabel/btmCom.vue";
import imglabeFull from '~/components/imglabel/full'

export default {
  name: 'borderlabel',
  layout: 'default',
  data() {
    return {
      //right
      // barBtnList: [],
      isFirst: true,
      barInforTitle: 'barInforTitle',
      labelText: 'text',
      colorIndex: 0,
      //bottom
      activeIndex: 0,
      bottomList: [
        {
          width: 500,
          height: 313,
          path: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1720085928,323294607&fm=26&gp=0.jpg'
        },
        {
          width: 501,
          height: 300,
          path: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3965298892,3572838756&fm=26&gp=0.jpg'
        }
      ],
      orcFull: false,
      btnState: {
        del: false,
        all: false
      },
      initEventEmitter: null,
      isCorp: false,
      zoomScale: 0,
    }
  },
  components: {
    llpLabel,
    borderBase,
    barInfor,
    imglabeFull
  },
  computed: {
    imgScale(){
      return this.zoomScale+'%';
    }
  },
  destroyed(){
    document.onkeydown = null;
  },
  created() {
    if (this.$route.query.page) {
      this.curPagerNo = Number(this.$route.query.page)
    }
    if (process.client) {
      // this.init()
    }
    this.componentsManagement()
  },
  mounted() {
    this.initEvent()
      this.init()
  },
  methods: {
    init() {
      //
      this.initProject()
    },
    initEvent() {
      this.keydownEvent()
    },
    //组件通信管理
    componentsManagement() {
      //观察者
      this.initEventEmitter = {
        _events: {},
        subscribe(event,callback){
          if(!this._events[event]){
            this._events[event] = []
          }
          this._events[event].push(callback)
        },
        unSubscribe(event){
          if(this._events && this._events[event]){
            delete this._events[event]
          }
        },
        dispatch(event,...arg){
          if(!this._events[event]){
              return
          }
          let i ;
          for( i = 0 ; i<this._events[event].length ; i++){
            this._events[event][i](...arg)
          }
        }
      }
      // 关闭裁剪 重置 borderBase 状态
      this.initEventEmitter.subscribe('CLOSE_CROP',(val)=>{
        this.$refs.borderBase.openOperateingState(false)
      })
      // 图片拖动跨组件通信
      this.initEventEmitter.subscribe('OPEN_DRAG--svg',(val)=>{
        this.dragSvg = true
        this.$refs.borderBase.controlDragSvg(true)
      })
      this.initEventEmitter.subscribe('CLOSE_DRAG--svg',(val)=>{
        this.dragSvg = false
        this.$refs.borderBase.controlDragSvg(false)
      })
    },
    async initProject() {
      // await this.getProjectDetailById()
      // this.initLeft()
      // this.initRight()
      let item = this.bottomList[this.activeIndex]
      this.$refs.borderBase.setImg({
        width: item.width || 400,
        height: item.height || 400,
        url: item.path+`?t=${+ new Date()}`
      })
      this.borderLableInit()

    },
    initRight() {
      // this.initTagList()
      // this.initBottom()
    },
    async initTagList() {
      let {
        data
      } = await this.$axios.$post("/label/getTypeValueByProId", {
        proId: this.$route.query.proId
      });
      this.barBtnList = data.map((item) => {
        return {
          type: item.name,
          id: item.id,
        }
      })
      this.labelText = this.barBtnList[0].type
    },
    // 项目基本信息
    async getProjectDetailById() {
      let {
        data
      } = await this.$axios.$post("/labelpro/getProjectDetailById", {
        proId: this.$route.query.proId,
        status: 0
      });
      this.proName = data.proName;
      this.isSingle = data.isSingle;
      this.standLink = data.standardFile;
      this.txt = data.standard;
      this.showStandardName = data.showStandardName
    },
    setBtnState(obj){
      if(obj.length > 0){
        this.btnState.all = true
      }else{
        this.btnState.del = false
        this.btnState.all = false
        return
      }
      if(obj.filter(item=>item.svgFont).length > 0){
        this.btnState.del = true
      }else{
        this.btnState.del = false
      }
    },
    // 侧边连 init
    initLeft() {
      // 标注结果
      this.getImageCensus()
        .then(res => {
          this.mapGetImage(res)
        })
      // 标注进度
      this.initTypeList()
    },
    //侧边栏--标注进度
    async initTypeList() {
      let {
        data
      } = await this.$axios.$post("/labelimage/getImageLabelRate", {
        proId: this.$route.query.proId,
      });
      let obj = {};
      for (let i in data) {
        obj[data[i].name] = {
          count: data[i].count,
          rate: data[i].rate
        };
      }
      this.message = obj;
    },
    //侧边栏--图片标注页面侧边栏获取标注个数 标注结果
    getImageCensus() {
      // messageke
      let data = {
        proId: this.$route.query.proId
      }
      return new Promise((resolve) => {
        this.$axios.$post('/labelimage/getImageCensus', data)
          .then(res => {
            resolve(res)
          })
      })
    },
    mapGetImage(res) {
      let data = res.data
      this.resultList = data;
    },
    taskStand() {
      if (this.standLink) {
        window.location.href = this.$store.state.domain + "/pro/downloadStandardAccessory?standardFile=" + this.standLink + "&showStandardFile=" + this.showStandardName
      } else {
        this.$refs.stand.show()
      }
    },
    taskDetail() {
      if (this.isSingle) {
        let {
          href
        } = this.$router.resolve({
          path: "/singletaskdetail",
          query: {
            proId: this.$route.query.proId,
            back: "none"
          }
        })
        window.open(href, "_blank")
      } else {
        let {
          href
        } = this.$router.resolve({
          path: "/multaskdetail",
          query: {
            proId: this.$route.query.proId,
            back: "none"
          }
        })
        window.open(href, "_blank")
      }
    },
    // 侧边栏 人物操作 提交
    async commitTask() {
      // 多人
      if (this.isSingle) {
        // 单人
        let {
          code,
          msg
        } = await this.$axios.$post("/label/endSingleProject", {
          proId: this.$route.query.proId,
        });
        if (code == 0) {
          this.$message({
            message: msg,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.push({
                path: "/"
              })
            }
          });
        } else {
          this.$message({
            message: msg,
            type: "warning",
          });
        }
      } else {
        let {
          code,
          msg
        } = await this.$axios.$post("/label/updateUserProjectStautaByProIdAndUserId", {
          proId: this.$route.query.proId,
          userId: this.$getCookie("userId"),
          status: 6
        });
        if (code == 0) {
          this.$message({
            message: msg,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.push({
                path: "/"
              })
            }
          });
        } else {
          this.$message({
            message: msg,
            type: "warning"
          });
        }
      }
    },
    fixLabelText(index, type) {
      this.labelText = type
      this.colorIndex = index
    },
    // right border
    borderLableInit() {
      // this.$refs.borderBase.setImag
      this.$refs.borderBase.init()
    },

    // 键盘事件
    keydownEvent() {
      document.onkeydown = (e) => {
        let key = e.keyCode
        console.log('borderlabel__keydown--',e.keyCode,e.key)
        if (key === 37) {
          // this.preClick()
          this.checkPreClick()
        }
        if (key === 39) {
          this.checkNextClick()
          // this.nextClick()
        }
        if (key == 46) {
          this.deleteClick();
        }
         if (key == 13) {
          this.submitPre=false;
          this.submit();
        }
      }
    },
    showNoData(state) {
      this.notag = state;
      this.activeIndex = 0;
      this.initBottom();
    },
    setIndex(index) {
      this.activeIndex = index;
      this.setImg()
    },
    nextPage() {
      this.curPagerNo++;
      this.$router.push({
        path: `/borderlabel?page=${this.curPagerNo}` + "&proId=" + this.$route.query.proId
      })
      this.initBottom();
    },
    prePage() {
      if (this.curPagerNo != 1) {
        this.curPagerNo--;
        this.$router.push({
          path: `/borderlabel?page=${this.curPagerNo}` + "&proId=" + this.$route.query.proId
        })
        this.initBottom();
      } else {
        this.$message({
          message: "已经是第一页了",
          type: "warning"
        });
      }
    },
    changeBottom(page) {
      this.curPagerNo = page;
      this.$router.push({
        path: `/borderlabel?page=${this.curPagerNo}` + "&proId=" + this.$route.query.proId
      })
      this.initBottom();
    },
    async initBottom() {
      if (this.notag) {
        let params = {
          proId: this.$route.query.proId,
          labelType: 'BORDER',
        }
        this.$axios.$get("/imagePush/searchUnLabeledDataList",{
          params
        })
        .then(res => {
          this.mapBottom(res)
        })
      } else {
        this.getImgList()
        .then(res => {
          this.mapBottom(res)
        })
      }

    },
    getImgList() {
      // messageke
      let data = {
        proId: this.$route.query.proId,
        labelType: 4,
        currentPageNumber: this.curPagerNo,
        pageSize: 10
      }
      let url = this.isSingle ? '/imagePush/pushSingle' : '/imagePush/pushMore'
      return new Promise((resolve) => {
        this.$axios.$post(`${url}`, data)
          .then(res => {
            resolve(res)
          })
      })
    },
    mapBottom(res) {
      let {
        msg,
        code,
        data
      } = res
      if (code !== 0) {
        setTimeout(() => {
          this.curPagerNo--;
          this.$router.push({
            path: `/borderlabel?page=${this.curPagerNo}` + "&proId=" + this.$route.query.proId
          });
        }, 1000)
      } else {
        this.activeIndex = 0;
        this.total = data.rowsCount;
        this.$refs.bottomlist.currentPage = this.curPagerNo;
        if (this.notag) {
          this.bottomList = data;
          this.setImg()
        } else {
          this.bottomList = data.list;
          this.barInforTitle = data.list[this.activeIndex].name
          this.setImg()
        }
        for (let i in this.bottomList) {
          if (this.bottomList[i].drop != 'NO') {
            this.bottomList[i].color = "#97183E";
          } else {
            if (this.bottomList[i].status == 'DEFAULT') {
              this.bottomList[i].color = "";
            }
            if (this.bottomList[i].status == 'YES') {
              this.bottomList[i].color = "#346739";
            }
          }
        }
      }
    },
    setImg() {
      let item = this.bottomList[this.activeIndex]
      this.$refs.borderBase.setImg({
        width: item.width || 400,
        height: item.height || 400,
        url: item.path+`?t=${+ new Date()}`
      })

      item.oldValue = 0
      // this.isOverHeight = (item.height > 500 ?false:true)
      if (item.coordinate) {
        // 解决上一张图片 未画完毕跳转产生的问题
        this.delLabel()
        //
        let obj = this.mapCoordinate(item.coordinate)
        this.$refs.borderBase.setLabelObj(obj.labelObj,obj.pathArr)
        item.oldValue = obj.labelObj.length
      } else {
        this.delLabel()
      }
      if (this.isFirst) {
        this.borderLableInit()
        this.isFirst = false
      }
      if(item.status === 'DEFAULT' && !item.coordinate){
        this.isCorp = true
        // 初始化 图片裁剪状态
        this.initEventEmitter.dispatch('CLOSE_CROP')
      }else{
        this.isCorp = false
      }
      if(this.dragSvg){
        // 初始化状态
        this.initEventEmitter.dispatch('CLOSE_DRAG--svg')
      }
      this.barInforTitle = item.name
      this.zoomScale = 0
    },
    mapCoordinate(coordinate) {
      let obj = JSON.parse(coordinate)
      let {
        shapes,
        imageData
      } = obj;
      let {
        otherInfor,
        pathArr
      } = imageData
      // console.log(obj)
      return {
        'labelObj': (()=>{
            return shapes.map((item, index) => {
              return {
                stroke: item.line_color,
                svgFont: item.fill_color ? true : false,
                shape_type: item["shape_type"],
                circle: item.points.map(element => ({
                  cx: element[0],
                  cy: element[1]
                })),
                text: otherInfor[index].text,
                d: otherInfor[index].d,
                fill: item.fill_color ? item.line_color : "none",
                "fill-opacity": item.fill_color ? "0.75" : "0",
              }
          })
        })(),
        pathArr
      }
    },
    zoomOut(){
      let item  = this.bottomList[this.activeIndex]
      let dom = this.$refs.borderBase
      if(item.width < 200){
        return
      }
      //
      item.width = Math.round(item.width/11*10)
      item.height = Math.round(item.height/11*10)
      dom.fixImgSize(item.width,item.height,(num)=>(Math.round(num/11*10)))
      this.zoomScale -=10
    },
    full(){
      console.log('full')
      this.orcFull = !this.orcFull
      this.$refs.llpLabel.hideLeft()
    },
    zoom(){
      let item  = this.bottomList[this.activeIndex]
      let dom = this.$refs.borderBase
      if(item.width > 3000){
        return
      }
      item.width = Math.round(item.width*11/10)
      item.height = Math.round(item.height*11/10)
      dom.fixImgSize(item.width,item.height,(num)=>(Math.round(num*11/10)))
      this.zoomScale +=10
    },
    restZoom(){
      let item  = this.bottomList[this.activeIndex]
      let dom = this.$refs.borderBase
      let count = Math.abs(this.zoomScale/10);
      let scale = Math.pow(11,count);
      if(this.zoomScale > 0){
        item.width = Math.round(item.width/scale*Math.pow(10,count))
        item.height = Math.round(item.height/scale*Math.pow(10,count))
        dom.fixImgSize(item.width,item.height,(num)=>(Math.round(num/scale*Math.pow(10,count))))
        this.zoomScale = 0
      }else if(this.zoomScale < 0){
        item.width = Math.round(item.width*scale/Math.pow(10,count))
        item.height = Math.round(item.height*scale/Math.pow(10,count))
        dom.fixImgSize(item.width,item.height,(num)=>(Math.round(num*scale/Math.pow(10,count))))
        this.zoomScale = 0
      }
    },
    // 清空标签
    delLabel(drag) {
      this.$refs.borderBase.delLabel(drag)
    },
    // barInfor 操作
    //图形切换
    switchLabelGrap(drag) {
      if (drag === 0) {
        this.$refs.borderBase.rectangularLabel()
      } else if(drag === 1) {
        this.$refs.borderBase.irregularLabeling()
      }
    },
    crop(val) {
      let labelObj = this.getLabelArr()
      if(labelObj.length > 0){
        this.$confirm('该操作会清空现有标注结果是否继续', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
          this.$refs.borderBase.openOperateingState(true)
          this.isCut = (val === 1? true:false);
          this.delLabel()
        })
        .catch(() => {
          this.initEventEmitter.dispatch('CLOSE_CROP')
        });
      }else{
        this.$refs.borderBase.openOperateingState(true)
        this.isCut = (val === 1? true:false);
        this.delLabel()
      }
    },
    cropImg(){
      let labelObj = this.getLabelArr()
      let circle = labelObj[0].circle
      let x = circle[0].cx
        , y = circle[0].cy
        , w = Math.abs(circle[2].cx - x)
        , h = Math.abs(circle[2].cy - y);
      this.changeImageSize()
      .then(ress=>{
        if(ress.code === 0){
          this.imageCutOrCutout({
            x,
            y,
            width: w,
            height: h
          },this.isCut)
          .then(res=>{
            if(res.code === 0){
              // 刷新图片
              let item = this.bottomList[this.activeIndex]
              if(this.isCut){
                item.width = w
                item.height = h
              }
              this.setImg()
              // 子组件修改状态
              this.initEventEmitter.dispatch('CLOSE_CROP')

            }
          })
        }
      })

    },
    rotate(val) {
      console.log('旋转', val)
    },
    // bottom group 操作
    deleteClick() {
      this.dropImageOperation()
        .then(res => {
          if (res.code === 0) {
            this.bottomList[this.activeIndex].color = "#97183E";
            this.bottomList[this.activeIndex].already = false;
            this.$refs.bottomlist.$forceUpdate();
            // 标注结果
            this.nextClick();
            this.getImageCensus()
              .then(res => {
                this.mapGetImage(res)
              })
            // 标注进度
            this.initTypeList()

          }
        })
    },
    getLabelArr() {
      return this.$refs.borderBase.getLabelObjArr()
    },
    getPathArr() {
      return this.$refs.borderBase.getPathArr()
    },
    polygon2path(points) {
      var path = 'M' + points.slice(0, 2).join(' ') + 'L' + points.slice(2).join(' ') + 'z';
      return path;
    },
    mapTraformText(obj) {
      let {
        text,
        transformPoint
      } = obj
      let newText = JSON.parse(JSON.stringify(text));
      // 清楚按钮
      // newText.svgCloseStyle = null
      newText.x += transformPoint[0]
      newText.y += transformPoint[1]
      return newText
    },
    mapTraformPath(obj) {
      let {
        transformPoint,
        circle,
      } = obj
      let arr = circle.map(item => ([item.cx + transformPoint[0], item.cy + transformPoint[1]]))
      return this.polygon2path([].concat.apply([], arr))
    },
    submit() {
      let labelObj = this.getLabelArr()
      let pathArr = this.getPathArr()
      if (labelObj.length <= 0) {
        this.$message({
          message: "请标注数据!",
          type: "warning"
        });
        return
      }
      let item = this.bottomList[this.activeIndex]
      let imgW = item.width
      let imgH = item.height
      let path = item.path
      let content = {
        'version': '1.0.0',
        "flags": {},
        "shapes": [],
        "lineColor": [
          0,
          255,
          0,
          128
        ],
        "fillColor": [
          255,
          0,
          0,
          128
        ],
        "imagePath": path,
        "imageData": null,
        "imageHeight": imgW,
        "imageWidth": imgH
      }
      content.imageData = {
        'otherInfor': (()=>{
          return labelObj.map((item, index) => {
            item.text.svgCloseStyle = null
            return {
              text: item.transformPoint ? this.mapTraformText(item) : item.text,
              d: item.transformPoint ? this.mapTraformPath(item, index) : item.d,
            }
          })
        })(),
        pathArr
      }
      // console.log(content.imageData)
      content.shapes = labelObj.map(item => {
        return {
          "label": item.text.txt,
          "line_color": item.stroke,
          // "fill_color": item.svgFont ? item.stroke : null,
          "fill_color": null,
          "points": item.circle.map(element => {
            let x = element.cx
            let y = element.cy
            if (item.transformPoint) {
              x += item.transformPoint[0]
              y += item.transformPoint[1]
            }
            return [x, y]
          }),
          "shape_type": item["shape_type"]
        }
      })

      this.doLabelImageNotExampleOperation({
        content: JSON.stringify(content)
      })
      .then(res => {
        if (res.code === 0) {
          labelObj.forEach((element, index) => {
            if (element.transformPoint) {
              this.$refs.borderBase.setTransform(index)
            }
          });
          this.bottomList[this.activeIndex].coordinate = JSON.stringify(content);
          this.bottomList[this.activeIndex].color = "#346739";
          this.bottomList[this.activeIndex].oldValue = labelObj.length;
          this.$refs.bottomlist.$forceUpdate();
          if(this.submitPre){
            this.preClick()
          }else{
            this.nextClick();
          }
          // 刷新侧边栏
          this.getImageCensus()
            .then(res => {
              this.mapGetImage(res)
            })
          // 标注进度
          this.initTypeList()
          this.changeImageSize()
        }
      })
    },
    isGoSave(){
      let labelObj = this.getLabelArr()
      let item = this.bottomList[this.activeIndex]
      return new Promise((reslove,reject)=>{
         if(  labelObj.length !== item.oldValue ){
          document.onkeydown = null;
          this.$confirm('是否保存该标注信息?', '提示', {
            confirmButtonText: '保存',
            cancelButtonText: '不保存',
            type: 'warning'
          })
          .then(()=>{
            this.submit()
            this.keydownEvent()
          })
          .catch(() => {
            reject()
            this.keydownEvent()
          });
        }else{
          reject()
        }
      })
    },
    checkNextClick(){
      this.submitPre = false
      this.isGoSave()
      .catch(() => {
        this.nextClick()
      });
    },
    nextClick() {
      if (this.activeIndex >= this.bottomList.length - 1) {
        if (this.bottomList.length < 10) {
          this.$message({
            message: "已经是最后一条了",
            type: "warning"
          });
          this.setImg()
        } else {
          this.curPagerNo++;
          this.$router.push({
            path: `/borderlabel?page=${this.curPagerNo}` + "&proId=" + this.$route.query.proId
          })
          this.activeIndex = 0;
          this.initBottom();
        }
      } else {
        this.activeIndex++;
        this.setImg()
      }
    },
    checkPreClick(){
      this.submitPre = true
      this.isGoSave()
      .catch(() => {
        this.preClick()
      });
    },
    preClick() {
      if (this.activeIndex == 0) {
        if (this.curPagerNo != 1) {
          this.curPagerNo--;
          this.$router.push({
            path: `/borderlabel?page=${this.curPagerNo}` + "&proId=" + this.$route.query.proId
          })
          this.$refs.bottomlist.currentPage = this.curPagerNo;
          this.activeIndex = 9;
          this.initBottom();
        } else {
          this.$message({
            message: "已经是第一页了",
            type: "warning"
          });
          this.setImg()
        }
      } else {
        this.activeIndex--;
        this.setImg();
      }
    },
    //图片标注页面丢弃操作
    dropImageOperation() {
      let data = {
        proId: this.$route.query.proId,
        dataId: this.bottomList[this.activeIndex].id
      }
      return new Promise((resolve) => {
        this.$axios.$post('/labelimage/dropImageOperation', data)
          .then(res => {
            resolve(res)
          })
      })
    },
    //图片标注操作
    doLabelImageNotExampleOperation(option) {
      let data = {
        proId: this.$route.query.proId,
        dataId: this.bottomList[this.activeIndex].id,
        content: ''
      }
      Object.assign(data, option)
      return new Promise((resolve) => {
        this.$axios.$post('/labelimage/doLabelImageNotExampleOperation', data)
          .then(res => {
            resolve(res)
          })
      })
    },
    //fix server img
    changeImageSize(){
      let item = this.bottomList[this.activeIndex]
      let data = {
        id: item.id,
        width: Math.ceil(item.width),
        height: Math.ceil(item.height),
      }
      return new Promise((resolve) => {
        this.$axios.$post('/image/changeImageSize', data)
          .then(res => {
            resolve(res)
          })
      })
    },
    // cut
    imageCutOrCutout(option,cut){
      let item = this.bottomList[this.activeIndex]
      let data = {
        id: item.id,
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
      let url = cut?'/image/cut':'/image/cutOut'
      Object.assign(data, option)
      return new Promise((resolve) => {
        this.$axios.$post(url, data)
          .then(res => {
            resolve(res)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/scss/mixins';

.img-label {
  width: 100%;
  height: calc(100% - 50px);
  position: relative;

  .message .title {
    font-size: 16px;
    color: #8794AA;
    margin-bottom: 15px;
    letter-spacing: 1px;
  }

  .aside-tag {
    height: 91px;
    box-sizing: border-box;
    padding: 17px 16px 16px 26px;
    border-bottom: 1px solid #1D1E1F;

    .tag {
      .icon {
        float: left;
        width: 16px;
        height: 16px;
        margin-top: 2px;
        margin-right: 8px;
      }

      .txt {
        float: left;
        font-size: 14px;
        color: #FFFFFF;
      }
    }
  }

  .bottom-group {
    width: 100%;
    height: 58px;
    @include classflex(flex-start);
    background: rgba(195, 215, 232, 0.18);
    user-select: none;
    .gruop {
      @include classflex(flex-end);
      width: 100%;
      flex-direction: row;

      .pre {
        cursor: pointer;
        width: 60px;
        height: 36px;
        margin-top: 12px;
        text-align: center;
        background: #626C76;
        border-radius: 2px;
        border-radius: 2px;

        img {
          width: 25px;
          height: 25px;
          margin-top: 6px;

        }
      }

      .next {
        cursor: pointer;
        width: 60px;
        height: 36px;
        margin-left: 16px;
        margin-top: 12px;
        text-align: center;
        background: #626C76;
        border-radius: 2px;
        border-radius: 2px;

        img {
          width: 25px;
          height: 25px;
          margin-top: 6px;

        }
      }

      .yes {
        cursor: pointer;
        width: 60px;
        height: 36px;
        margin-left: 34px;
        margin-top: 12px;

        text-align: center;
        background: #10B66F;
        border-radius: 2px;
        border-radius: 2px;

        img {
          width: 25px;
          height: 25px;
          margin-top: 6px;

        }
      }

      .delete {
        cursor: pointer;
        width: 60px;
        height: 36px;
        margin-left: 16px;
        margin-top: 12px;
        margin-right: 30px;
        text-align: center;
        background: #D12B2B;
        border-radius: 2px;
        border-radius: 2px;

        img {
          width: 25px;
          height: 25px;
          margin-top: 6px;

        }
      }
    }
  }
}
</style>
