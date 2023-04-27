<script setup lang="ts">
const route = useRoute()
const active = ref<number>(+(sessionStorage.getItem('activeIndex') as string) || 0)
const changeTab = () => {
    sessionStorage.setItem('activeIndex', `${active.value}`)
}
</script>
<template>
    <div class="layout-content">
        <header>表头</header>
        <keep-alive v-if="route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
        <van-tabbar class="van-tabbar" v-model="active" @change="changeTab">
            <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/user" icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style lang="scss" scoped>
.layout-content {
    width: 100%;
    padding: 0 20px;
    padding-bottom: 50px;

    header {
        font-size: 20px;
        font-weight: 600;
        margin: 10px 0;
    }

    .van-tabbar {
        --van-tabbar-height: 50px
    }
}
</style>
