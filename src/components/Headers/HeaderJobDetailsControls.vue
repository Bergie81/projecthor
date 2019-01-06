<template>
    <el-row id="header-job-details-controls" class="app-header-controls">
        <el-col :xs="24" :sm="12">
          <button class="app-setting-btn"  @click="handleBack">
            <i class="el-icon-caret-left"></i>
            <span class="ml-1">Back</span>
          </button>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-row type="flex" justify="end">
            <button class="app-setting-btn" @click="handleEdit">
              <i class="el-icon-edit"></i>
              <span class="ml-1">Edit</span>
            </button>
            <button 
              v-if="isInCharge" 
              :disabled="!getMembers(currentJob)[0]" 
              class="app-setting-btn" 
              @click="handleTransfer">
                <i class="el-icon-refresh"></i>
                <span class="ml-1">Transfer Authority</span>
            </button>
            <button v-if="!isInCharge" class="app-setting-btn" @click="handleLeave">
              <i class="el-icon-remove-outline"></i>
              <span class="ml-1">Leave</span>
            </button>
            <button v-if="isInCharge" class="app-setting-btn" @click="handleDelete">
              <i class="el-icon-delete"></i>
              <span class="ml-1">Delete</span>
            </button>
          </el-row>
        </el-col>     
      </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { getMembers } from "@/utils/user";
import { setDbPath } from "@/utils/dbData";
import { dbProjectsRef } from "@/firebase";
export default {
  name: "controlsJobDetails",
  data() {
    return {};
  },
  props: {
    currentJob: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isInCharge() {
      return this.currentJob._inCharge === this.currentUser;
    },
    // TODO wenn user noch an step oder task beteiligt ist (dort inCharge oder Member)
    isInvolved() {},
    //TODO wenn keiner mehr involviert und man selber InCharge
    isAlone() {}
  },
  methods: {
    getMembers,
    setDbPath,
    handleBack() {
      this.$router.push({
        name: this.setDbPath(this.currentJob).back
      });
    },
    handleEdit() {
      this.$router.push({
        name: this.setDbPath(this.currentJob).edit
      });
    },
    handleTransfer() {},
    handleLeave() {
      this.$confirm("Do you really want to leave?", "Warning", {
        confirmButtonText: "Leave",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          let index = 0;
          let members = this.currentJob._member;
          let path = this.setDbPath(this.currentJob);
          if (members) {
            index = members.indexOf(this.currentUser);
            /*             if (index > -1) {
              members.splice(index, 1);
            } */
          }
          dbProjectsRef
            .child(path.members)
            .child(index)
            .remove()
            .then(() => {
              this.$message({
                type: "success",
                message:
                  "You have left the " + path.type + " " + this.currentJob.title + "!"
              });
              this.$router.push({
                name: path.back
              });
            })
            .catch(error => {
              this.$message({
                showClose: true,
                duration: 0,
                message:"Oops, something went wrong: " + error,
                type: "error"
              });
              //this.$message.error("Oops, something went wrong: " + error);
            });
        })
        .catch((error) => {
          this.$message({
            type: "info",
            message: "Delete canceled. " + error
          });
        });
    },
    handleDelete() {
      let path = this.setDbPath(this.currentJob);
      this.$confirm(
        "This will permanently delete this " + path.type + ". Continue?",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning"
        })
          .then(() => {
            dbProjectsRef
              .child(path.currentJob)
              .remove()
              .then(() => {
                this.$message({
                  type: "success",
                  message: path.type + " deleted!"
                });
                this.$router.push({
                  name: path.back
                });
              })
              .catch(error => {
                this.$message({
                  showClose: true,
                  duration: 0,
                  message:"Oops, something went wrong: " + error,
                  type: "error"
                });
                //this.$message.error("Oops, something went wrong: " + error);
              });
          })
          .catch((error) => {
            this.$message({
              type: "info",
              message: "Delete canceled. " + error
            });
          });
    }
  }
};
</script>

<style>
</style>
