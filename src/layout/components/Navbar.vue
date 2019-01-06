<template>
  <el-menu v-if="getUserImage" class="navbar" mode="horizontal" style="backgroundColor: #EA2E49">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="`${baseUrl}avatars/avatar-${getUserImage.image}.jpg`">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          
          <div style="font-size: 12px;">{{ currentUser }}</div>  
          <div>  
            <el-select
              style="width:100%;"
              v-model="selectedUser" 
              @change="changeUser"
              size="mini" >
              <el-option 
                  v-for="user in getUsers" 
                  :key="user['.key']" 
                  :value="user._id"
                  > {{ user.name }} </el-option>
              </el-select>
          </div>

          <router-link :to="'/user/' + currentUser">
            <el-dropdown-item divided>
            <svgicon :icon="'user-card-outline'" height="13" :color="'#555'"></svgicon>
            <span class="ml-2">Profile</span>
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="#">
            <el-dropdown-item>
              <svgicon :icon="'settings-gear'" height="13" :color="'#555'"></svgicon>
              <span class="ml-2">Settings</span>
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <svgicon :icon="'logout'" height="13" :color="'#555'"></svgicon>
            <span class="ml-2" @click="logout">Logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <screenfull class="screenfull right-menu-item"></screenfull>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";

export default {
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      selectedUser: ""
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters(["sidebar", "getUsers", "currentUser", "getUserImage"])
  },
  methods: {
    goToUser(user) {
      console.log("user", user);

      this.$router.push({
        name: "userBoard",
        params: {
          userid: user
        }
      });
    },
    //FOR DEV
    changeUser() {
      console.log("New User selected: ", this.selectedUser);
      localStorage.setItem("currentUser", this.selectedUser);
      this.$store.commit("setCurrentUser", this.selectedUser);
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//ONLY FOR TESTING
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}

// REGULAR
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      margin-right: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 10px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border: solid 2px #d3d1d7;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          color: #d3d1d7;
          position: absolute;
          right: -6px;
          top: 31px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
