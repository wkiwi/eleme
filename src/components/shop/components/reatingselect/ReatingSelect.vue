<template>
    <div class="reatingselect">
        <div class="rating-type border-bottom">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggle" class="switch" :class="{'on':onlyContent}">
            <span class='icon-check_circle'></span>
            <span class="text">只看有内容的评价</span>
        </div>
        <div class="rating-wrapper">
            <ul v-show="ratings && ratings.length">
                <li v-show="needShow(item.rateType,item.text)" v-for="(item,index) of ratings" :key="index" class="rating-item border-bottom">
                    <div class="user">
                        <span class="name">{{item.username}}</span>
                        <img :src="item.avatar" class="avatar">
                    </div>
                    <div class="time">{{item.rateTime | formatDate}}</div>
                    <p class="text">
                        <span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>{{item.text}}
                    </p>
                </li>
            </ul>
            <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Bus from '@/assets/js/eventBus'
import {formatDate} from '@/assets/js/date'
const POSITIVE = 0
const NEGATIVT = 1 
const ALL = 2
export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    name: 'ReatingSelect',
    data () {
        return {
            selectType2: this.selectType,
            onlyContent2: this.onlyContent
        }
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    computed: {
        positives () {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE
            })
        },
        negatives () {
             return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVT
            })
        }
    },
    methods: {
        select (type, event) {
            if (!event._constructed) {
                return
            }
            this.selectType2 = type
            Bus.$emit('ratingtype.select', type)
        },
        toggle (event) {
            if (!event._constructed) {
                return
            }
            this.onlyContent2 = !this.onlyContent2
            Bus.$emit('ratingcontent.toggle', this.onlyContent2)
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
    }
}
</script>

<style scoped lang="stylus">
    .reatingselect
        .rating-type
            padding: .36rem 0
            margin: 0 .36rem
            font-size: 0
            .block
                display: inline-block
                padding: .16rem .28rem
                margin-right: .16rem
                line-height: .32rem
                border-radius: .02rem
                color: rgb(77,85,93)
                font-size: .24rem
                &.active
                    color: #fff
                .count
                    margin-left: .04rem
                    font-size: .16rem
                &.positive
                    background: rgba(0,160,220,.2)
                    &.active
                        background: rgba(0,160,220,1)    
                &.negative
                    background: rgba(77,85,93,.2)
                    &.active
                        background: rgba(77,85,93,1)    
        .switch
            padding: .24rem .36rem
            line-height: .48rem
            border-bottom: 1px solid rgba(7,17,27,.1)
            color: rgb(147,153,159)
            font-size: 0
            &.on
                .icon-check_circle
                    color: #00c850
            .icon-check_circle
                display: inline-block
                vertical-align: top
                font-size: .48rem
                margin-right: .08rem
            .text
                display: inline-block
                vertical-align: top
                font-size: .24rem
        .rating-wrapper
            padding: 0 .36rem
            .rating-item
                positive: relative 
                padding: .32rem 0
                &:last-child
                    &::before
                        border:none
                .user
                    position: absolute 
                    right: 0
                    top: .32rem
                    font-size: 0
                    .name
                        display: inline-block
                        vertical-align: top
                        line-height: .48rem
                        font-size: .2rem
                        margin-right: .12rem
                        color: rgb(147,153,159)
                    .avatar
                        width: .48rem
                        height: .48rem
                        border-radius: 50%
                .time
                    margin-bottom: .12rem
                    line-height: .24rem
                    font-size: .2rem
                    color: rgb(147,153,159)
                .text
                    line-height: .32rem
                    font-size: .24rem
                    color: rgb(7,17,27)
                    .icon-thumb_up,.icon-thumb_down
                        margin-right: .08rem
                        line-height .32rem
                        font-size: .24rem
                    .icon-thumb_up
                        color: rgb(0,160,220)  
                    .icon-thumb_down
                        color: rgb(147,153,159)
            .no-rating
                padding: .32rem 0
                font-size: .24rem
                color: rgb(147,153,159)
                text-align: center
</style>
