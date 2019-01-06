<template>
    <div id="avatar-list">
        <ui-card class="text-center">
            <p class="mb-3 font-semibold"> {{ title }}:</p>
            <avatars :avatars="[currentJob._inCharge]" :tooltip="true"></avatars>
            <avatars :avatars="getMembers(currentJob)" :tooltip="true"></avatars>
            <div>
              <el-button
                v-if="isInCharge"
                class="app-control-btn" 
                style="width:50%;" 
                type="text" 
                @click.native="openDialog">
                <svgicon class="app-control-btn-icon" :icon="'user-edit'"></svgicon>
                <span class="ml-1">Edit</span>
              </el-button>
            </div>
          </ui-card>

          <el-dialog 
            title="Select Staff" 
            :visible.sync="dialogVisible" 
            @close="filteredUser = ''"
            >
            <el-row type="flex" justify="start" align="middle" class="mb-5">
            <span  class=" ml-8 mr-5">
                <el-checkbox disabled v-model="checkedAll"></el-checkbox>
            </span>
            <span class="w-full">
                <el-input
                placeholder="Search"
                prefix-icon="el-icon-search"
                v-model="filteredUser">
                </el-input>
            </span>
            </el-row>
            
            <el-row v-for="user in filteredUsers" :key="user._id">
            <user-list-item
                :user="user"
                :isChecked="isSelected(user._id)"
                :allIsChecked="checkedAll"
                @selection="userList($event)"
            ></user-list-item>
            </el-row>
            <el-row class="line-above" type="flex" justify="end" align="middle">
            <el-button class="app-btn mb-3" type="text" @click="addMember">Confirm</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getMembers } from "@/utils/user";
import { dbProjectsRef } from "@/firebase";
import Avatars from "@/components/Widgets/Avatars.vue";
import UserListItem from "@/components/Widgets/UserListItem.vue";
export default {
  name: "avatarList",
  components: {
    Avatars,
    UserListItem
  },
  data() {
    return {
      filteredUser: "",
      selectedMember: [],
      dialogVisible: false,
      checkedAll: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    currentJob: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getUsers", "getOtherUsers", "currentUser"]),
    isInCharge() {
      return this.currentJob._inCharge === this.currentUser;
    },
    filteredUsers() {
      // without Authority
      const UserwithoutAuthority = this.getOtherUsers.filter(
        user => user._id !== this.currentJob._inCharge
      );
      return UserwithoutAuthority.filter(user => {
        const fullUser = user.name + " " + user.surname + " " + user.initials;
        return fullUser.toLowerCase().match(this.filteredUser.toLowerCase());
      });
    }
  },
  methods: {
    getMembers,
    openDialog() {
      this.selectedMember = this.getMembers(this.currentJob).map(
        member => member._id
      );
      this.dialogVisible = true;
    },
    userList(user) {
      if (user.checked) {
        this.selectedMember.push(user.id);
      } else {
        this.selectedMember.splice(this.selectedMember.indexOf(user.id), 1);
      }
    },
    // is checked when user is in Member list
    isSelected(idChecked) {
      let status = false;
      this.getMembers(this.currentJob).filter(member => {
        if (member._id === idChecked) {
          status = true;
        }
      });
      return status;
    },
    addMember() {
      let path = "";
      let message = "";
      if(this.currentJob._id.substring(0, 4) === 'proj') {
        path = `${this.currentJob['.key']}/_member`;
        message = "Project member list successfully updated!";
      } else {
        path = `${this.currentJob.projectRef}/_tasks/${this.currentJob.ref}/_member`;
        message = "Task Partner list successfully updated!";
      }
      dbProjectsRef
        .child(path)
        .set(this.selectedMember)
        .then(() => {
          this.dialogVisible = false;
          this.$message({
            showClose: true,
            duration: 1500,
            message,
            type: "success"
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
    }
  }
};
</script>

<style>
</style>
