<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 ">
                <GeneralInfoMSSQL :detailDB="store.serverDetail.detail" />
                <LineStats :DataLine="store.serverDetail.cpu.toFixed(2)" title="CPU" />
                <LineStats :DataLine="store.serverDetail.memory.toFixed(2)" title="Memory" />
                <GeneralListStorage />
            </div>
            <div class="col-md-9">
                <GeneralSessions />
            </div>
        </div>


    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useServerStore } from '@/stores/server';
import { useRoute } from 'vue-router';


import LineStats from "../../../components/LineStats.vue";
import GeneralInfoMSSQL from './GeneralInfoMSSQL.vue';
import GeneralListStorage from './GeneralListStorage.vue';
import GeneralSessions from "./GeneralSessions.vue";

const route = useRoute();
const id = route.params.serverId;

const store = useServerStore();

onMounted(() => {
    store.detailServer(id);
    store.mssqlCPU(id);
    store.mssqlMemory(id);
    store.mssqlStorage(id);
    store.sessions(id);
})


</script>

<style lang="scss" scoped>
.hiddenRow {
    padding: 0 !important;
}
</style>