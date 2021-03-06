<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img  :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
        <fade-animation>
        <div v-show="detailShow" class="detail" >
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) of seller.supports" :key="index">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span><span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
        </fade-animation>
    </div>
</template>

<script type="text/ecmascript-6">
import Star from '@/common/star/Star'
import FadeAnimation from '@/common/fade/fadeAnimation'
export default {
    name: 'ShopHeader',
    components: {
        Star,
        FadeAnimation
    },
    props: {
        seller: Object
    },
    data () {
        return {
            detailShow: false
        }
    },
    created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
        showDetail () {
            this.detailShow = true
        },
        hideDetail () {
            this.detailShow = false
        }
    }
}
</script>

<style  lang="stylus" scoped>
    @import "~styles/common.styl"
    .header
        position: relative
        overflow: hidden
        color: #fff
        background: rgba(7,17,27,0.5)
        .content-wrapper
            padding:.48rem .24rem .36rem .48rem
            font-size: 0
            position: relative
            .avatar
                display: inline-block
                vertical-align: top
                img
                    width: 1.28rem
                    height: 1.28rem
                    border-radius: .04rem
            .content
                display: inline-block
                font-size: .28rem
                margin-left: .32rem
                .title
                    margin: .04rem 0 .16rem 0
                    .brand
                        display: inline-block
                        vertical-align: top
                        width: .6rem
                        height: .36rem
                        bg-img('brand')
                        background-size: .6rem .36rem
                        background-repeat: no-repeat
                    .name
                        margin-left: .12rem
                        font-size: .32rem
                        line-height: .36rem
                        font-weight: bold
                .description
                    margin-bottom: .2rem
                    font-size: .24rem
                    line-height: .24rem
                .support
                    .icon
                        display: inline-block
                        vertical-align: top
                        margin-top: .02rem
                        width: .24rem
                        height: .24rem
                        margin-right: .08rem
                        background-size: .24rem .24rem
                        background-repeat: no-repeat
                        &.decrease
                            bg-img('decrease_1')
                        &.discount
                            bg-img('discount_1')
                        &.guarantee
                            bg-img('guarantee_1')
                        &.invoice
                            bg-img('invoice_1')
                        &.special
                            bg-img('special_1')
                    .text
                        line-height: .24rem
                        font-size: .2rem
            .support-count
                position: absolute
                right: .24rem
                bottom: .28rem
                padding: 0 .16rem
                height: .48rem
                line-height: .48rem
                border-radius: .28rem
                background: rgba(0,0,0,0.2)
                text-align: center
                .count
                    font-size: .2rem
                .icon-keyboard_arrow_right
                    font-size: .2rem
                    line-height: .48rem
                    margin-left: .04rem
        .bulletin-wrapper
            position: relative
            height: .56rem
            line-height: .56rem
            padding:0 .44rem 0 .24rem
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
            background: rgba(7,17,27,.2)
            .bulletin-title
                display: inline-block
                vertical-align: top
                margin-top: .16rem 
                width: .44rem
                height: .24rem
                bg-img('bulletin')
                background-size: .44rem .24rem
                background-repeat: no-repeat
            .bulletin-text
                font-size: .2rem
                margin: 0 .08rem
            .icon-keyboard_arrow_right
                position: absolute 
                font-size: .2rem
                right: .24rem
                top: .16rem
        .background
            position:absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            z-index: -1
            filter: blur(.2rem)
            img 
                width: 100%
                height: 100%
        .detail
            position: fixed
            z-index: 100
            top: 0
            left: 0
            width: 100%
            height: 100%
            overflow:auto
            background: rgba(7,17,27,0.8)
            .detail-wrapper
                min-height: 100%
                width: 100%
                .detail-main
                    margin-top: 1.28rem
                    padding-bottom:1.28rem
                    .name
                        line-height: .32rem
                        text-align: center
                        font-size: .32rem
                        font-weight: 700
                    .star-wrapper
                        margin-top: .36rem
                        padding: .04rem 0
                        text-align: center
                    .title
                        display: flex
                        width: 80%
                        margin: .56rem auto .48rem auto
                        .line
                            flex: 1
                            position: relative
                            top: -0.12rem
                            border-bottom: 1px solid rgba(255,255,255,.2)
                        .text
                            padding: 0 .24rem
                            font-size: .28rem
                            font-weight: 700
                    .supports
                        width: 80%
                        margin: 0 auto 
                        .support-item
                            padding: 0 .24rem
                            margin-bottom: .24rem
                            font-size:0
                            &:last-child
                                margin-bottom: 0
                            .icon
                                display:inline-block
                                vertical-align: top
                                width: .32rem
                                height: .32rem
                                margin-right: .12rem
                                background-size: .32rem .32rem
                                background-repeat:no-repeat
                                &.decrease
                                    bg-img('decrease_2')
                                &.discount
                                    bg-img('discount_2')
                                &.guarantee
                                    bg-img('guarantee_2')
                                &.invoice
                                    bg-img('invoice_2')
                                &.special
                                    bg-img('special_2')
                            .text
                                font-size: .24rem
                                line-height: .32rem
                    .bulletin
                        width: 80%
                        margin: 0 auto 
                        .content
                            padding: 0 .24rem
                            line-height: .48rem
                            font-size: .24rem
            .detail-close
                position: relative
                width: .64rem
                height: .64rem
                margin: -1.28rem auto 0 auto
                clear: both
                font-size: .64rem
</style>
