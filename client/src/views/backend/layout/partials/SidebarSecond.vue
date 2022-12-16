<template>

    <div class="list-group">
        <router-link active-class="active" :to="'/server/'+id" v-slot="{ href, route, navigate }">
            <button type="button" aria-current="true"  :href="href" @click="navigate" class="list-group-item list-group-item-action">
                Statsitics
            </button>
        </router-link>
        <router-link active-class="active" to="/mssql/users" v-slot="{ href, route, navigate }">
            <button :href="href" @click="navigate" class="list-group-item list-group-item-action">
                Users
            </button>
        </router-link>
        <button type="button" class="list-group-item list-group-item-action">Save SQL</button>
        <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
    </div>


</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.serverId;
console.log(id);
</script>

<style lang="scss">

</style>