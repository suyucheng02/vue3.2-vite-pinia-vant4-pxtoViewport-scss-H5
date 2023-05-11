<!-- 申请中CARD -->
<script lang='ts' setup>

</script>

<template>
  <div class="applying-container">
    <div class="applying-title">有田下山</div>
    <div class="applying-label">
      <span class="applying-label-title">有田下山:</span>
      <span class="applying-label-content">￥300万</span>
    </div>
    <div class="applying-label">
      <span class="applying-label-title">有田下山:</span>
      <span class="applying-label-content">1年</span>
    </div>
    <div class="applying-label">
      <span class="applying-label-title">有田下山:</span>
      <span class="applying-label-content">2021-01-02</span>
    </div>
    <div class="applying-label">
      <span class="applying-label-title">有田下山:</span>
      <span class="applying-label-content" style="color: red;">拒绝</span>
    </div>

    <!-- 温馨提示 -->
    <div class="applying-tips">
      温馨提示：有田下山
    </div>

    <!-- 申请流程 -->
    <div class="applying-flowPath">
      <van-steps active="4" active-color="rgb(198, 39, 30)">
        <van-step>有田下山</van-step>
        <van-step>有田下山</van-step>
        <van-step>有田下山</van-step>
        <van-step>有田下山</van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.applying-container {
  min-height: 200px;
  margin: 20px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid $theme-color;

  .applying-title {
    color: $theme-color;
  }

  .applying-label {
    margin: 15px 0px;
  }

  .applying-tips {
    color: #fff;
    padding: 15px;
    text-align: center;
    font-size: 12px;
    border-radius: 70%;
    background-color: $theme-color;
  }
}
</style>