<script lang="ts">
export default {
    name: 'AppCard',
};
</script>

<template>
    <div class="border border-gray-800 p-6 text-left shadow-xl relative z-10 hover:shadow-2xl bg-gray-800 hover:bg-gray-700 rounded text-gray-400">
        <slot></slot>
    </div>
</template>