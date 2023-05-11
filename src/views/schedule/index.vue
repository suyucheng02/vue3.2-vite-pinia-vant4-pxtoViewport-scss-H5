<!-- 进度查询 -->
<script lang='ts' setup>
const active = ref(0)
</script>

<template>
    <div class="schedule-container">
        <van-tabs class="schedule-tab" color="rgb(198, 39, 30)" shrink swipeable sticky v-model:active="active">
            <van-tab title="申请中">
                <ApplyingCard />
                <ApplyingCard />
                <ApplyingCard />
                <ApplyingCard />
                <ApplyingCard />
                <ApplyingCard />
            </van-tab>
            <van-tab title="申请完结">
                <ApplyEndCard />
            </van-tab>
        </van-tabs>
    </div>
</template>

<style lang='scss' scoped>
.schedule-tab {
    --van-padding-md: 0;
    --van-padding-xs: 10px;
}
</style>