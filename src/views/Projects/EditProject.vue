<template>
  <section id="edit-project" v-if="currentProject">
    <!-- <p> ID {{ $route.params.projectid }} </p> -->
    <div class="app-header">
      <el-row type="flex" justify="start">
        <div class="app-header-intro">
          <span 
            v-for="(category, index) in editProject._category" :key="index"> 
              {{ category + " / " }}  
          </span>
        </div> 
      </el-row>
       <el-row>
          <h1 style="margin-left: 3%;" class="app-header-headline"> {{ editProject.title }} </h1>
      </el-row> 
      <el-row>
        <p class="app-header-description"> {{ editProject.description }} </p>
      </el-row>
    </div>

    <main class="app-container">
      <ui-card>
      <el-form label-position="top" ref="form">

        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <el-form-item label="Title">
              <el-input v-model="editProject.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="11">
            <el-form-item label="Category" >
              <el-cascader
                :options="getCategories"
                v-model="editProject._category"
                change-on-select
                filterable
                style="width: 100%;">
              </el-cascader>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="{span: 12, offset: 1}">
            <el-form-item label="Tag (describe Project Topic in ONE Word)" >
              <el-input v-model="editProject.tag"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Description">
          <el-input 
            type="textarea" 
            :autosize="{ minRows: 3, maxRows: 10}" 
            v-model="editProject.description"
            ></el-input>
        </el-form-item>

        <el-row class="mt-3" type="flex" justify="end" align="bottom">
          <el-form-item>
            <button class="app-btn mr-3" @click.prevent="cancel">Cancel</button>
            <button class="app-btn" :disabled="!valid" @click.prevent="editData">Change</button>
          </el-form-item>
        </el-row>
      </el-form>
    </ui-card>
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { encryptData } from "@/utils/crypto";
import { dbProjectsRef } from "../../firebase";
export default {
  name: "editProject",
  components: {},
  data() {
    return {
      editProject: {
        title: "",
        description: "",
        tag: "",
        _category: []
      }
    };
  },
  computed: {
    ...mapGetters(["decryptedProjects", "getCategories"]),
    valid() {
      if (
        this.editProject.title !== "" &&
        this.editProject.description !== "" &&
        this.editProject.category !== "" &&
        this.editProject.tag !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    currentProject() {
      let edit = this.decryptedProjects.filter(
        project => project._id === this.$route.params.projectid
      )[0];
      this.editProject.title = edit.title;
      this.editProject.description = edit.description;
      this.editProject.tag = edit.tag;
      this.editProject._category = edit._category;
      return edit;
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "projectDetails"
      });
    },
    editData() {
      const key = this.currentProject[".key"];
      dbProjectsRef
        .child(key)
        .update(encryptData(this.editProject))
        .then(() => {
          this.$message({
            showClose: true,
            message:
              "New project " +
              this.editProject.title +
              " successfully updated!",
            type: "success"
          });
          this.$router.push({
            name: "projectDetails",
            params: { projectid: this.currentProject._id }
          });
        })
        .catch(error => {
          this.$message.error("Oops, something went wrong: " + error);
        });
    }
  }
};
</script>

<style scoped>
</style>
