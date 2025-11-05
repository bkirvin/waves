const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SplashPage.vue') },
      { path: '/game', component: () => import('pages/GamePage.vue') }
    ]
  },
  {
    path: '/site',
    component: () => import('layouts/SiteLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SitePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
