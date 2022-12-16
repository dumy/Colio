<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './views/backend/layout/partials/Sidebar.vue'
import BazeLayout from './views/backend/layout/BaseDoubleColumnLayout.vue';
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
// Main Stylesheet
@import "./assets/scss/main.scss";
</style>

