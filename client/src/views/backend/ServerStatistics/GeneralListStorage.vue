<template>
    <div v-for = "item in store.serverDetail.storage" v-key="item.volume_mount_point">
        <LineStats :DataLine = "item.SpaceUsed.toFixed(2)" :title="item.volume_mount_point" />

    </div>
</template>

<script setup>
import LineStats from '../../../components/LineStats.vue';

import { useServerStore } from '@/stores/server';
const store = useServerStore();

</script>

<style lang="scss" scoped>

</style>
