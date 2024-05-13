<!--
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-30 11:47:06
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-10 18:29:02
 * @FilePath: \shop-admin\src\components\Editor\index.vue
 * @Description: 编辑组件
-->
<template>
    <editor v-model="content" :init="init" :id="tinymceId" tag-name="div" />
    <UploadButton :preview="false" ref="uploadButtonRef" :limit="9" />
</template>
<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue';
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
// 引用主题文件
import 'tinymce/themes/silver/theme';
// 引用图标文件
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
// 特殊字符
import 'tinymce/plugins/charmap';
// 查看源码
import 'tinymce/plugins/code';
// 插入代码
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
//全屏
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
// 插入上传图片插件
import 'tinymce/plugins/image';
//图片工具
import 'tinymce/plugins/importcss';
//时间插入
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
// 列表插件
import 'tinymce/plugins/lists';
// 插入视频插件
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
//分页
import 'tinymce/plugins/pagebreak';
// 预览
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
// 保存
import 'tinymce/plugins/save';
//查询替换
import 'tinymce/plugins/searchreplace';
// 插入表格插件
import 'tinymce/plugins/table';
//插入模板
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
// 字数统计插件
import 'tinymce/plugins/wordcount';

import UploadButton from '../UploadButton/index.vue';

// v-model
const props = defineProps({
    modelValue: String,
});

const tinymceId = ref(
    "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
);

const uploadButtonRef = ref(null);

// 配置
const init = {
    //富文本编辑器的id,
    selector: "#" + tinymceId.value,
    // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
    language_url: '/public/tinymce/langs/zh_CN.js',
    //语言
    language: "zh_CN",
    // skin路径，具体路径看自己的项目
    skin_url: '/tinymce/skins/ui/oxide',
    content_css: "/tinymce/skins/content/default/content.min.css",
    menubar: false, // 隐藏菜单栏
    autoresize_bottom_margin: 50,
    max_height: 500,
    min_height: 400,
    // height: 320,
    toolbar_mode: "none",
    plugins: 'wordcount visualchars visualblocks template searchreplace save quickbars preview pagebreak nonbreaking media insertdatetime importcss image help fullscreen directionality codesample code charmap link code table lists advlist anchor autolink autoresize autosave',
    toolbar: "formats undo redo fontsizeselect fontselect ltr rtl searchreplace media imageUpload | outdent indent aligncenter alignleft alignright alignjustify lineheight underline quicklink h2 h3 blockquote numlist bullist table removeformat forecolor backcolor bold italic strikethrough hr link preview fullscreen help ",
    content_style: "p {margin: 5px 0; font-size: 14px}",
    fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方 = PingFang SC, Microsoft YaHei, sans- serif; 宋体 = simsun, serif; 仿宋体 =  FangSong, serif; 黑体 = SimHei, sans - serif; Arial = arial, helvetica, sans - serif;Arial Black = arial black, avant garde;Book Antiqua = book antiqua, palatino; ",
    branding: false,
    elementpath: false,
    resize: false, // 禁止改变大小
    statusbar: false, // 隐藏底部状态栏
    setup: (editor) => {
        editor.ui.registry.addButton("imageUpload", {
            tooltip: "插入图片",
            icon: "image",
            onAction () {
                uploadButtonRef.value.handleUploadAvatar(data => {
                    data.forEach(url => {
                        editor.insertContent(`<img src="${url}" style="width:100%;"/>`)
                    })
                })
            }
        })
    }
};

const content = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);

watch(
    props,
    (newVal) => content.value = newVal.modelValue
);

watch(
    content,
    (newVal) => emit("update:modelValue", newVal)
);

// 初始化
onMounted(() => tinymce.init);

// 组件销毁移除
onUnmounted(() => tinymce.remove());
</script>




<style lang="less">
.tox-tinymce-aux {
    z-index: 9999 !important;
}
</style>