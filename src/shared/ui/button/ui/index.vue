<script setup lang="ts">
interface Props {
    variant: 'yellow' | 'white';
    outline?: boolean;
};

const props = defineProps<Props>();
const classList = {
    'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black': props.variant === 'yellow' && props.outline,
    'text-black bg-yellow-500 hover:bg-yellow-700': props.variant === 'yellow' && !props.outline,
    'border border-white-500 text-white hover:bg-white hover:text-black': props.variant === 'white' && props.outline,
    'text-black bg-white hover:bg-white': props.variant === 'white' && !props.outline,
};
</script>

<script lang="ts">
export default {
    name: 'AppButton',
};
</script>

<template>
    <button
        :class="classList"
        class="capitalize px-6 py-2 rounded"
    >
        <slot>Button text</slot>
    </button>
</template>