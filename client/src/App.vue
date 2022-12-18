<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheSideBar from './views/backend/layout/partials/TheSideBar.vue'
import BazeLayout from './views/backend/layout/BaseDoubleColumnLayout.vue';
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
// Main Stylesheet
@import "./assets/scss/main.scss";
</style>

