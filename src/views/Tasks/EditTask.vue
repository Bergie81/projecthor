<template>
  <section id="edit-project" v-if="parentProject">
    <div class="app-header">
      <el-row type="flex" justify="start">
        <div class="app-header-intro">
          <span 
            v-for="(category, index) in editTask._category" :key="index"> 
              {{ category + " / " }}  
          </span>
        </div> 
      </el-row>
       <el-row>
          <h1 style="margin-left: 3%;" class="app-header-headline"> {{ editTask.title }} </h1>
      </el-row> 
      <el-row>
        <p class="app-header-description"> {{ editTask.description }} </p>
      </el-row>
    </div>

    <main class="app-container">
      <ui-card>
      <el-form label-position="top" ref="form">

        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <el-form-item label="Title">
              <el-input v-model="editTask.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="24" :sm="11">
            <el-form-item label="In Charge">
              <el-select 
              v-model="editTask._inCharge" style="width: 100%;">
              <el-option 
                  v-for="user in getUsers" 
                  :key="user['.key']" 
                  :label="user.name"
                  :value="user._id"
                  > {{ user.name }} </el-option>
              </el-select>
          </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="{span: 12, offset: 1}">
            <el-form-item label="Date">
              <el-date-picker
                  style="width: 100%;"
                  v-model="date"
                  type="daterange"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  value-format="timestamp"
                  format="dd/MM/yyyy"
                  :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
          </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Description">
          <el-input 
            type="textarea" 
            :autosize="{ minRows: 3, maxRows: 10}" 
            v-model="editTask.description"
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
  name: "editTask",
  components: {},
  data() {
    return {
      editTask: {
        title: "",
        description: "",
        date: "",
        _inCharge: ""
      },
      date:"",
      taskKey:""
    };
  },
  computed: {
    ...mapGetters(["decryptedProjects", "getCategories", "getUsers"]),
    valid() {
      if (
        this.editTask.title !== "" &&
        this.editTask.description !== "" &&
        this.date !== "" &&
        this.editTask._inCharge !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    parentProject() {
      let task = {};
      const project = this.decryptedProjects.filter(
        project => project._id === this.$route.params.projectid
      )[0];
   
        for (var key in project._tasks) {
          if (project._tasks[key]._id === this.$route.params.taskid) {
            task = project._tasks[key];
            this.taskKey = key;
            this.editTask.title = task.title;
            this.editTask.description = task.description;
            this.date = [task.dateStart, task.dateEnd];
            this.editTask._inCharge = task._inCharge;
            this.loading = false;
          }
        }
      
      return project;
    },
/*     parentProject() {
      return this.decryptedProjects.filter(
        project => project._id === this.$route.params.projectid
      )[0];
    },
    currentTask() {
      let task = {};
      const tasks = this.parentProject._tasks;
      for (var key in tasks) {
        if (tasks[key]._id === this.$route.params.taskid) {
          task = tasks[key];
          console.log(task);
          this.editTask.title = task.title;
          this.editTask.description = task.description;
          this.editTask.date = [task.dateStart, task.dateStart];
          this.editTask._inCharge = task._inCharge;
        }
      }
      return task
    }, */
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "taskDetails"
      });
    },
    editData() {
      this.editTask.dateStart = this.date[0].toString();
      this.editTask.dateEnd = this.date[1].toString();
      dbProjectsRef
        .child(`${this.parentProject[".key"]}/_tasks/${this.taskKey}`)
        .update(encryptData(this.editTask))
        .then(() => {
          this.$message({
            showClose: true,
            message:
              this.editTask.title +
              " successfully updated!",
            type: "success"
          });
          this.$router.push({
            name: "taskDetails"
          });
        })
        .catch(error => {
          this.$message.error("Oops, something went wrong: " + error);
        });
    }
  }
  /* beforeRouteEnter (to, from, next) {

  }, */
};
</script>

<style scoped>
</style>
