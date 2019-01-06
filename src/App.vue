<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { dbUsersRef, dbProjectsRef, dbFinishedRef } from "./firebase";
export default {
  methods: {
    getUser() {
      if (!localStorage.getItem("currentUser")) {
        console.log("User existiert nicht");
        this.$store.commit("setCurrentUser", "user070cca035a6d"); //ThB
        localStorage.setItem("currentUser", "user070cca035a6d"); //ThB
      } else {
        this.$store.commit(
          "setCurrentUser",
          localStorage.getItem("currentUser")
        );
      }
    }
  },
  created() {
    this.$store.dispatch("setUsersRef", dbUsersRef);
    this.$store.dispatch("setProjectsRef", dbProjectsRef);
    this.$store.dispatch("setFinishedRef", dbFinishedRef);
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style lang="scss">
#app {
  min-width: 360px;
  background-color: #dbe7f1;
}
/*#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
