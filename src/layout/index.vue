<script setup lang="ts">
const route = useRoute()
</script>
<template>
    <div class="layout-content">
        <router-view v-if="route.meta.keepAlive" v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <router-view v-else></router-view>
    </div>
</template>
<style lang="scss" scoped>
.layout-content {
    width: 100%;
}
</style>
