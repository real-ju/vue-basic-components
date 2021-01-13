export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            // 当前选中项index
            type: Number,
            default: 0
        },
        data: {
            // 列表数据
            type: Array,
            default: () => {
                /**
                 * 数组项规范：
                 * { title, value, desc }
                 */
                return []
            }
        },
        maskHeight: {
            // 下拉蒙版高度(对应css height)
            type: String,
            default: 'calc(100vh - 100% - 1px)'
        }
    }
}
