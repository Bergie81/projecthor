import {
  firebaseMutations
} from "vuexfire";
import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import permission from "./modules/permission";
import projects from "./modules/projects";
import system from "./modules/system";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {
    ...firebaseMutations
  },
  modules: {
    app,
    permission,
    projects,
    system,
    user
  }
});

export default store;