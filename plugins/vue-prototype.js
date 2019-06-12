import L_ from 'lodash'
import md5 from 'js-md5'
import Vue from 'vue'
import {getCookie, delCookie, setCookie } from '../utils/cookie'
import helper from '../utils/helper'
Vue.prototype.$getCookie = getCookie
Vue.prototype.$delCookie = delCookie
Vue.prototype.$setCookie = setCookie
Vue.prototype.$md5 = md5
Vue.prototype.$_ = L_
Vue.prototype.$helper = helper
Vue.prototype.$bus = new Vue()
