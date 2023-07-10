import type { App } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './index.css'

export default {
  install(app: App) {
    NProgress.configure({
      showSpinner: false,
    })
    return app
  },
}
