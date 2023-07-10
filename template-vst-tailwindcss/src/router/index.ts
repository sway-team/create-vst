import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async () => {
  NProgress.start()
  // return to
})

router.afterEach(() => {
  NProgress.done()
})

export default router
