<style lang="less" scoped>
@import "//at.alicdn.com/t/font_2184989_nibhow9wdm7.css";

.basic-nav-menu {
    width: 100%;
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid #eee;
    position: relative;
    background-color: white;
}

.menu-scroll-area {
    width: 0px;
    flex: auto;
    padding: 6px 0px;
    display: flex;
    overflow-x: auto;

    .menu-item {
        flex: none;
        padding: 2px 0px;
        margin: 0px 10px;
        font-size: 15px;
        box-sizing: content-box;

        &:first-child {
            margin-left: 24px;
        }
    }

    .last-empty {
        width: 2px;
        flex: none;
    }

    .menu-item-actived {
        border-bottom: 2px solid #f0250f;
    }
}

.drop-down-btn {
    width: 40px;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -4px 0px 4px -4px #bbb;
}

.drop-down-mask {
    width: 100%;
    background-color: rgba(0, 0, 0, .2);
    position: absolute;
    top: calc(100% + 1px);
    left: 0px;
    z-index: 1;
}

.drop-down-panel {
    width: 100%;
    padding: 7px 20px 15px 10px;
    position: absolute;
    top: calc(100% + 1px);
    left: 0px;
    z-index: 2;
    background-color: white;

    .menu-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .item {
            width: calc((100% - 40px) / 4);
            height: 30px;
            background-color: #eee;
            border-radius: 20px;
            font-size: 12px;
            text-align: center;
            line-height: 30px;
            margin-left: 10px;
            margin-top: 8px;
        }

        .item-actived {
            border: 1px solid #f0250f;
            background-color: white;
            color: #f0250f;
        }

        .tip {
            background-color: white;
        }
    }
}
</style>

<template>
    <div class="basic-nav-menu">
        <div class="menu-scroll-area" ref="menu">
            <div
                class="menu-item"
                ref="menuItems"
                v-for="(item,index) in data"
                :key="item.value"
                :class="{ 'menu-item-actived': index == value }"
                @click="selectMenuItem(index)"
            >
                {{ item.title }}
            </div>
            <div class="last-empty"></div>
        </div>
        <div class="drop-down-btn" @click="switchMenuPanel">
            <i v-if="!showMenuPanel" class="BasicNavMenuComponent_iconfont icon-down"></i>
            <i v-else class="BasicNavMenuComponent_iconfont icon-up"></i>
        </div>

        <!-- 下拉面板 -->
        <div v-if="showMenuPanel" class="drop-down-mask" :style="{ height: maskHeight }" @click="switchMenuPanel"></div>
        <div class="drop-down-panel" v-if="showMenuPanel">
            <ul class="menu-list">
                <li class="item tip">全部分类</li>
                <li
                    class="item"
                    v-for="(item,index) in data"
                    :key="item.value"
                    :class="{ 'item-actived': index == value }"
                    @click="selectMenuItem(index)"
                >
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import basic from '../index.mixin'

export default {
    name: 'BasicNavMenu',
    mixins: [basic],
    data() {
        return {
            showMenuPanel: false
        }
    },
    methods: {
        switchMenuPanel() {
            this.showMenuPanel = !this.showMenuPanel;
        },
        selectMenuItem(index) {
            this.showMenuPanel = false;
            if(index === this.value) {
                return
            }

            this.$emit('change', index);

            // 滚动菜单
            let menuEl = this.$refs.menu;
            let cMenuItemEl = this.$refs.menuItems[index];
            let scrollTotal = 0;
            let currentScrollLeft = menuEl.scrollLeft;
            let centerOffset = (menuEl.clientWidth - cMenuItemEl.offsetWidth) / 2;
            let maxScrollLeft = menuEl.scrollWidth - menuEl.clientWidth;
            let targetScrollLeft = cMenuItemEl.offsetLeft - centerOffset;
            if(targetScrollLeft < 0) {
                targetScrollLeft = 0;
            }
            else if(targetScrollLeft > maxScrollLeft) {
                targetScrollLeft = maxScrollLeft;
            }
            scrollTotal = targetScrollLeft - currentScrollLeft;

            let startTime = null;

            let step = timestamp => {
                if(!startTime) {
                    startTime = timestamp;
                }
                let progress = timestamp - startTime;
                if(progress < 200) {
                    let scrollNum = Math.abs(scrollTotal) * progress / 200;
                    menuEl.scrollLeft = scrollTotal > 0 ? currentScrollLeft + scrollNum : currentScrollLeft - scrollNum;

                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }
    }
}
</script>
