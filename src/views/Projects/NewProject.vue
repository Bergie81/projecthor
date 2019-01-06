<template>
  <section id="new-project">
    <div class="app-header">
      <el-row>
        <p class="app-header-intro"></p>
      </el-row>
      <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline"> Create a new Project </h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <p class="app-header-status"></p>
        </el-col>
      </el-row>
      <el-row>
        <p class="app-header-description"> Enter Details to initialize it. </p>
      </el-row>
    </div>
    <main class="app-container">
    <ui-card>
      <el-form label-position="top" ref="form">

        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <el-form-item label="Title">
              <el-input v-model="newProject.title"></el-input>
            </el-form-item>
          </el-col>
        <!-- <el-col :span="1" :offset="1">
            <el-form-item class="text-center" label="Color">
              <el-color-picker 
                v-model="newProject.color"
                :predefine="getSwatches"
                ></el-color-picker>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="11">
            <el-form-item label="Category" >
              <el-cascader
                :options="getCategories"
                v-model="newProject._category"
                change-on-select
                filterable
                style="width: 100%;">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="{span: 12, offset: 1}">
            <el-form-item label="Tag (describe Project Topic in ONE Word)" >
              <el-input v-model="newProject.tag"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Description">
          <el-input 
            type="textarea" 
            :autosize="{ minRows: 3, maxRows: 10}" 
            v-model="newProject.description"
            ></el-input>
        </el-form-item>

        <el-row class="mt-3" type="flex" justify="end" align="bottom">
          <el-form-item>
            <button class="app-btn" :disabled="!valid" @click.prevent="addProject">Create</button>
          </el-form-item>
        </el-row>
      </el-form>
    </ui-card>
    </main>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { createRandomId, formatDate } from "@/utils";
import { encryptData } from "@/utils/crypto";
import { dbProjectsRef } from "../../firebase";
export default {
  name: "newProject",
  data() {
    return {
      newProject: {
        title: "",
        description: "",
        _category: [],
        dateCreated: "",
        _orderId: 1001
      }
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getSwatches"]),
    valid() {
      if (
        this.newProject.title !== "" &&
        this.newProject.description !== "" &&
        this.newProject.category !== "" &&
        this.newProject.tag !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createRandomId,
    formatDate,

    addProject() {
      const currentUser = this.$store.getters.currentUser;
      this.newProject._id = "proj" + this.createRandomId(8);
      this.newProject._inCharge = currentUser;
      this.newProject.progress = 0;
      this.newProject.dateCreated = Date.now().toString();
      dbProjectsRef
        .push(encryptData(this.newProject))
        .then(() => {
          localStorage.setItem("currentProjectId", this.newProject._id);
          this.$message({
            showClose: true,
            message:
              "New project " + this.newProject.title + " successfully created!",
            type: "success"
          });
          this.$router.push({
            name: "projectDetails",
            params: { projectid: this.newProject._id }
          });
        })
        .catch(error => {
          this.$message.error("Oops, something went wrong: " + error);
        });
    }
  }
};
</script>
