<template>
  <div class="container-fluid">
    <div class="d-flex flex-row-reverse mt-3">
      <AddServe />
    </div>

    <div class="row">
      <!-- {{ store }} -->
      <div class="row row-cols-1 row-cols-md-5 g-4">
        <div class="col" v-for="server in store.servers" :key="server.id">
          <RouterLink :to="'/server/' + server.id" custom v-slot="{ href, navigate }">
            <div class="card h-100">
              <div class="card-body" :href="href" @click="navigate">
                <h5 class="card-title">{{ server.name }}</h5>
                <li>IP:{{ server.server }}</li>
                <li>UserName: {{ server.username }}</li>
              </div>
              <div class="d-flex flex-row-reverse bd-highlight">
                <div class="p-2 bd-highlight">
                  <i
                    class="bi bi-pencil"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    @click="store.getServer(server.id)"
                  />
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useServerStore } from "@/stores/server";
import AddServe from "./AddServer.vue";

const store = useServerStore();

onMounted(() => {
  store.serverDetail.cpu = 0;
  store.serverDetail.memory = 0;
  store.serverDetail.storage = [];
  store.allServer();
});
</script>

<style scoped>
i:hover {
  cursor: pointer;
  color: red;
}
</style>
