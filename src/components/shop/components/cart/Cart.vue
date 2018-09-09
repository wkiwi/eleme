<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'heightlight':totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></span>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price bordr-right" :class="{'heightlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{this.deliveryPrice}}元</div>
            </div>
            <div class="content-right" >
                <div class="pay" :class="payClass">
                   {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div v-for="(ball,index) of balls" :key="index" v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'ShopCart',
    props: {
        'selectFoods': {
            type: Array,
            default () {
                return [
                    {
                       price: 100,
                       count: 1 
                    }
                ]
            }
        },
        'delivery-price': {
            type: Number,
            default: 0
        },
        'min-price': {
            type: Number,
            default: 0
        }
    },
        data () {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }
            ],
            dropBalls: []
        }
    },
    computed: {
        totalPrice () {
            let totla = 0
            this.selectFoods.forEach((food) => {
                totla += food.price * food.count
            })
            return totla
        },
        totalCount () {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        payDesc () {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}起送`
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return `还差￥${diff}起送`
            } else {
                return '去结算'
            }
        },
        payClass () {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        }
    },
    methods: {
        drop (el) {
            console.log(el)
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return 
                }
            }
        },
        beforeEnter (el) {
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count]
                if (ball.show) {
                    // getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
                    let rect = ball.el.getBoundingClientRect()
                    let x = rect.left - 32
                    let y = -(window.innerHeight - rect.top - 22)

                    el.style.display = ''

                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                    el.style.transform = `translate3d(0, ${y}px, 0)`

                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                    inner.style.transform = `translate3d(${x}px, 0, 0)`
                }
            }
        },
        enter (el) {
            /* 触发浏览器重绘 */
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight 
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0, 0, 0)'
                el.style.transform = 'translate3d(0, 0, 0)'

                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = 'translate3d(0, 0, 0)'
                inner.style.transform = 'translate3d(0, 0, 0)'
            })
        },
        afterEnter (el) {
            let ball = this.dropBalls.shift()
            console.log(ball)
            if (ball) {
                ball.show = false
                el.style.display = 'none'
            }
        }

    }
}
</script>

<style scoped lang="stylus">
    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: .96rem
        .content
            display: flex
            background: #141d27
            font-size: 0
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -0.2rem
                    margin: 0 .24rem
                    padding: .12rem
                    width: 1.12rem
                    height: 1.12rem
                    box-sizing: border-box
                    vertical-align: top
                    border-radius: 50%
                    background: #141d27
                    .num
                        position: absolute 
                        top: 0
                        right: 0
                        width: .48rem
                        height: .32rem
                        line-height: .32rem
                        text-align: center
                        border-radius: .32rem
                        font-size: .18rem
                        font-weight: 700
                        color: #ffffff
                        background: rgb(240,20,20)
                        box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.4)
                    .logo
                        width: 100%
                        height: 100%
                        text-align: center 
                        border-radius: 50%
                        background: #2b343c
                        &.heightlight
                            background: rgb(0,160,220)
                        .icon-shopping_cart
                            font-size: .48rem
                            color: #80858a
                            line-height: .88rem
                            &.heightlight
                                color:#fff
                .price
                    display: inline-block
                    vertical-align: top
                    line-height: .48rem
                    margin-top: .24rem
                    padding-right: .24rem
                    box-sizing: border-box 
                    font-size: .32rem
                    font-weight: 700
                    color: rgba(255,255,255,0.4)
                    &.totalPrice
                        color:#fff
                .desc
                    display: inline-block
                    vertical-align: top
                    line-height: .48rem
                    margin: .24rem 0 0 .24rem
                    color: rgba(255,255,255,0.4)
                    font-size: .2rem
            .content-right
                width: 2.1rem
                flex: 0 0 2.1rem
                .pay
                    height: .96rem
                    line-height: .96rem
                    text-align: center
                    font-size: .24rem
                    color: rgba(255,255,255,0.4)
                    font-weight: 700
                    &.not-enough
                        background: #2b332b 
                    &.enough
                        background: #00b43c
                        color: #fff 
        .ball-container
            .ball
                position: fixed
                left: .64rem
                bottom: .44rem
                z-index: 200
                .inner
                    width: .32rem
                    height: .32rem
                    border-radius: 50%
                    background: rgb(0,160,220)
                    transition: all .4s linear
                &.drop-enter-active
                    transition: all .4s cubic-bezier(.49, -0.29, .75, .41)
</style>
