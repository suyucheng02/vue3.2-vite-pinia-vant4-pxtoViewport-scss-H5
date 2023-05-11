<!-- 提交申请 -->
<script lang='ts' setup>
import { useCountDown } from '@/hooks/useCountDown'
const { countDown, startCountDown } = useCountDown()
const countDownNum = computed(() => countDown.value ? `${countDown.value}s后可重发` : '发送验证码')

const applyNumber = ref('')
const dkTime = ref('')
const ywIp = ref('')
const code = ref('')

const dkTimes = reactive([
  { text: '1年', value: '1' },
  { text: '2年', value: '2' },
  { text: '3年', value: '3' },
  { text: '4年', value: '4' },
  { text: '5年', value: '5' },
])

const ywIps = reactive([
  { text: '广东', value: '1' },
  { text: '广西', value: '2' },
  { text: '湖南', value: '3' },
  { text: '上海', value: '4' },
  { text: '北京', value: '5' },
])
</script>

<template>
  <div>
    <van-form ref="applyForm">
      <van-cell-group inset>
        <van-field v-model="applyNumber" type="number" maxlength="11" name="applyNumber" label="申请金额(万)"
          placeholder="请输入申请金额" :rules="[{ required: true, message: '请输入手机号码' }]" />
        <FormPicker v-model="dkTime" :columns="dkTimes" name="dkTime" label="贷款期限" placeholder="请选择贷款期限"
          :rules="[{ required: true, message: '请选择贷款期限' }]" />

        <FormPicker v-model="ywIp" :columns="ywIps" name="ywIp" label="业务办理网点" placeholder="请选择业务办理网点"
          :rules="[{ required: true, message: '请选择业务办理网点' }]" />

        <van-field v-model="code" type="number" maxlength="6" name="code" label="验证码" center clearable
          placeholder="请输入验证码" :rules="[{ required: true, message: '请输入验证码' }]">
          <template #button>
            <van-button @click="startCountDown" size="small" type="primary" :text="countDownNum"></van-button>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>

    
  </div>
</template>

<style lang='scss' scoped></style>