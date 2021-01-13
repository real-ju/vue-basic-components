<style lang="less" scoped>
.basic-checkbox-group {
    width: 100%;
    display: flex;

    .checkbox-item {
        min-width: 90px;
        padding: 10px 20px;
        border: 1px solid #eee;
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
    }

    .checkbox-item + .checkbox-item {
        margin-left: 10px;
    }

    .selected-checkbox-item {
        border-color: #1989fa;
    }
}
</style>

<template>
    <ul class="basic-checkbox-group">
        <li
            class="checkbox-item"
            :class="{ 'selected-checkbox-item': selected[index] }"
            v-for="(item,index) in data"
            :key="item.value"
            @click="selectCheckbox(index)"
        >
            {{ item.title }}
        </li>
    </ul>
</template>

<script>
import basic from '../index.mixin'

export default {
    name: 'BasicCheckboxGroup',
    mixins: [basic],
    data() {
        return {
        }
    },
    methods: {
        selectCheckbox(index) {
            let returnVal = [ ...this.value ];

            if(this.selected[index]) {
                this.selected[index] = false;

                returnVal.splice(returnVal.indexOf(index), 1);
            }
            else {
                this.selected[index] = true;

                returnVal.push(index);
                returnVal.sort((a, b) => {
                    return a - b
                })
            }

            this.$emit('change', returnVal);
        }
    }
}
</script>
