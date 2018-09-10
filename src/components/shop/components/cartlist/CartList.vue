<template>
    <div class="shopcart-list">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-contet" ref="listcontet">
            <ul>
                <li class="food border-bottom" v-for="(food,index) in selectFood" :key="index">
                    <span class="name">{{food.name}}</span>
                    <div class="price">￥{{food.price * food.count}}</div>
                    <div class="cartcontrol-wrapper">
                        <cart-control :food="food"></cart-control>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import CartControl from 'common/cartcontrol/CartControl'
import BScroll from 'better-scroll'
export default {
    name: 'ShopcartList',
    props: {
        selectFood: {
            type: Array
        },
        listShow: {
            type: Boolean
        }
    },
    data () {
        return {

        }
    },
    watch: {
        listShow: function () {
            if (!this.scroll) {
                this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.listcontet, {
                    click: true
                    })
                })
            } else {
                this.scroll.refresh()
            }
        }
    },
    components: {
        CartControl
    },
    methods: {
        empty: function () {
            this.selectFood.forEach((food) => {
                food.count = 0
            })
        }
    }
}
</script>

<style scoped lang="stylus">
.shopcart-list
    position: absolute
    top: 0
    left: 0
    z-index: -1
    width: 100%
    transition: all .5s
    transform: translate3D(0,-100%,0)
    &.fold-enter-active,&.fold-leave-active
        transform: translate3D(0,0,0)
    .list-header
        height: .8rem
        line-height: .8rem
        padding: 0 .32rem
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,.1)
        .title
            float: left
            font-size: .28rem
            color: rgb(7,17,27)
        .empty
            float: right
            font-size: .24rem
            color: rgb(0,160,220)
    .list-contet
        padding: 0 .36rem
        max-height: 4.34rem
        background: #ffffff
        overflow: hidden
        .food
            position: relative
            padding: .24rem 0
            box-sizing: border-box
            &:last-child
                &::before
                    border:none
            .name
                line-height: .48rem
                font-size: .28rem
                color: rgb(7,17,27)
            .price
                position: absolute
                right: 2rem
                bottom: .24rem
                line-height: .48rem
                font-size: .28rem
                font-weight: 700
                color: rgb(240,20,20)
            .cartcontrol-wrapper
                position: absolute 
                right: 0
                bottom: .15rem
</style>
