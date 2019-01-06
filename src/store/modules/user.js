import {
  firebaseAction
} from "vuexfire";
import {
  dynamicSort
} from "@/utils";

const state = {
  users: [],
  currentUser: ""
};

const getters = {
  getUsers: state => state.users.sort(dynamicSort("initials")),
  getOtherUsers: state => {
    let otherUser = state.users.filter(user => user._id !== state.currentUser);
    return otherUser.sort(dynamicSort("initials"));
  },
  currentUser: state => state.currentUser,
  getUserImage: state => {
    if (state.currentUser !== "") {
      let me = state.users.filter(user => user._id === state.currentUser)[0];
      return me;
    } else {
      return {
        image: ""
      };
    }
  }
};


const mutations = {
  setCurrentUser: (state, user) => {
    state.currentUser = user;
  }
};

const actions = {
  setUser: (context, user) => {
    context.commit("userStatus", user);
  },
  // Central Store (projects) nsync with Firebase database
  setUsersRef: firebaseAction(({
    bindFirebaseRef
  }, {
    ref
  }) => {
    bindFirebaseRef("users", ref);
  })
};

export default {
  state,
  getters,
  mutations,
  actions
};
export const user = state.currentUser;