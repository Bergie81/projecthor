<template>
  <section id="boards">
    <div class="app-header">
      <el-row>
        <p class="app-header-intro"></p>
      </el-row>
      <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline"> User </h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <p class="app-header-status"></p>
        </el-col>
      </el-row>
      <el-row>
        <p class="app-header-description"> Overview of all User. </p>
      </el-row>
      <el-row type="flex" justify="end">
            <el-input
              class="search"
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="filteredUser">
            </el-input>
        </el-row>
    </div>

    <main class="app-container">
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="user in filteredUsers" :key="user._id">
          <ui-card class="user-card">
            <el-row type="flex" justify="center" align="middle">  
              <avatars class="user-card-image" :avatars="[user]" :tooltip="false"></avatars>
            </el-row>
            <el-row type="flex" justify="center" align="middle">  
              <p class="user-card-department"> {{ user.department }} </p>
            </el-row>
            <el-row type="flex" justify="center" align="middle">  
              <p class="user-card-name"> {{ user.name }} {{ user.surname }} </p>
            </el-row>
            <el-row type="flex" justify="center" align="middle">  
              <p class="user-card-initials"> ({{ user.initials }}) </p>
            </el-row>
          </ui-card>
        </el-col>
      </el-row>
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Avatars from "@/components/Widgets/Avatars.vue";
export default {
  name: "showUser",
  components: { Avatars },
  data() {
    return {
      filteredUser: ""
    };
  },
  computed: {
    ...mapGetters(["getUsers"]),
    filteredUsers() {
      return this.getUsers.filter(user => {
        const fullUser = user.name + " " + user.surname + " " + user.initials;
        return fullUser.toLowerCase().match(this.filteredUser.toLowerCase());
      });
    }
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-card {
  margin: 2%;
  &-image {
    margin: 10px 0;
  }
  &-name {
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 5px;
  }
  &-initials {
    font-size: 0.8rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 10px;
  }
  &-department {
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 5px;
  }
}
.search {
  width: 250px;
  margin-bottom: 10px;
  margin-right: 5%;
}
</style>
