<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left border-right">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star class="star" :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star class="star" :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <reating-select :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></reating-select>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="(rating,index)  of ratings" :key="index" class="rating-item border-bottom" v-show="needShow(rating.rateType,rating.text)">
                        <div class="avatar">
                            <img class="img" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item border" v-for="(item,index)  of rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time ">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import axios from 'axios'
import Bus from '@/assets/js/eventBus'
import {formatDate} from '@/assets/js/date'
import Star from 'common/star/Star'
import Split from 'common/split/Split'
import ReatingSelect from '../components/reatingselect/ReatingSelect'
/* const POSITIVE = 0
const NEGATIVT = 1 */
const ALL = 2
export default {
    name: 'ShopRatings',
    props: {
        seller: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            ratings: [],
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    created () {
        this.getInfo()
        this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratings, {
                    click: true
                })
            })
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
    },
    methods: {
        getInfo: function () {
            axios.get('/api/ratings.json')
            .then(this.handleGitInfoSucc)  
        },
        handleGitInfoSucc: function (res) {
            const data = res.data
            console.log(data)
            this.ratings = data
        },
        needShow (type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        }
    },
    components: {
        Star,
        Split,
        ReatingSelect
    }
}
</script>

<style scoped lang="stylus">
    .ratings
        position: absolute 
        top: 3.48rem
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .overview
            display: flex
            padding: .36rem 0
            .overview-left
                flex: 0 0 2.74rem
                width: 2.74rem
                text-align: center
                padding: .12rem 0
                @media only screen and (max-width: 320px)
                    flex: 0 0 2.4rem
                    width: 2.4rem
                .score
                    margin-bottom: .12rem
                    line-height: .56rem
                    font-size: .48rem
                    color: rgb(255,153,0)
                .title
                    margin-bottom: .16rem
                    line-height: .24rem
                    font-size: .24rem
                    color: rgb(7,17,27)
                .rank
                    line-height: .2rem
                    font-size: .2rem
                    color: rgb(147,153,159)
            .overview-right
                flex: 1
                padding: .12rem 0 .12rem .48rem
                @media only screen and (max-width: 320px)
                    padding-left: .12rem
                .score-wrapper
                    margin-bottom: .16rem
                    font-size: 0
                    .title
                        display:inline-block
                        vertical-align: top
                        font-size: .24rem
                        color: rgb(7,17,27)
                        line-height: .36rem
                    .star
                        display:inline-block
                        vertical-align: top
                        margin: 0 .24rem
                    .score
                        display:inline-block
                        vertical-align: top
                        color: rgb(255,153,0)
                        font-size: .24rem
                        line-height: .36rem
                .delivery-wrapper
                    font-size: 0
                    .title
                        font-size: .24rem
                        color: rgb(7,17,27)
                        line-height: .36rem
                    .delivery
                        font-size: .24rem
                        color: rgb(147,153,159)
                        margin-left: .24rem
        .rating-wrapper
            padding: 0 .36rem
            .rating-item  
                display: flex
                padding: .36rem 0  
                .avatar
                    flex: 0 0 .56rem
                    width: .56rem
                    margin-right: .24rem
                    .img
                        width: .56rem
                        height: .56rem
                        border-radius: 50%
                .content
                    position: relative
                    flex: 1
                    .name   
                        margin-bottom: .08rem
                        line-height: .24rem
                        font-size: .2rem
                        color: rgb(7,17,27)
                    .star-wrapper
                        margin-bottom: .12rem
                        font-size: 0
                        .star
                            display: inline-block
                            vertical-align: top
                            margin-right: .12rem
                        .delivery
                            display: inline-block
                            vertical-align: top
                            line-height: .24rem
                            font-size: .2rem
                            color: rgb(147,153,159)
                    .text
                        line-height: .36rem
                        color: rgb(7,17,27)
                        font-size: .24rem
                        margin-bottom: .16rem
                    .recommend
                        line-height: .32rem
                        font-size: 0
                        .icon-thumb_up,.item
                            display: inline-block
                            margin: 0 .16rem .08rem 0
                            font-size: .18rem
                        .icon-thumb_up
                            color: rgb(0,160,260)
                        .item
                            padding: 0.12rem
                            border-radius: .02rem
                            color: rgb(147,153,159)
                            background:#fff
                    .time
                        position: absolute 
                        top: 0
                        right: 0
                        line-height: .24rem
                        font-size: .2rem
                        color: rgb(147,153,159)

</style>
