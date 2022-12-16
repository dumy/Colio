<template>
    <div class="w-auto p-3" >
        <h3>Sessions </h3>
        <b-table :items="store.serverDetail.sessions" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
            striped responsive="sm">
            <div>
                Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
                <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
            </div>
            <template #cell(show)="row">
                <!-- <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details 
                </b-button>
                {{row.detailsShowing}} -->
                <div v-if="!row.detailsShowing">
                    <span class="bi bi-arrow-right" @click="row.toggleDetails"></span>
                </div>
                <div v-else>
                    <span class="bi bi-arrow-up" @click="row.toggleDetails"></span>
                </div>


                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->

            </template>
            <template #cell(sql_script)="row">
                <div class="text-nowrap">
                    <span class="align-text-top text-capitalize">{{ row.item.sql_script.substring(0, 50) }}</span>
                </div>
            </template>
            

            <template #cell(kill)="row">
                <b-button variant="danger" size="sm" @click="kill(row.item.spid)" class="mr-2">
                    X
                </b-button>



                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->

            </template>

            <template #row-details="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>SQL:</b></b-col>
                        <b-col>{{ row.item.sql_script }}</b-col>
                    </b-row>

                </b-card>
            </template>
        </b-table>
    </div>
</template>
  
<script setup>
import { useServerStore } from '@/stores/server';
import { useRoute } from 'vue-router';

const store = useServerStore();
const sortBy = 'spid';
const sortDesc = true;

const fields = ['show', { key: 'spid', sortable: true }, { key: 'login_name', sortable: true }, 'program_name', 'hostname', 'blocked', 'last_batch', 'sql_script', 'kill'];




const route = useRoute();
function kill(spid) {
    const id = route.params.serverId;
    store.kill(id, spid);
    store.sessions(id);
}



</script>


<style lang="scss" scoped>

</style>