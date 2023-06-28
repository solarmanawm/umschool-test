<script setup lang="ts">
interface Props {
    href?: string;
    to?: string | object;
}

const props = defineProps<Props>();
const component = props.href ? 'a' : 'router-link';
</script>

<template>
    <component
        :is="component"
        v-bind="props"
        class="underline hover:no-underline cursor-pointer"
    >
        <slot></slot>
    </component>
</template>