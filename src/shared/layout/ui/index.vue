<script setup lang="ts">
import { useSlots, computed } from 'vue';

const slots = useSlots();
const hasTitle = computed(() => slots.title && slots.title().length > 0);
</script>

<script lang="ts">
export default {
    name: 'AppLayout',
};
</script>

<template>
    <div class="my-12">
        <div
            v-if="hasTitle"
            class=""
        >
            <h1 class="text-white text-4xl">
                <slot name="title"></slot>
            </h1>
        </div>
        <div class="">
            <slot name="content"></slot>
        </div>
    </div>
</template>