<!-- 表单选择地区组件 -->
<script lang='ts' setup>
import { areaList } from '@vant/area-data';
type SelectedOptionsType = Array<{ text: string; value: string; children: SelectedOptionsType | undefined }>
interface SelectedOptions {
    selectedOptions: SelectedOptionsType
}

const props = defineProps<{
    name: string;
    label: string;
    placeholder: string;
    modelValue: string;
    rules: Array<{ required: boolean; message: string }>
}>()

const emits = defineEmits(['update:modelValue', 'confirm'])

const showArea = ref(false)
const area = ref('')

// 选择地址回调
const onConfirm = ({ selectedOptions }: SelectedOptions) => {
    showArea.value = false;
    area.value = selectedOptions.map((item) => item.text).join('/');
    emits('update:modelValue', area.value)
    emits('confirm', selectedOptions)
};
</script>

<template>
    <van-field v-model="area" is-link readonly :name="name" :label="label" :placeholder="placeholder" :rules="rules"
        @click="showArea = true" />
    <van-popup v-model:show="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
    </van-popup>
</template>

<style lang='scss' scoped></style>