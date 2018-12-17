import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '@/layouts/AppLayout'
import CookiesPolicyLayout from '@/layouts/CookiesPolicyLayout'
import MainContent from '@/components/content/MainContent'
import AdminAuthentificationContent from '@/components/content/AdminAuthentificationContent'
import AuthentificationContent from '@/components/content/AuthentificationContent'
import SignUpContent from '@/components/content/SignUpContent'
import UserPanelContent from '@/components/content/UserPanelContent'
import ScoreBoardContent from '@/components/content/ScoreBoardContent'
import GoldenBookContent from '@/components/content/GoldenBookContent'

Vue.use(Router)

export default new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/cookie-policy',
      component: CookiesPolicyLayout
    },
    {
      path: '/user-panel',
      component: UserPanelContent // UserLayout
    },
    {
      path: '/admin-panel',
      component: AdminAuthentificationContent  // AdminLayout
    },
    {
      path: '/games',
      component: AppLayout, // GameLayout
      children: [
        { path: '/snake', component: MainContent },
        { path: '/plus-moins', component: MainContent },
        { path: '/pendu', component: MainContent }
      ]
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', component: MainContent },
        { path: '/login', component: AuthentificationContent },
        { path: '/signup', component: SignUpContent },
        { path: '/golden-book', component: GoldenBookContent },
        { path: '/score-board', component: ScoreBoardContent }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
