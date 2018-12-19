import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '@/layouts/AppLayout'
import UserLayout from '@/layouts/UserLayout'
import CookiesPolicyLayout from '@/layouts/CookiesPolicyLayout'
import MainContent from '@/components/content/MainContent'
import AdminAuthentificationContent from '@/components/content/AdminAuthentificationContent'
import AuthentificationContent from '@/components/content/AuthentificationContent'
import SignUpContent from '@/components/content/SignUpContent'
import SnakeGameContent from '@/components/content/SnakeGameContent'
import PenduGameContent from '@/components/content/PenduGameContent'
import AdminPanelContent from '@/components/content/AdminPanelContent'
import ScoreBoardContent from '@/components/content/ScoreBoardContent'
import GoldenBookContent from '@/components/content/GoldenBookContent'
import DashboardUserContent from '@/components/content/DashboardUserContent'

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
      component: UserLayout, // UserLayout
      children: [
        { path: '', component: DashboardUserContent },
        { path: '/user-panel/games-snake', component: SnakeGameContent },
        { path: '/user-panel/games-pendu', component: PenduGameContent }
      ]
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminAuthentificationContent  // AdminLayout
    },
    {
      path: '/admin-panel',
      name: 'admin-panel',
      component: AdminPanelContent, // AdminLayout
      props: true
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
