import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Projects from "@/views/Projects.vue";
import ProjectView from "@/views/ProjectView.vue";
import Admin from "@/views/Admin.vue";
import Login from "@/components/Login.vue";
import AdminCarousel from "@/components/AdminCarousel.vue";
import AdminProject from "@/components/AdminProject.vue";
import AdminPromo from "@/components/AdminPromo.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/projectview/:id", name: "ProjectView", component: ProjectView },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "/admincarousel",
        name: "AdminCarousel",
        component: AdminCarousel,
      },
      {
        path: "/adminproject",
        name: "AdminProject",
        component: AdminProject,
      },
      {
        path: "/adminpromo",
        name: "AdminPromo",
        component: AdminPromo,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
