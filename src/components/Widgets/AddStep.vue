<template>
    <section id="add-step">
        <el-row type="flex" justify="end">
            <el-button 
                v-if="!showAddStep"
                class="app-btn mb-8 w-32" 
                type="text" 
                @click="showAddStep = !showAddStep">
                <svgicon class="app-btn-icon" :icon="'plus'"></svgicon>
                <span class="ml-2">Add Step</span>
            </el-button>
            <el-button
                v-if="showAddStep" 
                class="app-btn mb-8 w-32" 
                type="text" 
                @click="showAddStep = !showAddStep">
                <svgicon class="app-btn-icon" :icon="'edit'"></svgicon>
                <span class="ml-2">Cancel</span>
            </el-button>
        </el-row>

        <el-row v-show="showAddStep">
            <ui-card>
                <h3>Add Step</h3>
                <el-form label-position="top">
                    <el-row>
                        <el-form-item label="Title">
                            <el-input v-model="step.title"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :xs="24" :sm="12">
                            <el-form-item label="In Charge">
                                <el-select 
                                    v-model="step._inCharge" style="width: 100%;">
                                <el-option 
                                    v-for="user in getUsers" 
                                    :key="user._id"
                                    :label="user.name" 
                                    :value="user._id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="start" align="middle">         
                        <h3 class="mb-2 mt-3">Already something accomplished?</h3>
                        <el-checkbox class="ml-8" v-model="done">Yes!</el-checkbox>
                    </el-row>
                    <div v-show="done">
                    <el-row>
                        <el-col :xs="24" :sm="12">
                            <el-form-item label="Who">
                                <el-select 
                                    v-model="progress._achiever" style="width: 100%;">
                                <el-option 
                                    v-for="user in getUsers" 
                                    :key="user._id"
                                    :label="user.name" 
                                    :value="user._id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="{span: 11, offset: 1}">
                            <el-form-item label="When">
                                <el-date-picker
                                    style="width: 100%;"
                                    v-model="time"
                                    type="datetime"
                                    value-format="timestamp"
                                    format="dd.MM.yyyy HH:mm:ss"
                                    placeholder="Select date and time"
                                    default-time="12:00:00">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="Details">
                            <el-input 
                                type="textarea" 
                                :autosize="{ minRows: 3, maxRows: 10}" 
                                v-model="progress.description"
                                ></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="How much of this step (in %)">
                            <el-slider v-model="achieved"></el-slider>
                        </el-form-item> 
                    </el-row>
                    </div>
                    <el-row type="flex" justify="end">
                        <el-button
                            v-if="!done"
                            class="app-btn mb-8" 
                            type="text" 
                            :disabled="!valid" 
                            @click="addStep">
                            <svgicon class="app-btn-icon" :icon="'plus'"></svgicon>
                            <span class="ml-2">Add Step</span>
                        </el-button>
                        <el-button
                            v-if="done"
                            class="app-btn mb-8" 
                            type="text" 
                            :disabled="!valid" 
                            @click="addStep">
                            <svgicon class="app-btn-icon" :icon="'check'"></svgicon>
                            <span class="ml-2">Add progressed Step</span>
                        </el-button>
                    </el-row>
                </el-form>
            </ui-card>
        </el-row>
        
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import { dbProjectsRef } from "@/firebase";
import { createRandomId } from "@/utils";
import { getProjectFromID, getTaskFromID, setDbPath } from "@/utils/dbData";
import { addUserToJob } from "@/utils/user";
import { encryptData } from "@/utils/crypto";
export default {
  name: "addStep",
  data() {
    return {
      showAddStep: false,
      step: {
        title: "",
        _inCharge: ""
      },
      progress: {
        description: "",
        _achiever: ""
      },
      time: "",
      achieved: 0,
      done: false
    };
  },
  computed: {
    ...mapGetters(["decryptedProjects", "getUsers"]),
    valid() {
      if (this.step.title !== "" && this.step._inCharge !== "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createRandomId,
    getProjectFromID,
    getTaskFromID,
    setDbPath,
    addUserToJob,
    encryptData,

    addStep() {
      const currentProject = getProjectFromID(
        this.$store.getters.decryptedProjects,
        this.$route.params.projectid
      );
      const currentTask = getTaskFromID(
        currentProject,
        this.$route.params.taskid
      );
      this.step._id = "step" + createRandomId(8);
      this.progress.time = this.time.toString();
      this.progress.achieved = this.achieved.toString();

      // write to DB
      dbProjectsRef
        .child(setDbPath(currentTask).jobs)
        .push(encryptData(this.step))
        .then(snap => {
            addUserToJob(this.step._inCharge, currentProject);
            addUserToJob(this.step._inCharge, currentTask);
          const progressKey = snap.key;
          if (this.done) {
            dbProjectsRef
              .child(
                `${setDbPath(currentTask).jobs}/${progressKey}/_progress`
              )
              .push(encryptData(this.progress))
              .then(() => {
                this.$message({
                  showClose: true,
                  message:
                    "Progressed Step " +
                    this.step.title +
                    " successfully created!",
                  type: "success"
                });
              });
          }
          this.$message({
            showClose: true,
            message: "New Step " + this.step.title + " successfully created!",
            type: "success"
          });
        })
        .catch(error => {
          this.$message.error("Oops, something went wrong: " + error);
        });
    }
  }
};
</script>

<style>
</style>
