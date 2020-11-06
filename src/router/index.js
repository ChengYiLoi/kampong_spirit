import Vue from "vue";
import VueRouter from "vue-router";

// import store from "../store/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Landing.vue"),
  },
  {
    path: "/login",
    name: "Login",
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
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
];

const router = new VueRouter({
  // mode: "history",
  base: "",
  // base: process.env.BASE_URL,
  routes,
});



export default router;

// beforeEnter: (to, from, next) => {
//   if(localStorage.getItem('userInfo') !== null){
//     alert('session exist');
//     let session = localStorage.getItem('userInfo');
//     session = JSON.parse(session);

//     store.state.loginForm.form.email = session.email;
//     store.state.loginForm.form.password = session.password;
//     next();

//   }
//   else if (!store.state.loginForm.form.isLogin) {
//     alert("user is not authorised and session does not exist");

//     next({ name: "Landing" });
//   } else {
//     alert("user is authorised");
//     next();
//   }
// }