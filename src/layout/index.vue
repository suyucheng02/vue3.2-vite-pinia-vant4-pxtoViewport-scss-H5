<script setup lang="ts">
const route = useRoute()
</script>
<template>
    <div class="layout-content">
        <keep-alive v-if="route.meta.keepAlive">
            <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
    </div>
</template>
<style lang="scss" scoped>
.layout-content {
    width: 100%;
}
</style>
