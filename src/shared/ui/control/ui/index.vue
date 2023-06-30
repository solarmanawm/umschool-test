<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    modelValue: string;
    type?: 'text' | 'password' | 'email';
};

interface Emits {
    (event: 'update:modelValue', value: string): void;
}

withDefaults(defineProps<Props>(), {
    type: 'text',
});
const emits = defineEmits<Emits>();
const value = ref('');
</script>

<script lang="ts">
export default {
    name: 'AppControl',
};
</script>

<template>
    <input
        :type="type"
        class="bg-white px-6 py-2 rounded text-black"
        v-model="value"
        @input="emits('update:modelValue', value)"
    />
</template>