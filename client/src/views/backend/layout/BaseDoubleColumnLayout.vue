<template>

    <div class="container-scroller">
        <!-- header-->
        <div class="container-full">
            <SideBar />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-sm-1">
                            <SidebarSecond />
                        </div>
                        <div class="col-sm-11">
                            <router-view></router-view>
                        </div>
                    </div>


                </div>
                <!-- content wrapper ends -->
            </div>
            <!-- main panel ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>

<script setup>
import SideBar from './partials/Sidebar.vue'
import SidebarSecond from './partials/SidebarSecond.vue'
</script>

<style scoped>
.main-panel {
    margin-left: 5rem;
}
</style>