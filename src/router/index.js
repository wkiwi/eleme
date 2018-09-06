import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/shop/Shop'
import Goods from '@/components/shop/goods/Goods'
import Ratings from '@/components/shop/ratings/Ratings'
import Seller from '@/components/shop/seller/Seller'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop,
      children: [{
          path: '',
          name: 'ShopGoods',
          component: Goods
      },
      {
          path: '/ratings',
          name: 'ShopRatings',
          component: Ratings
      },
      {
          path: '/seller',
          name: 'ShopSeller',
          component: Seller
      }]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
