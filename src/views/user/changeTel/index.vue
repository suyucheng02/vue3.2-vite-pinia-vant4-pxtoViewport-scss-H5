<!-- 修改手机号 -->
<script lang='ts' setup>
import { useCountDown } from '@/hooks/useCountDown'
const { countDown, startCountDown } = useCountDown()
const countDownNum = computed(() => countDown.value ? `${countDown.value}s后可重发` : '发送验证码')

const telNum = ref('')
const code = ref('')
</script>

<template>
    <div>
        <van-form ref="authForm">
            <van-cell-group inset>
                <van-field v-model="telNum" type="tel" maxlength="11" name="telNum" label="手机号码" placeholder="请输入手机号码"
                    :rules="[{ required: true, message: '请输入手机号码' }]" />

                <van-field v-model="code" type="number" maxlength="6" name="code" label="验证码" center clearable
                    placeholder="请输入验证码" :rules="[{ required: true, message: '请输入验证码' }]">
                    <template #button>
                        <van-button @click="startCountDown" size="small" type="primary" :text="countDownNum"></van-button>
                    </template>
                </van-field>

                <van-button style="margin: 100px 0" size="large" type="primary">确定</van-button>
            </van-cell-group>
        </van-form>
    </div>
</template>

<style lang='scss' scoped></style>