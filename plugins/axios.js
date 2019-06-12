import {getCookie} from '../utils/cookie';
import Qs from 'qs'
import { Loading, Message } from 'element-ui';

export default function ({ store, $axios, redirect,}) {
  let loadingInstance  = null
  let uploadUrl = [
    '/pro/uploadDataToRedis',
    '/pro/uploadExcelModel',
    '/pro/uploadDictOrScript',
    '/pro/uploadStandard',
    '/pro/uploadLabelDict',
    '/pro/uploadStandardAccessory'
  ]
  let hideUrl = [
    '/model/prepareExecuteModel', //预标注模型
    '/pro/checkProName', // 名称校验
    '/elensuser/getUserRole', // 获取用户权限
    '/pro/getLabelDataNum', // 获取人员已经标注的条数
    '/labelpro/getNeedCheckEachOther', //是否需要交叉验证
    '/pro/checkEachOthe', //交叉验证
    '/pro/showProList', // 任务列表
    '/census/getProjectListByToken', //任务管理列表
    '/census/getUserListByToken', //人员管理列表
    '/label/doLabelExampleOperation',//标注分类
    '/label/doLabelNotExampleOperation',//标注分类
    '/census/getLabelAccuracy',//模型准确度
    '/census/getLabelRate',//标注分类
    '/census/getEntityAndCateCensus',//标注分类
    '/message/getHavenotReadorNot', // 消息推送
  ] // no loading
  $axios.onRequest(config => {
    if(uploadUrl.indexOf(config.url) <= -1){
      if(hideUrl.indexOf(config.url) <= -1){
      // console.log(config.url)
        loadingInstance = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        });
      }
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      }
      let token = getCookie("token")
      if(token){
        if(!config.data){
          config.data = {}
        }
        if(!config.params){
          config.params = {}
        }
        store.commit('setToken',token.replace(/\%3D/ig,'='))
        if(config.method=="get"){
          config.params.token = token.replace(/\%3D/ig,'=');
        }
        if(config.method=="post"){
          config.data.token = token.replace(/\%3D/ig,'=')
        }
      }
      if(config.method=="post"){
        config.data = Qs.stringify(config.data);
      }

    }
    console.log('Making request to ' + config.baseURL+config.url)
  })

  $axios.onError(error => {
    loadingInstance && loadingInstance.close()
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/login')
    }
    if (code === 403) {
      redirect('/403')
    }
    if (code === 404) {
      redirect('/404')
    }
    if (code === 500) {
      redirect('/500')
    }
  })

  $axios.onResponse(response => {
    // console.log(response.config.url.replace(response.config.baseURL,''),response)
    if(uploadUrl.concat(hideUrl).indexOf(response.config.url.replace(response.config.baseURL,'')) <= -1){
      loadingInstance && loadingInstance.close()
    }
    let hideErrorMessage = [
      '/system/login'
    ]
    let config = response.config
    response = response.data
    if(response.code !== 0){
      if(hideErrorMessage.indexOf(config.url.replace(config.baseURL,'')) <= -1){
        Message({
          message: response.msg,
          type: 'error'
        })
      }
    }
  })
}
