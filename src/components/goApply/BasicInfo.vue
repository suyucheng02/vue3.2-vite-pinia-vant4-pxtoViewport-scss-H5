<!-- 基本信息 -->
<script lang='ts' setup>
// import { areaList } from '@vant/area-data';
import type { FormInstance } from 'vant';

type SelectedOptionsType = Array<{ text: string; value: string; children: SelectedOptionsType | undefined }>
interface SelectedOptions {
    selectedOptions: SelectedOptionsType
}

// 表单对象
const vanform = ref<FormInstance>()

// 个人信息
let sfzZmImg = ref([]);
let sfzFmImg = ref([]);
let username = ref('');
let sfzNumber = ref('');
let sfzTime = ref('');
let sfzArea = ref('');
let detailArea = ref('')

// 企业信息
let qyYyzz = ref([]) // 营业执照
let zjNumber = ref('') // 证件号
let qyName = ref('') // 企业名称
let qyArea = ref('') // 经营地址
let qyDetailArea = ref('') // 企业详细地址

// 图片上传前压缩
const afterRead = (file: any) => {
    return new Promise((resolve, reject) => {
        // 大于100kb的图片都缩小像素上传
        if (file.file.size > 1024 * 100) {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let img = new Image()
            img.src = file.content
            img.onload = () => {
                canvas.width = 400
                canvas.height = 300
                context!.drawImage(img, 0, 0, 400, 300)
                file.content = canvas.toDataURL(file.file.type, 0.92)
                resolve(file.content)
            }
        } else {
            resolve(file.content)
        }
    })
}

// 校验提交
const submit = (then?: Function, Error?: Function) => {
    vanform.value?.validate().then(() => {
        then!(vanform.value?.getValues())
    }).catch(err => {
        Error!(err)
    })
};

defineExpose({
    submit,
})
</script>

<template>
    <div class="BasicInfo-container">
        <van-form ref="vanform">
            <van-cell-group inset>
                <h4>个人信息</h4>

                <van-field name="sfzZmImg" label="身份证正面" :rules="[{ required: true, message: '请上传身份证正面' }]">
                    <template #input>
                        <van-uploader v-model="sfzZmImg" :after-read="afterRead" max-count="1"
                            :preview-size="['34vw', '21vw']" />
                    </template>
                </van-field>
                
                <van-field name="sfzFmImg" label="身份证反面" :rules="[{ required: true, message: '请上传身份证反面' }]">
                    <template #input>
                        <van-uploader v-model="sfzFmImg" :after-read="afterRead" max-count="1"
                            :preview-size="['34vw', '21vw']" />
                    </template>
                </van-field>

                <van-field v-model="username" name="username" label="姓名" placeholder="OCR自动识别可修改"
                    :rules="[{ required: true, message: '请填写姓名' }]" />

                <van-field v-model="sfzNumber" readonly type="password" name="sfzNumber" label="身份证号" placeholder="OCR自动识别"
                    :rules="[{ required: true, message: '请识别身份证号' }]" />

                <van-field v-model="sfzTime" readonly type="password" name="sfzTime" label="身份证有效期" placeholder="OCR自动识别"
                    :rules="[{ required: true, message: '请识别身份证有效期' }]" />

                <FormArea v-model="sfzArea" name="sfzArea" label="居住地址" placeholder="请选择居住地址"
                    :rules="[{ required: true, message: '请选择居住地址' }]" />

                <van-field v-model="detailArea" rows="1" autosize name="detailArea" label="详细地址" type="textarea"
                    placeholder="请输入详细地址" :rules="[{ required: true, message: '请输入详细地址' }]" />

                <h4>企业信息</h4>


                <van-field name="qyYyzz" label="营业执照" :rules="[{ required: true, message: '请上传营业执照' }]">
                    <template #input>
                        <van-uploader v-model="qyYyzz" :after-read="afterRead" max-count="1"
                            :preview-size="['34vw', '21vw']" />
                    </template>
                </van-field>

                <van-field v-model="zjNumber" name="zjNumber" label="证件号码" placeholder="OCR自动识别可修改"
                    :rules="[{ required: true, message: '请输入证件号码' }]" />

                <van-field v-model="qyName" name="qyName" label="企业名称" placeholder="OCR自动识别可修改"
                    :rules="[{ required: true, message: '请输入企业名称' }]" />

                <FormArea v-model="qyArea" name="qyArea" label="企业经营地址" placeholder="请选择企业经营地址"
                    :rules="[{ required: true, message: '请选择企业经营地址' }]" />

                <van-field v-model="qyDetailArea" rows="1" autosize name="qyDetailArea" label="详细地址" type="textarea"
                    placeholder="请输入详细地址" :rules="[{ required: true, message: '请输入详细地址' }]" />

            </van-cell-group>
        </van-form>
    </div>
</template>

<style lang='scss' scoped></style>