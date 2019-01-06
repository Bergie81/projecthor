<template>
    <section id="add-progress-step">
        <ui-card>
            <h3>Add Progress</h3>
            <el-form label-position="top">
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
              
                <el-row type="flex" justify="end">
                    <el-button
                    v-if="!done"
                    class="app-btn mb-8" 
                    type="text" 
                    :disabled="!valid" 
                    @click="addProgress()">
                    <svgicon class="app-btn-icon" :icon="'plus'"></svgicon>
                    <span class="ml-2">Add Progress</span>
                    </el-button>
                </el-row>
            </el-form>
        </ui-card>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import { dbProjectsRef } from "@/firebase";
import { getProjectFromID, getTaskFromID, setDbPath } from "@/utils/dbData";
import { dynamicSortObj } from "@/utils/index.js";
import { encryptData } from "@/utils/crypto";
export default {
  name: "addProgressStep",
  data() {
    return {
      progressId: "",
      progress: {
        description: "",
        _achiever: "",
        achieved: 0
      },
      time: "",
      achieved: 0,
      done: false
    };
  },
  props: {
    step: {
      type: Object
    },
    stepKey: {
      type: String
    }
  },
  computed: {
    ...mapGetters(["decryptedProjects", "getUsers"]),
    valid() {
      if (
        this.progress._achiever !== "" &&
        this.time !== "" &&
        this.achieved !== 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getProjectFromID,
    getTaskFromID,
    setDbPath,
    dynamicSortObj,
    encryptData,
    addProgress() {
      const currentProject = getProjectFromID(
        this.$store.getters.decryptedProjects,
        this.$route.params.projectid
      );
      const currentTask = getTaskFromID(
        currentProject,
        this.$route.params.taskid
      );
      this.progress.time = this.time.toString();
      this.progress.achieved = this.achieved.toString();

      // ((console.log(currentTask._steps[this.stepKey]._progress);
      // const stepStatus = dynamicSortObj(
      //   currentTask._steps[this.stepKey]._progress,
      //   "achieved"
      // );
      //console.log("stepStatus", stepStatus);
      //write to DB
      dbProjectsRef
        .child(`${setDbPath(currentTask).jobs}/${this.stepKey}/_progress`)
        .push(encryptData(this.progress))
        .then(() => {
          dbProjectsRef
            .child(`${setDbPath(currentTask).jobs}/${this.stepKey}/status`)
            .set(this.progress.achieved)
            .then(() => {
              this.$message({
                showClose: true,
                message: "Progressed Step successfully added!",
                type: "success"
              });
            });
          this.$emit("showWidget", false);
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
