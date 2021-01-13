<style lang="less" scoped>
</style>

<template>
    <van-uploader
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        :after-read="afterRead"
        :max-size="maxSize"
        @oversize="oversize"
    >
        <slot></slot>
    </van-uploader>
</template>

<script>
// 无预览文件上传器
import basic from '../index.mixin'

import Vue from 'vue'
import Uploader from 'vant/lib/uploader'
import 'vant/lib/uploader/style'

Vue.use(Uploader);

export default {
    name: 'BasicUploaderVant',
    mixins: [basic],
    data() {
        return {
        }
    },
    methods: {
        afterRead(file, detail) {
        },
        oversize(file, detail) {
        },
    }
}
</script>
