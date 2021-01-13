export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        data: {
            // 列表数据
            type: Array,
            default: () => {
                /**
                 * 数组项规范：
                 * {
                 * src: '' 图片url地址,
                 * desc: {} 自定义描述
                 * }
                 */
                return []
            }
        },
        value: {
            // 当前轮播图index
            type: Number,
            default: 0
        },
        autoPlay: {
            // 自动轮播
            type: Boolean,
            default: true
        },
        duration: {
            // 自动轮播间隔时间(ms)
            type: Number,
            default: 3000
        },
        loop: {
            // 循环播放
            type: Boolean,
            default: true
        },
        showIndicator: {
            // 是否显示指示器
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            timer: null
        }
    },
    computed: {
        dataLength() {
            return this.data.length
        },
        currentItem() {
            return this.data[this.value]
        }
    },
    mounted() {
        if(this.autoPlay) {
            this.initAutoPlay();
        }
    },
    beforeDestroy() {
        if(this.autoPlay) {
            clearInterval(this.timer);
        }
    },
    methods: {
        tapItem() {
            this.$emit('tap', this.currentItem, this.value);
        },
        initAutoPlay() {
            this.timer = setInterval(() => {
                this.nextItem();
            }, this.duration)
        },
        beforeItem() {
            if(this.value === 0) {
                this.$emit('change', this.data.length - 1);
            }
            else {
                this.$emit('change', this.value - 1);
            }
        },
        nextItem() {
            if(this.value === this.data.length - 1) {
                this.$emit('change', 0);
            }
            else {
                this.$emit('change', this.value + 1);
            }
        },
        toItemAction(index) {
            this.value = index;
            if(this.autoPlay) {
                clearInterval(this.timer);
                this.initAutoPlay();
            }
        },
        // 上一页操作
        beforeItemAction() {
            this.beforeItem();
            if(this.autoPlay) {
                clearInterval(this.timer);
                this.initAutoPlay();
            }
        },
        // 下一页操作
        nextItemAction() {
            this.nextItem();
            if(this.autoPlay) {
                clearInterval(this.timer);
                this.initAutoPlay();
            }
        }
    }
}
