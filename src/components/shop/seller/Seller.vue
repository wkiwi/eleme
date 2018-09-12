<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star lass="star" :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark border-top">
                    <li class="block border-right">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block border-right">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <div class="title">公告与活动</div>
                <div class="content-wrapper border-bottom">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-bottom" v-for="(item,index) of seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span><span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="pic-wrapper">
                    <ul class="pic-list" ref="pic-list">
                        <li class="pic-item" v-for="(pic,index) of seller.pics" :key="index">
                            <img class="img" :src="pic" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item border-top" v-for="(info,index) of seller.infos" :key="index">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/assets/js/store'
import Star from 'common/star/Star'
import Split from 'common/split/Split'
export default {
    name: 'ShopSeller',
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            favorite: (() => {
                return loadFromLocal(this.seller.id, 'favorite', false)
            })()
        }
    },
    computed: {
        favoriteText () {
            return this.favorite ? '已收藏' : '收藏'
        }
    },
    created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted () {
        this._initScroll()
        this._initPics()
    },
    watch: {
        seller: function () {
            console.log('00000')
            this._initScroll()
            this._initPics()
        }
    },
    methods: {
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.seller, {
                            click: true
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        _initPics () {
            if (this.seller.pics) {
                let picWidth = 120
                let margin = 6
                let width = (picWidth + margin) * this.seller.pics.length - margin
                this.$refs['pic-list'].style.width = width + 'px'
                console.log(width + 'px')
                if (!this.scrollPic) {
                        this.$nextTick(() => {
                            this.scrollPic = new BScroll(this.$refs['pic-wrapper'], {
                                click: true,
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        })
                } else {
                    this.scrollPic.refresh()
                }
            }
        },
        toggleFavorite (event) {
            if (!event._constructed) {
                return 
            }
            this.favorite = !this.favorite
            saveToLocal(this.seller.id, 'favorite', this.favorite)
        }
    },
    components: {
        Star,
        Split
    }
}
</script>

<style scoped lang="stylus">
    @import "~styles/common.styl"
    .seller
        position: absolute 
        top: 3.48rem
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .overview
            position: relative
            padding: .36rem
            .title
                margin-bottom: .16rem
                line-height: .28rem
                color: rgb(7,17,27)
                font-size: .28rem
            .desc
                padding-bottom: .36rem
                font-size: 0
                .star
                    display:inline-block
                    margin-right: .16rem
                    vertical-align: top
                .text
                    display:inline-block
                    vertical-align: top
                    line-height: .36rem
                    margin-right: .24rem
                    font-size: .2rem
                    color: rgb(77,85,93)
            .remark
                display: flex
                padding: .36rem .36rem 0 .36rem
                .block
                    flex: 1
                    text-align  center
                    h2
                        margin-bottom: .08rem
                        line-height: .2rem
                        font-size: .2rem
                        color: rgb(147,153,159)
                    .content
                        line-height: .48rem
                        font-size: .2rem
                        color: rgb(7,17,27)
                        .stress
                            font-size: .48rem
            .favorite
                position: absolute
                width: 1rem 
                right: .22rem
                top: .36rem
                text-align: center
                .icon-favorite
                    display: block
                    margin-bottom: .08rem
                    line-height: .48rem
                    font-size: .48rem 
                    color: #d4d6d9
                    &.active
                        color: rgb(240,20,20)
                .text
                    line-height: .2rem
                    font-size: .2rem
                    color: rgb(77,85,93)
        .bulletin 
            padding: .36rem .36rem 0 .36rem
            .title
                margin-bottom: .16rem
                line-height: .28rem
                color: rgb(7,17,27)
                font-size: .28rem
            .content-wrapper
                padding: 0 .24rem .32rem .24rem
                .content
                    line-height: .48rem
                    font-size: .24rem
                    color: rgb(240,20,20)
            .supports
                .support-item
                    padding: .32rem .24rem
                    font-size: 0
                    &:last-child
                        &::before
                            border: none
                    .icon
                        display: inline-block
                        vertical-align: top
                        margin-top: .02rem
                        width: .32rem
                        height: .32rem
                        margin-right: .12rem
                        background-size: .32rem .32rem
                        background-repeat: no-repeat
                        &.decrease
                            bg-img('decrease_4')
                        &.discount
                            bg-img('discount_4')
                        &.guarantee
                            bg-img('guarantee_4')
                        &.invoice
                            bg-img('invoice_4')
                        &.special
                            bg-img('special_4')
                    .text
                        line-height: .32rem
                        font-size: .24rem
                        color: rgb(7,17,27)
        .pics
            padding: .36rem
            .title
                margin-bottom: .24rem
                line-height: .28rem
                color: rgb(7,17,27)
                font-size: .28rem
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                .pic-list
                    font-size: 0
                    .pic-item
                        display: inline-block
                        margin-right: .12rem
                        width: 2.4rem
                        height: 1.8rem
                        &:last-child
                            margin: 0
                        .img
                            width: 2.4rem
                            height: 1.8rem
        .info
             padding: .36rem .36rem 0 .36rem
             color: rgb(7,17,27)
            .title
                padding-bottom: .24rem
                line-height: .28rem
                font-size: .28rem
            .info-item
                padding: .32rem .24rem
                line-height: .32rem
                font-size: .24rem

</style>
