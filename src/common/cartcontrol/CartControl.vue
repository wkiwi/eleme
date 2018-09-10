<template>
    <div class="cartcontrol">
        <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decrease">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{this.food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template> 

<script type="text/ecmascript-6">
import Vue from 'vue'
import Bus from '@/assets/js/eventBus'
export default {
    name: 'CartControl',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart (e) {
            if (!e._constructed) {
                return 
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
            /* console.log(this.food.count) */
            Bus.$emit('cartAdd', e.target)
        },
        decrease (e) {
            if (!e._constructed) {
                return 
            }
            if (this.food.count) {
                this.food.count--
            }
            /* console.log(this.food.count) */
        }
    }
}
</script>

<style scoped lang="stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease  
            display: inline-block
            padding: .12rem
            transition: all .4s linear
            .inner
                display:inline-block
                line-height: .48rem
                font-size: .48rem
                color: rgb(0,120,220) 
                transition: all .4s linear
            &.move-enter-active,.move-leave-active 
                opacity: 1
                transform: translate3D(0,0,0)
                .inner
                    transform: rotate(0deg)
            &.move-enter,&.move-leave-to
                opacity: 0
                transform: translate3D(.48rem,0,0)
                .inner
                    transform: rotate(180deg);
        .cart-count
            display: inline-block
            line-height: .48rem
            vertical-align: top
            padding: .12rem
            text-align: center
            font-size: .2rem
            width: .24rem
            color: rgb(147,153,159)
        .cart-add
            display: inline-block
            padding: .12rem
            line-height: .48rem
            font-size: .48rem
            color: rgb(0,120,220)
</style>
