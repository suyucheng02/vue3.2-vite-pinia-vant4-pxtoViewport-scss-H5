<!-- 我的 -->
<script lang='ts' setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()
</script>

<template>
  <div class="user-container">
    <header class="user-header">
      <div class="user-card flex items-center">
        <van-image round width="11vw" height="11vw" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <span class="user-card-name">CAT·OVENT</span>
      </div>
    </header>

    <van-cell title="身份认证" is-link to="/user/idcard">
      <template #icon>
        <van-icon style="margin: auto 4px;" name="idcard" />
      </template>
    </van-cell>

    <van-cell title="手机" is-link to="/user/changeTel">
      <template #icon>
        <van-icon style="margin: auto 4px;" name="phone-circle-o" />
      </template>
    </van-cell>

    <van-cell title="系统" is-link to="/user/systemInfo">
      <template #icon>
        <van-icon style="margin: auto 4px;" name="setting-o" />
      </template>
    </van-cell>
  </div>
</template>

<style lang='scss' scoped>
.user-container {
  .user-header {
    height: 180px;
    width: 100%;
    background: rgba(0, 255, 200, 0.8);
    margin-top: -42px;
    padding-top: 42px;

    .user-card {
      padding: 40px 20px;

      .user-card-name {
        margin-left: 10px;
      }
    }
  }
}
</style>