<template>
  <button
    class="btn btn-primary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasRight"
    aria-controls="offcanvasRight"
  >
    Toggle right offcanvas
  </button>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">Server</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <!-- <form-component v-else mode="edit" :item="selectedItem" /> -->
      <FormServer v-if="mode === 'create'" mode="create" />
    </div>
  </div>
</template>

<script setup>
import FormServer from "./FormServer.vue";
import { ref } from "vue";
const mode = ref("create");
</script>
