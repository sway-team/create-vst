/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
  /**
   * 接口请求的 base url
   */
  VITE_BASE_URL: string

  /**
   * 静态资源的 public path
   */
  VITE_PUBLIC_PATH: string

  /**
   * 前端监控日志上传的 appid
   */
  VITE_XES_FE_LOG_APPID: string

  /**
   * 前端监控日志上传的 eventid
   */
  VITE_XES_FE_LOG_EVENTID: string
}
