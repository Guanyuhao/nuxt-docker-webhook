
const baseUrl = (() => {
  if(process.env.NODE_ENV === 'production') {
    return process.env.API_URL
  } else {
    return '/api';
  }
})();

const proxy = (()=>{
  if(process.env.NODE_ENV === 'production') {
    return false;
  } else {
    return true;
  }
})();
console.log(process.env.NODE_ENV,baseUrl,proxy)

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '智慧标注平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
     "~/assets/styles/css/reset.css",
     "~/assets/styles/scss/elui.scss",
    // lib codemirror css
    'codemirror/lib/codemirror.css',
    // merge css
    // 'codemirror/addon/merge/merge.css',
    // theme css
    // 'codemirror/theme/base16-dark.css',
    // 'codemirror/theme/base16-light.css',
    // quill
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
    '@/plugins/element-ui',
    '~/plugins/axios',
    {
      src: '~/plugins/vue-prototype',ssr: false
    },
    {
      src: '~plugins/codemirrorn.js', ssr: false
    },
    {
      src: '~plugins/nuxt-quill.js', ssr: false
    }
  ],
  router: {
    mode: 'history',
    middleware: 'auth'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: proxy, //build proxy 必须为false
    credentials: true,
    baseURL: baseUrl,
    prefix: proxy? baseUrl: '/'
  },
  proxy: {
    '/api':{
       target:"http://192.168.1.244:8901/lensLabel/", // 244 test
      // target:"http://101.254.159.164:8901/lensLabel/",
      // target: "http://192.168.1.32:8080/", //刘子平
      //target: "http://192.168.1.233:7901/lensLabel/", // 测试服务器
      changeOrigin:true,
      pathRewrite:{
       '^/api':''
       }
     }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    vendor: [
      '@nuxtjs/axios',
      '~plugins/vue-prototype.js',
      'element-ui',
    ]
  }
}
