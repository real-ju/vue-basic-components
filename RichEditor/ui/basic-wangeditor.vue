<style lang="less" scoped>
.editor {
    width: 100%;
}

.editor /deep/ .w-e-text-container {
    height: unset !important;
}

.editor /deep/ .w-e-text {
    min-height: 150px;
    overflow-y: hidden;
}

.editor /deep/ .w-e-toolbar {
    background-color: unset !important;
    border-bottom-color: #f1f1f1 !important;
    flex-wrap: wrap;
}

.editor /deep/ .w-e-toolbar .w-e-droplist {
    border-right-color: #f1f1f1;
    border-bottom-color: #f1f1f1;
    box-shadow: 0px 0px 5px #eee;
}

.editor /deep/ .w-e-toolbar .w-e-menu:hover {
    background-color: #f1f1f1;
}

.editor /deep/ .w-e-toolbar .w-e-menu i {
    color: #666;
}

.editor /deep/ .w-e-toolbar .w-e-active i {
    color: #1e88e5;
}
</style>

<template>
    <div
        class="editor"
        :id="'rich_editor_' + _uid"
        ref="editor"
    >
        <slot></slot>
    </div>
</template>

<script>
// wangeditor机制问题，没有完全实现双向绑定，需要用setValue方法来触发value更新
import basic from '../index.mixin'

import wangeditor from 'wangeditor'
// import OSS from 'ali-oss'

export default {
    name: 'BasicWangeditor',
    mixins: [basic],
    data() {
        return {
            editor: null
        }
    },
    mounted() {
        this.initEditor();
    },
    methods: {
        setValue(value) {
            this.editor.txt.html(value);
        },
        initEditor() {
            let editor = this.editor = new wangeditor(this.$refs.editor);
            console.dir(editor)
            // 配置菜单
            editor.config.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                // 'image',  // 插入图片
                'table',  // 表格
                'code',  // 插入代码
                'undo',  // 撤销
            ]

            // 监听输入
            editor.config.onchange = (html) => {
                this.$emit('change', html);
            }

            // 配置图片上传
            // editor.config.uploadImgServer = '/';
            // editor.config.uploadImgMaxLength = 1;

            // editor.config.customUploadImg = (files, insert) => {
            //     let client = new OSS({
            //         region: '',
            //         accessKeyId: '',
            //         accessKeySecret: '',
            //         bucket: ''
            //     })

            //     let fileName = files[0].name + '_' + files[0].lastModified;

            //     client.put('img/' + fileName, files[0])
            //     .then(res => {
            //         insert(res.url);
            //     })
            //     .catch(() => {
            //         this.$message.$error('上传失败，请重试');
            //     })
            // }

            editor.create();
            editor.txt.html(this.value);
        }
    }
}
</script>
