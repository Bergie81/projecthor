<template>
  <section id="new-user">
    <div class="app-header">
      <el-row>
        <p class="app-header-intro"></p>
      </el-row>
      <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline">Hello, I am ...</h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <p class="app-header-status"></p>
        </el-col>
      </el-row>
      <el-row>
        <p class="app-header-description"></p>
      </el-row>
    </div>
    <main class="app-container">
      <ui-card>
        <el-form label-position="top" ref="form">

          <el-row>
            <el-col :xs="24" :sm="3">
              <el-form-item label="Title">
                <el-input v-model="newUser.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="{span: 8, offset: 1}">
              <el-form-item label="Name">
                <el-input v-model="newUser.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="{span: 8, offset: 1}">
              <el-form-item label="Surname">
                <el-input v-model="newUser.surname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="{span: 2, offset: 1}">
              <el-form-item label="Initials">
                <el-input v-model="newUser.initials"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="24" :sm="12">
              <el-form-item label="Email">
                <el-input v-model="newUser.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="20" :sm="{span: 8, offset: 1}">
              <el-form-item label="Department">
                <el-select 
                  v-model="newUser.department" style="width: 100%;">
                  <el-option 
                    v-for="department in getDepartments" 
                    :key="department['.key']" 
                    :value="department"
                    > {{ department }} </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 3, offset: 1}" :sm="{span: 2, offset: 1}">
              <el-form-item class="text-center" label="Color">
                <el-color-picker 
                  v-model="newUser.color"
                  :predefine="getSwatches"
                  ></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="end">
            <el-form-item>
              <button class="app-btn" :disabled="!valid" @click.prevent="addUser">Introduce Me</button>
            </el-form-item>
          </el-row>
        <!-- {{ newUser }} -->
        </el-form>
      </ui-card>
    </main>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { createRandomId } from "@/utils";
import { dbUsersRef } from "../../firebase";
export default {
  name: "newUser",
  data() {
    return {
      newUser: {
        title: "",
        name: "",
        surname: "",
        initials: "",
        color: "",
        email: "",
        department: "",
        image: "",
        theme: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getDepartments", "getSwatches"]),
    valid() {
      if (
        this.newUser.name !== "" &&
        this.newUser.surname !== "" &&
        this.newUser.initials !== "" &&
        this.newUser.email !== "" &&
        this.newUser.color !== "" &&
        this.newUser.department !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    createRandomId,
    addUser() {
      this.newUser._id = "user" + this.createRandomId(6);
      dbUsersRef
        .push(this.newUser)
        .then(() => {
          localStorage.setItem("currentUser", this.newUser._id);
          this.$message({
            showClose: true,
            message:
              "New user: " + this.newUser.name + " successfully created!",
            type: "success"
          });
          // this.$router.push({
          //   name: "Dashboard"
          // });
        })
        .catch(error => {
          this.$message.error("Oops, something went wrong: " + error);
        });
    }
  }
};
</script>
