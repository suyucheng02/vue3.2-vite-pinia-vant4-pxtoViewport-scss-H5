<script setup lang="ts">
import { sessionStorage } from '@/utils/storage'
const route = useRoute()
const active = ref(+(sessionStorage.get('activeIndex')) || 0)
const changeTab = (val: number) => {
    active.value = val
    sessionStorage.set('activeIndex', val)
}
const tabs = [
    {
        icon: 'home-o',
        name: '首页',
        url: '/'
    },
    {
        icon: 'friends-o',
        name: '我的',
        url: '/user'
    },
]
const urls = tabs.map(v => v.url)
// 兼容van-tabbar在同一个layout下不跳转的问题
watch(route, ({ path }) => {
    if (!urls.includes(path)) {
        changeTab(-1)
    } else {
        changeTab(urls.findIndex(v => v === path))
    }
})
</script>

<template>
    <div class="layout-content">
        <header><span>田</span>有田下山</header>
        <router-view v-if="route.meta.keepAlive" v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <router-view v-else></router-view>
        <van-tabbar class="van-tabbar" v-model="active">
            <van-tabbar-item v-for="tab in tabs" :key="tab.url" :to="tab.url" :icon="tab.icon">{{ tab.name
            }}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="scss" scoped>
.layout-content {
    width: 100%;
    padding-bottom: 50px;

    header {
        font-size: 20px;
        font-weight: 500;
        padding: 10px 20px;
        color: $theme-color;

        span {
            display: inline-block;
            width: 20px;
            line-height: 20px;
            text-align: center;
            border: 1px solid $theme-color;
            border-radius: 50%;
            margin-right: 10px;
        }
    }

    .van-tabbar {
        --van-tabbar-height: 50px;

        .van-tabbar-item--active {
            color: $theme-color;
        }
    }
}
</style>
