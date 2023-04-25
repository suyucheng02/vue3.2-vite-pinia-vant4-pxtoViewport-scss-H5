<!-- 首页 -->
<script lang='ts' setup>
import { showImagePreview } from 'vant';
function showimg() {
    showImagePreview(['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg']);

}
const number = ref(0)
const add = () => {
    number.value++
}
</script>

<template>
    <div>这里是首页</div>
    <div class="box"></div>
    <div @click="add">{{ number }}</div>
    <van-button type="primary" @click="showimg">主要按钮</van-button>
</template>

<style lang='scss' scoped>
.box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #f60;
}
</style>