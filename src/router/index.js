import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import store from "../store/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
    meta: { requiresAuth: true }, // Allows vue to know that this route is protected
  },
];

const router = new VueRouter({
  // mode: "history",
  base: "",
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.form.isLogin) {
      alert("user is not authorised");
      next({ name: "Landing" });
    } else {
      alert("user is authorised");
      next();
    }
  }

  next();
});

export default router;
