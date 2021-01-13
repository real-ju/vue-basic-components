<style lang="less" scoped>
@import "//at.alicdn.com/t/font_2163580_tnvor1tzl1.css";

.basic-app-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.navbar {
    width: 100%;
    height: 45px;
    flex: none;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;

    .left-area {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 0px 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }

    .right-area {
        height: 100%;
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 0px 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }

    .title {
        font-size: 16px;
    }
}

.app-page-content {
    width: 100%;
    height: 0px;
    flex: auto;
    overflow-y: auto;
}

.tabbar {
    width: 100%;
    height: 56px;
    border-top: 1px solid #eee;
    display: flex;

    .tab-item {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: black;

        i {
            font-size: 22px;
            margin-bottom: 4px;
        }
    }

    .current-tab-item {
        color: #1989fa;
    }
}
</style>

<template>
    <div class="basic-app-page">
        <div v-if="showNavbar" class="navbar">
            <div class="left-area" @click="back"><i class="AppPageComponent_iconfont icon-back"></i></div>
            <div class="title">{{ title }}</div>
            <div class="right-area" @click="toHome"><i class="AppPageComponent_iconfont icon-home"></i></div>
        </div>
        <div class="app-page-content">
            <slot></slot>
        </div>
        <div v-if="currentTabIndex != -1" class="tabbar">
            <div
                class="tab-item"
                :class="{ 'current-tab-item': currentTabIndex == index }"
                v-for="(item,index) in tabList"
                :key="item.title"
                @click="toTabPage(item)"
            >
                <i class="AppPageComponent_iconfont" :class="item.icon"></i>
                <span>{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import basic from '../index.mixin'

export default {
    name: 'BasicAppPage',
    mixins: [basic],
    data() {
        return {
            tabList: [
                {
                    title: '首页',
                    icon: 'icon-home',
                    route: '/'
                },
                {
                    title: '测试',
                    icon: 'icon-home',
                    route: '/test'
                }
            ]
        }
    },
    computed: {
        currentTabIndex() {
            let route = this.$route.path;
            let index = this.tabList.findIndex(item => {
                return item.route === route
            })

            return index
        }
    },
    methods: {
        toTabPage(item) {
            this.$router.replace(item.route);
        },
        back() {
            this.$router.back();
        },
        toHome() {
            this.$router.push('/');
        }
    }
}
</script>
