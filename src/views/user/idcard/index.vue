<!-- 实名认证 -->
<script lang='ts' setup>

</script>

<template>
    <div class="idcard-container flex flex-col items-center">
        <figure>
            <van-cell class="iccard-title" title="身份证" value="蓝妖姬">
                <template #icon>
                    <van-icon style="margin: auto 4px;" name="idcard" />
                </template>
            </van-cell>
            <p style="padding-left: 20px;">52*********0115</p>
        </figure>
        <van-button class="idcard-btn" to="/user/updateIdInfo" square type="primary">更新认证</van-button>

        <h4 class="idcard-title">实名信息</h4>

        <van-cell class="idcard-cell" title="最近认证时间" value="2021-06-01" />
        <van-cell class="idcard-cell" title="身份证有效期起" value="2021-06-01" />
        <van-cell class="idcard-cell" title="身份证有效期止" value="2021-06-01" />
    </div>
</template>

<style lang='scss' scoped>
.idcard-container {
    padding: 0 20px;

    figure {
        width: 100%;
        height: 100px;
        background-color: aquamarine;
        margin-top: 20px;
        border-radius: 4px 4px 0 0;

        .van-cell {
            background: transparent;

            &::after {
                display: none;
            }
        }
    }

    .idcard-btn {
        width: 100%;
        border-radius: 0 0 4px 4px;
    }

    .idcard-title {
        width: 100%;
        text-align: left;
        font-weight: 600;
        margin-top: 30px;
    }

    .idcard-cell {
        &.van-cell {
            border-bottom: 1px solid #e2e2e2;
            padding-left: 0;
            padding-right: 0;
        }
    }
}
</style>