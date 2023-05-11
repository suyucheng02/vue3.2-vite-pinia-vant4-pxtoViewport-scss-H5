<!-- 系统信息 -->
<script lang='ts' setup>

</script>

<template>
    <div class="systemInfo-container">
        <h4 class="systemInfo-title">账户绑定信息</h4>

        <van-cell class="systemInfo-cell" title="微信绑定" value="已绑定" />

        <van-button style="margin: 100px 0" to="/" size="large" type="primary">解绑</van-button>
    </div>
</template>

<style lang='scss' scoped>
.systemInfo-container {
    padding: 0 20px;

    .systemInfo-title {
        width: 100%;
        text-align: left;
        font-weight: 600;
        margin: 30px 0;
    }

    .systemInfo-cell {
        &.van-cell {
            border-bottom: 1px solid #e2e2e2;
            padding-left: 0;
            padding-right: 0;
        }
    }
}
</style>