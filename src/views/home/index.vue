<!-- 首页 -->
<script lang='ts' setup>
</script>

<template>
    <div class="index-container">
        <div class="index-header">有田下山</div>
        <div class="index-content">
            <span>最高 500万，年化利率最低X%</span>
            <div class="index-tags flex justify-between">
                <div class="index-tag">额度高</div>
                <div class="index-tag">利率低</div>
                <div class="index-tag">可抵押</div>
            </div>
            <div class="flex justify-between index-btn">
                <van-button to="/goApply" plain size="mini" type="danger" class="index-btn-one">立即申请</van-button>
                <van-button to="/schedule" plain size="mini" type="danger" class="index-btn-two">进度查询</van-button>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.index-container {
    padding: 0 20px;
}

.index-header {
    max-width: 96px;
    margin: 20px auto;
    position: relative;

    &::after,
    &::before {
        display: block;
        content: "";
        position: absolute;
        left: -24px;
        top: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        margin: auto;
        border-radius: 50%;
        background: rgb(198, 39, 30);
    }

    &::after {
        right: -24px;
        left: auto;
    }
}

.index-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    border: 1px solid $theme-color;
    padding: 20px;
    border-radius: 4px;

    .index-tags {
        width: 90%;
        margin: 36px auto;

        .index-tag {
            height: 40px;
            line-height: 40px;
            text-align: center;
            width: 60px;
            background-color: $theme-color;
            color: #fff;
            border-radius: 4px;
        }
    }

    .index-btn {
        width: 90%;

        .index-btn-one {
            --van-button-danger-color: $theme-color;
            --van-button-mini-padding: 14px 45px
        }

        .index-btn-two {
            --van-button-danger-color: $theme-color;
            --van-button-mini-padding: 14px 25px
        }
    }
}
</style>