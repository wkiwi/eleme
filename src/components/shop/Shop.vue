<template>
    <div class="app">
        <shop-header :seller="seller"></shop-header>
        <div class="tab border-bottom">
            <router-link to="/" tag="div" class="tab-item ">
                <div >商品</div>
            </router-link>
            <router-link to="/ratings" tag="div" class="tab-item">
                <div >评论</div>
            </router-link>
            <router-link to="/seller" tag="div" class="tab-item">
                <div >商家</div>
            </router-link>
        </div>
        <keep-alive>
            <router-view :seller="seller"/>
        </keep-alive>
    </div>
</template>

<script>
import axios from 'axios'
import ShopHeader from './components/header/Header'
import ShopCart from './components/cart/Cart'
import {urlParse} from '@/assets/js/util'
export default {
  name: 'Shop',
  data () {
      return {
          seller: {
              id: (() => {
                  let queryParam = urlParse()
                  console.log(queryParam)
                  return queryParam.id
              })()
          }
      }
  },
  components: {
      ShopHeader,
      ShopCart
  },
  methods: {
    getInfo: function () {
        axios.get('/api/seller.json?id=' + this.seller.id)
        .then(this.handleGitInfoSucc)  
    },
    handleGitInfoSucc: function (res) {
        const data = res.data
        console.log(data)
        /* this.seller = data */
        this.seller = Object.assign({}, this.seller, data)
    }
  },
  mounted () {
        this.getInfo()
  }
}
</script>

<style scoped lang="stylus">
    .app
        .tab
            display: flex
            width: 100%
            height: .8rem
            line-height: .8rem
            .tab-item
                flex:1
                text-align: center
                font-size: .28rem
                color: rgb(77, 85, 93)
            .tab-item.active
                color: rgb(240, 20, 20)
                
</style>
