/**
 * Created by sioxa on 2016/12/29 0029.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'
import Album from './components/album.vue'
import Singer from './components/singer.vue'
import RankPage from './components/RankPage.vue'
import Cd from './components/cd.vue'

Vue.use(VueRouter)
const routes=[
      { 
        path: '/',
        name:'index', 
        component: index,
        children:[
          { 
            path: '/singer/:id',
            name:'singer', 
            component: Singer 
          },
          { 
            path: '/album/:id',
            name:'album',
            component: Album 
          },
          { 
            path: '/rank/:id',
            name:'rank',  
            component: RankPage 
          },
          { 
            path: '/cd/:id',
            name:'cd',  
            component: Cd 
          }
        ]
      }
    ]
  Vue.use(VueRouter)

export default new VueRouter({
  routes,
  //只在history模式下有用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
