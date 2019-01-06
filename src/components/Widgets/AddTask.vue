<template>
    <section id="add-task">
      <el-row type="flex" justify="end">
        <el-button 
                  v-if="!showAddTask"
                  class="app-btn w-32" 
                  type="text" 
                  @click="showAddTask = !showAddTask">
                  <svgicon class="app-btn-icon" :icon="'tasks'"></svgicon>
                  <span class="ml-2">Add Task</span>
                </el-button>
                <el-button 
                  v-if="showAddTask"
                  class="app-btn w-32" 
                  type="text" 
                  @click="showAddTask = !showAddTask">
                  <svgicon class="app-btn-icon" :icon="'edit'"></svgicon>
                  <span class="ml-2">Cancel</span>
                </el-button>
      </el-row>
      <el-row v-show="showAddTask" class="mt-4">
            <ui-card>
              <h3 class="mb-1">Add Task to Project</h3>
            <el-form label-position="top">
                <el-row type="flex" justify="space-between">
                    <el-col>
                        <el-form-item label="Task">
                            <el-input v-model="newTask.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>    
                <el-row type="flex" justify="space-between">
                    <el-col>
                        <el-form-item label="Description">
                            <el-input 
                            type="textarea" 
                            :autosize="{ minRows: 3, maxRows: 10}" 
                            v-model="newTask.description"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                    <el-col :xs="24" :sm="12" >
                        <el-form-item label="In Charge">
                            <el-select 
                            v-model="newTask._inCharge" style="width: 100%;">
                            <el-option 
                                v-for="user in getUsers" 
                                :key="user['.key']" 
                                :label="user.name"
                                :value="user._id"
                                > {{ user.name }} </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
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
                <el-row class="mt-3" type="flex" justify="end">
                    <el-form-item>
                    <button 
                        class="app-btn" 
                        :disabled="!valid" 
                        @click.prevent="addTask"
                        >Add</button>
                    </el-form-item>
                </el-row>
            </el-form> 
            </ui-card>
          </el-row>  
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import { createRandomId } from "@/utils";
import { setDbPath } from "@/utils/dbData";
import { addUserToJob } from "@/utils/user";
import { encryptData } from "@/utils/crypto";
import { dbProjectsRef } from "@/firebase";
export default {
  name: "addTask",
  data() {
    return {
      showAddTask: false,
      date: "",
      projectMemberList: [],
      newTask: {
        title: "",
        _inCharge: "",
        description: "",
        dateStart: "",
        dateEnd: "",
        _orderId: 1001,
        _done: false
      }
    };
  },
  props: {
    currentProject: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getUsers"]),
    valid() {
      if (
        this.newTask.title !== "" &&
        this.newTask._inCharge !== "" &&
        this.date !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createRandomId,
    addUserToJob,
    encryptData,

    addTask() {
      this.newTask._id = "task" + createRandomId(8);
      this.newTask.dateStart = this.date[0].toString();
      this.newTask.dateEnd = this.date[1].toString();
      //Generate common orderId from task length
      if (this.currentProject._tasks) {
        this.newTask._orderId =
          Object.keys(this.currentProject._tasks).length + 1001;
      }
      // write to DB
      dbProjectsRef
        .child(setDbPath(this.currentProject).jobs)
        .push(encryptData(this.newTask))
        .then(() => {
          addUserToJob(this.newTask._inCharge, this.currentProject);
          this.$message({
            showClose: true,
            message:
              "New Task " + this.newTask.title + " successfully created!",
            type: "success"
          });
          this.newTask.title = "",
          this.newTask.description = "",
          this.newTask._inCharge = "",
          this.date = ""
        })
        .catch(error => {
          this.$message.error("Oops, something went wrong: " + error);
        });
    }
  }
};
</script>
