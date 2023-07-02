<script setup lang="ts">
interface Props {
    title: string;
    value: string;
    col?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    col: false,
})

const classList = {
    'flex flex-col items-start': props.col,
};
</script>

<script lang="ts">
export default {
    name: 'ApInfo',
};
</script>

<template>
    <p
        :class="classList"
        class="capitalize text-sm"
    >{{ title }}: <span class="text-white font-bold">{{ value }}</span></p>
</template>