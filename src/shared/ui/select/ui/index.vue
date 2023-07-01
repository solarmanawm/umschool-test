<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    modelValue: string;
    options: Option[];
}

interface Emits {
    (event: 'update:modelValue', value: string): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();
const value = ref('');
</script>

<script lang="ts">
</script>

<template>
    <select
        v-model="value"
        @change="emits('update:modelValue', value)"
        class="bg-white px-6 py-2 rounded text-black"
    >
        <option selected disabled>Select option</option>
        <option
            v-for="option of options"
            :value="option.value"
            :key="option.value"
        >{{ option.title }}</option>
    </select>
</template>
