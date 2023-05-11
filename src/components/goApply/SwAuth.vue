<!-- 税务授权 -->
<script lang='ts' setup>
import { useCountDown } from '@/hooks/useCountDown'
const { countDown, startCountDown } = useCountDown()
const countDownNum = computed(() => countDown.value ? `${countDown.value}s后可重发` : '发送验证码')

const qyType = ref('有限责任公司')
const telNum = ref('')
const code = ref('')

// import { showToast } from 'vant'
// showToast({
//     type: 'loading',
//     message: '识别中...',
//     forbidClick: true,
//     duration: 5000
// })
</script>

<template>
    <div>
        <div>有田下山</div>
        <van-form ref="authForm">
            <van-cell-group inset>

                <van-field v-model="qyType" readonly name="qyType" label="企业类型" placeholder="请输入企业类型"
                    :rules="[{ required: true, message: '请输入企业类型' }]" />

                <van-field v-model="telNum" type="tel" maxlength="11" name="telNum" label="手机号码" placeholder="请输入手机号码"
                    :rules="[{ required: true, message: '请输入手机号码' }]" />

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