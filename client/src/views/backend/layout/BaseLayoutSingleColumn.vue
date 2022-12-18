<template>


  <div class="container-scroller">
    <!-- header-->
    <div class="container-fluid page-body-wrapper">
      <TheSideBar />
      <div class="main-panel">
        <div class="content-wrapper">

          <router-view></router-view>

        </div>
        <!-- content wrapper ends -->
        <app-footer />
      </div>
      <!-- main panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script setup>
import TheSideBar from './partials/TheSideBar.vue'
</script>

<style scoped>
.main-panel {
  margin-left: 5rem;
}
</style>