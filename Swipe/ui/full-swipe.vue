<style lang="less" scoped>
.full-swipe {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.slide-tab {
    display: flex;
    position: absolute;
    bottom: 24px;
    right: 32px;

    .slide-item {
        width: 8px;
        height: 8px;
        background-color: white;
        transition: all 0.3s;
        cursor: pointer;
    }

    .current-item {
        width: 24px;
        background-color: #0052d9;
    }
}

.slide-item + .slide-item {
    margin-left: 8px;
}

.van-swipe {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.swipe-content {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>

<template>
    <div class="full-swipe">
        <van-swipe
            :autoplay="duration"
            :initial-swipe="initialIndex"
            :loop="loop"
            @change="swipeChange"
            ref="swipe"
        >
            <van-swipe-item
                v-for="(item,index) in data"
                :key="index"
                @click="tapItem"
            >
                <div class="swipe-content">
                    <img :src="item.src" alt="banner">
                </div>
            </van-swipe-item>
            <template #indicator v-if="data.length > 1 ? showIndicator : false">
                <ul class="slide-tab">
                    <li
                        class="slide-item"
                        :class="{ 'current-item': value == index }"
                        v-for="(item,index) in data"
                        :key="index"
                        @click="toItemAction(index)"
                    >
                    </li>
                </ul>
            </template>
        </van-swipe>
    </div>
</template>

<script>
// 设置auto-play为false
import basic from '../index.mixin'

import Vue from 'vue'
import Swipe from 'vant/lib/swipe'
import 'vant/lib/swipe/style'
import SwipeItem from 'vant/lib/swipe-item'
import 'vant/lib/swipe-item/style'

Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
    name: 'FullSwipe',
    mixins: [basic],
    data() {
        return {
            initialIndex: 0
        }
    },
    methods: {
        toItemAction(index) {
            this.$refs.swipe.swipeTo(index);
        },
        swipeChange(index) {
            this.$emit('change', index);
        }
    },
    created() {
        this.initialIndex = this.value;
    }
}
</script>
