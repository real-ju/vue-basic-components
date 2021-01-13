export default {
    props: {
        accept: {
            // 上传文件类型，MIME字符串，多个用逗号分隔
            type: String,
            default: 'image/*'
        },
        multiple: {
            // 多选
            type: Boolean,
            default: false
        },
        maxSize: {
            // 文件最大限制(字节)
            type: Number,
            default: 5242880 //默认5M
        },
        disabled: {
            // 禁用上传
            type: Boolean,
            default: false
        },
    }
}
