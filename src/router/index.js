import Vue from "vue";
import VueRouter from "vue-router";
import RegistrationForm from "../components/RegistrationForm.vue";

Vue.use(VueRouter);

const routes = [{ path: "/", component: RegistrationForm }];

const router = new VueRouter({
  routes,
});

export default router;
