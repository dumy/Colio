import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
import BaseDoubleColumnLayout from "../views/backend/layout/BaseDoubleColumnLayout.vue";
import Uno from "../views/backend/Uno.vue";
import Home from "../views/Home.vue";
import { useServerStore } from "@/stores/server.js";
import General from "../views/backend/ServerStatistics/General.vue";
import SecondSidebar from "../views/backend/layout/partials/SidebarSecond.vue";
import BaseLayoutSingleColumn from "../views/backend/layout/BaseLayoutSingleColumn.vue";
import Servers from "../views/backend/Home/Servers.vue";
import UsersMain from "../views/backend/ServerUsers/UsersMain.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/s",
      name: "home2",
      component:BaseLayoutSingleColumn,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/home',
          component: Servers,
        }
      ],
    },
    {
      path: "/",
      name: "servers",
      component:BaseDoubleColumnLayout,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/server/:serverId',
          component: General,
        },
      ],
    },
    {
      path: "/mssql/users",
      name: "Users",
      component:BaseDoubleColumnLayout,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '',
          component: UsersMain,
        },
      ],
    },
    
  ],
});

export default router;
