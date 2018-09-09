<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu-wrapper">
            <ul>
                <li v-for="(item,index) of goods" :key="index" class="menu-item border-bottom" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text">
                        <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" v-show="goods" ref="foods-wrapper">
            <ul>
                <li v-for="(item, index) of goods" :key="index" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food, ind) of item.foods" :key="ind" class="food-item border-bottom">
                            <div class="icon">
                                <img :src="food.icon" alt="" class="img">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cart-control :food="food"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-cart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    </div>
</template>

<script type="text/ecmascript-6">
import ShopCart from '../cart/Cart'
import BScroll from 'better-scroll'
import axios from 'axios'
import CartControl from 'common/cartcontrol/CartControl'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'ShopGoods',
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        CartControl,
        ShopCart
    },
    created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        this.getInfo()
        Bus.$on('cartAdd', (e) => {
            /* 体验优化，异步执行下落动画 */
             this.$nextTick(() => {
                this.$refs.shopcart.drop(e)
            })
        }) 
    }, 
    data () {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0
        }
    },
    computed: {
        currentIndex () {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0
        }
    },
    methods: {
        getInfo: function () {
        axios.get('/api/goods.json')
        .then(this.handleGitInfoSucc)  
        },
        handleGitInfoSucc: function (res) {
            const data = res.data
            console.log(data)
            this.goods = data
            // DOM 更新了 操作dom时一定要在$nextTick里
            this.$nextTick(() => {
                this._initScroll()
                this._calculateHeight()
            })
        },
        _initScroll: function () {
            this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
                click: true
            }) 
            this.FoodsScroll = new BScroll(this.$refs['foods-wrapper'], {
                probeType: 3,
                click: true
            })
            this.FoodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight: function () {
            const element = this.$refs['foods-wrapper']
            let foodList = element.getElementsByClassName('food-list-hook')
            console.log(foodList)
            let height = 0
            this.listHeight.push(height)
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            } 
            console.log(this.listHeight)
        },
        selectMenu: function (index, event) {
            // better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点击
            if (!event._constructed) {
                return
            }
            // 获取食物的li Dom节点列表
            const element = this.$refs['foods-wrapper']
            let foodList = element.getElementsByClassName('food-list-hook')
            let el = foodList[index]
            // 调用better-scroll 方法滚动到响应位置
            this.FoodsScroll.scrollToElement(el, 300)
        }
    }
    
}
</script>

<style scoped lang="stylus">
    @import "~styles/common.styl"
    .goods 
        display: flex
        position: absolute
        top: 3.48rem
        bottom: .92rem
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 1.6rem
            width: 1.6rem
            background: #f3f5f7
            .menu-item
                display: table
                height: 1.08rem
                width: 1.12rem
                line-height: .28rem
                padding: 0 .24rem
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -0.02rem
                    background: #ffffff
                    font-weight: 700
                    .text
                        border: none
                .icon
                    display: inline-block
                    vertical-align: top
                    width: .24rem
                    height: .24rem
                    margin-right: .04rem
                    background-size: .24rem .24rem
                    background-repeat: no-repeat
                    &.decrease
                        bg-img('decrease_3')
                    &.discount
                        bg-img('discount_3')
                    &.guarantee
                        bg-img('guarantee_3')
                    &.invoice
                        bg-img('invoice_3')
                    &.special
                        bg-img('special_3')  
                .text
                    display: table-cell
                    width: 1.12rem
                    vertical-align: middle
                    font-size: .24rem 
        .foods-wrapper
            flex: 1
            .title
                padding-left: .24rem
                height: .52rem 
                line-height: .52rem
                border-left: .04px solid #d9dde1
                font-size: .24rem
                color: rgb(147,153,159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: .36rem
                padding-bottom: .36rem
                &:last-child
                    &::before
                        border: none
                        margin-bottom: 0
                .icon
                    width: 1.14rem
                    height: 1.14rem
                    flex: 0 0 1.14rem
                    margin-right: .2rem
                    .img
                        width: 1.14rem
                        height: 1.14rem
                .content
                    flex:1  
                    .name
                        margin: .04rem 0 .16rem 0
                        height: .28rem
                        line-height: .28rem
                        font-size: .28rem
                        color: rgb(7,17,27)
                    .desc, .extra 
                        line-height: .2rem
                        font-size: .2rem
                        color: rgb(147,153,159)
                    .desc
                        margin-bottom: .16rem
                        line-height: .24rem
                    .extra
                        .count
                            margin-right: .24rem
                    .price
                        font-weigt: 700
                        line-height: .48rem
                        .now
                            margin-right: .36rem
                            font-size: .28rem
                            color: rgb(240,20,20)
                        .old
                            text-decoration: line-through
                            font-size: .2rem
                            color: rgb(147,153,159)   
                    .cartcontrol-wrapper
                        position: absolute 
                        right: 0
                        bottom: .24rem              
</style>
