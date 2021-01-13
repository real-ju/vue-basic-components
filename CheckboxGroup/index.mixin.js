export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            // 当前选中项index数组
            type: Array,
            default: () => {
                return []
            }
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
        }
    },
    data() {
        return {
            selected: null
        }
    },
    created() {
        let selected = {};

        this.data.forEach((item, index) => {
            selected[index] = false;
        })

        this.value.forEach(item => {
            selected[item] = true;
        })

        this.selected = selected;
    }
}
