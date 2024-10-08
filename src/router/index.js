// ------------------------------
//  Karot_2.0 - index.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains all the router paths
// ------------------------------

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/createmeals",
    name: "CreateMeals",
    component: () => import("@/views/CreateMeals.vue"),
  },
  {
    path: "/logIn",
    name: "LogIn",
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/myAccount",
    name: "MyAccount",
    component: () => import("@/views/MyAccount.vue"),
  },
  {
    path: "/allergies",
    name: "UserAllergies",
    component: () => import("@/views/UserAllergies.vue"),
  },
  {
    path: "/recipes",
    name: "RecipesPage",
    component: () => import("@/views/RecipesPage.vue"),
  },
  {
    path: "/recipe",
    name: "RecipePage",
    component: () => import("@/views/RecipePage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
