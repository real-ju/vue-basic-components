<style lang="less" scoped>
.basic-radio-group {
    width: 100%;
    display: flex;

    .radio-item {
        min-width: 90px;
        padding: 10px 20px;
        border: 1px solid #eee;
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
    }

    .radio-item + .radio-item {
        margin-left: 10px;
    }

    .selected-radio-item {
        border-color: #1989fa;
    }
}
</style>

<template>
    <ul class="basic-radio-group">
        <li
            class="radio-item"
            :class="{ 'selected-radio-item': value == index }"
            v-for="(item,index) in data"
            :key="item.value"
            @click="selectRadio(index)"
        >
            {{ item.title }}
        </li>
    </ul>
</template>

<script>
import basic from '../index.mixin'

export default {
    name: 'BasicRadioGroup',
    mixins: [basic],
    data() {
        return {
        }
    },
    methods: {
        selectRadio(index) {
            if(this.value !== index) {
                this.$emit('change', index);
            }
        }
    }
}
</script>
