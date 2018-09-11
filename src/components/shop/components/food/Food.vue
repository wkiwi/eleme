<template>
    <transition name="movefood">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img class="img" :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <span class="back-wrapper">
                            <i class="icon-arrow_lift"></i>
                        </span>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{ food.rating }}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{ food.price }}</span><span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                    </div>
                    <transition name="fade">
                        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{ food.info }}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <reating-select :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></reating-select>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControl from 'common/cartcontrol/CartControl'
import Split from 'common/split/Split'
import Bus from '@/assets/js/eventBus'
import ReatingSelect from '../reatingselect/ReatingSelect'
/* const POSITIVE = 0
const NEGATIVT = 1 */
const ALL = 2
export default {
    name: 'Food',
    props: {
        food: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
        show () {
            this.showFlag = true
            this.selectType = ALL
            this.conlyContent = true
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        hide () {
            this.showFlag = false
        },
        addFirst (event) {
            if (!event._constructed) {
                return false
            } else {
                /* 分发监听给上级组件v-goods */
                Bus.$emit('cartAdd', event.target)
                Vue.set(this.food, 'count', 1)
            }
        }
    },
    components: {
        CartControl,
        Split,
        ReatingSelect
    },
    created () {
        /* 获取子组件的selectType的更新 */
        Bus.$on('ratingtype.select', selectType => {
            this.selectType = selectType
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        })

        Bus.$on('ratingcontent.toggle', onlyContent => {
            this.onlyContent = onlyContent
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        })
    }
}
</script>

<style scoped lang="stylus">
    .food
        position: fixed
        left: 0
        top: 0
        bottom: .96rem
        z-index: 30
        width: 100%
        background: #ffffff
        transform: translate3d(0, 0, 0)
        transition: all .2s linear
        opacity: 1
        &.movefood-enter-active, &.movefood-leave-active
            transform: translate3d(100%, 0, 0)
            opacity: 0
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            .img
                position: absolute 
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
                position: absolute 
                top: .2rem
                left: 0
                .back-wrapper
                    padding: .1rem
                    display:block
                    .icon-arrow_lift
                        padding: .1rem
                        display:block
                        font-size: .4rem
                        color: #ffffff
                        background: rgba(7,17,27,.4)
                        border-radius: 50%
        .content
            padding: .36rem
            position: relative
            .title
                line-height: .28rem
                margin-bottom: .16rem
                font-size: .28rem
                font-weight: 700
                color: rgb(7,17,27)
            .detail
                margin-bottom: .36rem
                line-height: .2rem
                font-size: 0
                .sell-count,.rating
                    font-size: .2rem
                    color: rgb(147,153,159)
                .sell-count
                    margin-right: .24rem
            .price 
                font-weight: 700
                line-height: 24px
                .now 
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                .old 
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .cartcontrol-wrapper
                position: absolute
                right: .24rem
                bottom: .24rem
            .buy
                position: absolute 
                right: .36rem
                bottom: .36rem
                z-index: 10
                height: .48rem
                line-height: .48rem
                padding: 0 .24rem
                font-size: .2rem
                box-sizing: border-box
                color: #ffffff
                border-radius: .24rem
                background: rgb(0,120,220) 
                &.fade-enter-active, &.fade-leave-active 
                    transition: opacity .5s
                &.fade-enter, &.fade-leave-active 
                    opacity: 0
        .info
            padding: .36rem         
            .title 
                line-height: .28rem
                margin-bottom: .12rem
                font-size: .28rem
                color: rgb(7, 17, 27)
            .text 
                line-height: .48rem
                padding: 0 .16rem
                font-size: .24rem
                color: rgb(77, 85, 93)
        .rating
            padding-top: .36rem
            .title 
                line-height: .28rem
                margin-left: .36rem
                font-size: .28rem
                color: rgb(7, 17, 27)
                       
</style>
