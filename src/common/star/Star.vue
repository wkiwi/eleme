<template>
    <div class="star"  :class="starType">
        <span v-for="(itemClass,index) of  itemClasses" :class="itemClass" :key="index" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
    name: 'Star',
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    data () {
        return {

        }
    },
    computed: {
        starType () {
            return 'star-' + this.size
        },
        itemClasses () {
            let result = []
            let score = Math.floor(this.score * 2) / 2
            let hasDecimal = score % 1 !== 0
            let integer = Math.floor(score)
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON)
            }
            if (hasDecimal) {
                result.push(CLS_HALF)
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF)
            }
            return result
        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
    @import "~styles/common.styl"
    .star
        font-size: 0
        .star-item
            display: inline-block
            background-repeat: no-repeat
        &.star-48
            .star-item
                width: .4rem
                height: .4rem
                margin-right: .44rem
                background-size: .4rem .4rem
                &:last-child
                    margin-right: 0
                &.on
                    bg-img('star48_on')
                &.half
                    bg-img('star48_half')
                &.off
                    bg-img('star48_off')
        &.star-36
            .star-item
                width: .3rem
                height: .3rem
                margin-right: .12rem
                background-size: .3rem .3rem
                &:last-child
                    margin-right: 0
                &.on
                    bg-img('star36_on')
                &.half
                    bg-img('star36_half')
                &.off
                    bg-img('star36_off')
        &.star-24
            .star-item
                width: .2rem
                height: .2rem
                margin-right: .06rem
                background-size: .2rem .2rem
                &:last-child
                    margin-right: 0
                &.on
                    bg-img('star24_on')
                &.half
                    bg-img('star24_half')
                &.off
                    bg-img('star24_off')
</style>
