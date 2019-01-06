<template>
  <section id="user-details" v-if="checkID">
    <div class="app-header">
      <!-- <p> ID {{ $route.params.userid }} </p> -->
      <el-row>
        <p class="app-header-intro">{{ checkID.department }}</p>
      </el-row>
      <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline"> {{ checkID.name }} {{ checkID.surname }} <span style="font-weight: 400; margin-left: 8px;"> ({{ checkID.initials }})</span> </h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <avatars class="app-header-status" :avatars="[checkID]" :tooltip="true"></avatars>
        </el-col>
      </el-row>
      <el-row>
        <p class="app-header-description"> {{ checkID.email }} </p>
      </el-row>
    </div>
    <main class="app-container">
      {{ checkID }}
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Avatars from "@/components/Widgets/Avatars.vue";
export default {
  name: "userBoard",
  components: { Avatars },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUsers"]),
    checkID() {
      return this.getUsers.filter(
        user => user._id === this.$route.params.userid
      )[0];
    }
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
