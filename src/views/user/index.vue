<!-- 我的 -->
<script lang='ts' setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()

</script>

<template>
  <div>我的{{ user.name }}</div>
</template>

<style lang='scss' scoped></style>