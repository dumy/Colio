<template>
  <form>
    <input
      class="form-control"
      type="text"
      placeholder="Server Name"
      aria-label="default input example"
      v-model="server.name"
    />
    <select class="form-select" aria-label="Default select example" v-model="server.type">
      <option selected>Select type DataBase</option>
      <option value="MSSQL">MSSQL</option>
    </select>
    <div class="row">
      <div class="col-9">
        <input
          class="form-control"
          type="text"
          placeholder="Server IP"
          aria-label="default input example"
          v-model="server.ip"
        />
      </div>
      <div class="col-3">
        <input
          class="form-control"
          type="text"
          placeholder="Port"
          aria-label="default input example"
          v-model="server.port"
        />
      </div>
    </div>

    <input
      class="form-control"
      type="text"
      placeholder="Server Username"
      aria-label="default input example"
      v-model="server.username"
    />
    <input
      class="form-control"
      type="text"
      placeholder="Server Password"
      aria-label="default input example"
      v-model="server.password"
    />
    <button
      class="btn btn-primary"
      type="submit"
      @click.prevent="store.addServer(server)"
    >
      {{ dataProps.mode == "create" ? "Create" : "Update" }}
    </button>
  </form>
</template>

<style scoped>
input {
  margin-bottom: 10px;
}

select {
  margin-bottom: 10px;
}
</style>

<script setup>
import { reactive, watch } from "vue";

import { useServerStore } from "@/stores/server";
const store = useServerStore();
const dataProps = defineProps({
  mode: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});

const server = reactive({
  name: "",
  type: "",
  ip: "",
  port: "",
  username: "",
  password: "",
});

console.log(store.serverDetail.get);
if (store.serverDetail.get.id != undefined) {
  server.name = store.serverDetail.get.name;
}

watch(
  () => store.serverDetail.get,
  (val) => {
    if (val.id != undefined) {
      server.name = val.name;
      server.ip = val.server;
      server.type = val.type;
      server.port = val.port;
      server.username = val.username;
      server.password = val.password;
      dataProps.mode = "updates";
    }
  }
);
</script>
