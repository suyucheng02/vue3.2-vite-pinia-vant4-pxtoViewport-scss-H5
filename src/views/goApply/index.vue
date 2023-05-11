<!-- 立即申请 -->
<script lang='ts' setup>
import { showDialog } from 'vant';
import BasicInfo from '@/components/goApply/BasicInfo.vue'

const active = ref(2)

const isActive = ref(0)

const basicInfo = ref<InstanceType<typeof BasicInfo> | null>(null)

const isRead = ref(false)

const changeActive = (type?: string) => {
    // basicInfo.value?.submit((res: any) => {
    //     console.log(res)
    // }, (err: any) => {
    //     console.log(err)
    // })

    if (type === 'add') {
        active.value < 2 && active.value++
    } else {
        active.value > 0 && active.value--
    }
}

const showXiye = () => {
    let time = ref(5)
    let timeId = setInterval(() => {
        if (time.value > 0) {
            time.value--
        } else {
            clearInterval(timeId)
        }
    }, 1000)
    showDialog({
        title: '个人综合信息查询授权',
        message: '    个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权个人综合信息查询授权',
        confirmButtonText: `同意(${time.value}s)`
    })
}


</script>

<template>
    <div class="goApply-container">
        <van-sticky>
            <van-steps class="van-steps" :active="active">
                <van-step>基本信息</van-step>
                <van-step>税务授权</van-step>
                <van-step>提交申请</van-step>
            </van-steps>
        </van-sticky>
        <BasicInfo ref="basicInfo" v-show="active === 0" />
        <SwAuth v-show="active === 1" />
        <ApplySubmit v-show="active === 2" />
        <div class="goApply-steps flex justify-between">
            <van-button :disabled="active < 1" size="small" type="primary" @click="changeActive">上一步</van-button>
            <van-button size="small" type="primary" @click="changeActive('add')">下一步</van-button>
        </div>

        <div class="goApply-submit flex items-center justify-center">
            <van-checkbox v-model="isRead">我已经阅读并同意</van-checkbox>
            <span class="goApply-submit-xieyi" @click="showXiye">个人综合信息查询授权</span>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.goApply-container {
    padding: 0 20px;

    .van-steps {
        padding: 20px 0;
    }

    .goApply-steps {
        margin-top: 20px;
    }

    .goApply-submit {
        font-size: 14px;
        --van-checkbox-size: 12px;

        .goApply-submit-xieyi {
            color: rgb(22, 137, 250);
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>