import {
  firebaseAction
} from "vuexfire";
import {
  decryptObject
} from "@/utils/crypto.js";

const state = {
  projects: [],
  currentProjectId: "",
  done: []
};

const getters = {
  getProjects: state => state.projects,
  getCurrentProjectId: state =>
    state.currentProjectId || localStorage.getItem("currentProjectId"),
  decryptedProjects: state => {
    let decryptedProjects = state.projects.map(project => {
      return decryptObject(project, ["_tasks", '_steps', '_progress']);
    });
    //console.log(decryptedProjects);
    return decryptedProjects;
  }
};

const mutations = {};

const actions = {
  // Central Store (projects) nsync with Firebase database
  setProjectsRef: firebaseAction(({
    bindFirebaseRef
  }, {
    ref
  }) => {
    bindFirebaseRef("projects", ref);
  }),
  setFinishedRef: firebaseAction(({
    bindFirebaseRef
  }, {
    ref
  }) => {
    bindFirebaseRef("done", ref);
  })
};

export default {
  state,
  getters,
  mutations,
  actions
};