<template>
  <section id="admin">
    <div class="app-header">
      <el-row>
        <p class="app-header-intro"></p>
      </el-row>
      <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline"> Admin Dashboard </h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <p class="app-header-status"></p>
        </el-col>
      </el-row>
      <el-row>
        <p class="app-header-description"> Only for Super User </p>
      </el-row>
    </div>
    <main class="app-container">

    </main>
  </section>
</template>

<script>
export default {
  name: "admin",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
