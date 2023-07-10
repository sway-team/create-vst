import type { App } from 'vue'
import { setGlobalOptions } from 'vue-request'

export default {
  install(app: App) {
    // 全局配置：https://www.attojs.com/api/global-options.html#%E5%85%AC%E5%85%B1%E9%80%89%E9%A1%B9
    setGlobalOptions({
      manual: true,
      // ...
    })

    return app
  },
}
