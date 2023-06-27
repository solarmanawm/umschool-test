<script setup lang="ts">
interface Props {
    href?: string;
    to?: string;
}

const props = defineProps<Props>();
const component = props.href ? 'a' : 'router-link';
</script>

<template>
    <component
        :is="component"
        v-bind="props"
        class="underline hover:no-underline"
    >
        <slot></slot>
    </component>
</template>