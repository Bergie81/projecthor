<template>
  <section id="show-projects">
    <div class="app-header">
      <el-row>
        <p class="app-header-intro"></p>
      </el-row>
      <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline"> My Projects </h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <p class="app-header-status"></p>
        </el-col>
      </el-row>
      <el-row>
        <p class="app-header-description"> An Overview of all of my current Projects. </p>
      </el-row>
    </div>

    <main class="app-container">
      <ui-card>
        <el-row type="flex" justify="end">
            <el-input
              class="search"
              placeholder="Search"
              prefix-icon="el-icon-search"
              v-model="filteredProject">
            </el-input>
        </el-row>
        <el-row>
          <el-table 
            :data="filteredProjects" 
            :stripe="true" :border="false" 
            style="width: 100%"
            :row-style="rowStyle"
            :empty-text="'No Projects found.'"
            @row-click="goToProject">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-row class="app-row" type="flex" justify="start">
                  <el-col :span="4">
                    <p>Category:</p>
                  </el-col>
                  <el-col :span="20">
                    <p>{{getCategory(props.row)}}</p>
                  </el-col>
                </el-row>
                <el-row class="app-row" type="flex" justify="start">
                  <el-col :span="4">
                    <p>Description:</p>
                  </el-col>
                  <el-col :span="20">
                    <p>{{ props.row.description }}</p>
                  </el-col>
                </el-row>
                <el-row class="app-row" type="flex" justify="start">
                  <el-col :span="4">
                    <p>Members:</p>
                  </el-col>
                  <el-col :span="20">
                    <el-row type="flex" justify="start">
                      <avatars :avatars="[props.row._inCharge]" :tooltip="true"></avatars>
                      <avatars :avatars="props.row._member" :tooltip="true"></avatars>
                    </el-row>
                    
                  </el-col>
                </el-row>
                <el-row v-if="props.row._tasks" class="app-row" type="flex" justify="start">
                  <el-col :span="4">
                    <p>Tasks:</p>
                  </el-col>
                  <el-col :span="20">
                    <ul>
                  <li class="mb-2" v-for="task in sortedTasksList(props.row._tasks)" :key="task['.key']">
                    {{ task.title }}
                  </li>
                </ul>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column min-width="280" label="Project" prop="title">
            </el-table-column>
            <el-table-column min-width="70" label="Status" prop="status">
              <template slot-scope="props">
                <div>
                  <div v-if="props.row.progress === ''">
                    0%
                  </div>
                  <div v-else>
                   
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="150" label="Department" prop="_category[0]">
            </el-table-column>
            <el-table-column min-width="100" label="In Charge">
              <template slot-scope="props">
                <div>
                  {{ getAuthority(props.row._inCharge) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="100" label="Time" prop="date">
              <template slot-scope="props">
                <div>
                  {{ getDuration(props.row)[0] }} -
                </div>
                <div>
                  {{ getDuration(props.row)[1] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
         
      </ui-card>
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { dynamicSort, dynamicSortObj, getDate } from "@/utils";
import Avatars from "@/components/Widgets/Avatars.vue";
export default {
  name: "showProjects",
  components: { Avatars },
  data() {
    return {
      filteredProject: "",
      tableLoading: true
    };
  },
  computed: {
    ...mapGetters(["decryptedProjects", "getUsers"]),
    rowStyle() {
      return { cursor: "pointer" };
    },
    filteredProjects() {
      return this.accessibleProjects(this.decryptedProjects)
        .sort(dynamicSort("title"))
        .filter(project => {
          const fullProjectTerm = project.title;
          return fullProjectTerm
            .toLowerCase()
            .match(this.filteredProject.toLowerCase());
        });
    }
  },
  methods: {
    // handleEdit(row) {
    //   console.log("clicked", row);
    // },
    accessibleProjects(projects) {
      let filteredProjects = [];
      const currentUser = this.$store.getters.currentUser;
      projects.forEach(project => {
        if (project._inCharge === currentUser) {
          filteredProjects.push(project);
        }
        // When Member List not existing or empty
        if (project._member && typeof project._member !== "string") {
          const isMember = project._member.filter(
            member => member === currentUser
          )[0];
          if (isMember) {
            filteredProjects.push(project);
          }
        }
      });
      return filteredProjects;
    },
    getCategory(project) {
      let string = "";
      for (const category of project._category) {
        string = string.concat(category + " / ");
      }
      return string;
    },
    getAuthority(authority) {
      const findUser = this.getUsers.filter(user => user._id === authority);
      return findUser[0].initials;
    },
    getDuration(project) {
      if (project._tasks) {
        //Convert Object of Objects to Array of Objects, dynamic sort by property
        const start = dynamicSortObj(project._tasks, "dateStart")[0].dateStart;
        //.pop() isolates last item from Array
        const end = dynamicSortObj(project._tasks, "dateEnd").pop().dateEnd;
        return [getDate(start).toString(), getDate(end).toString()];
      } else {
        return "";
      }
    },
    sortedTasksList(tasks) {
      return dynamicSortObj(tasks, "_orderId");
    },
    goToProject(project) {
      this.$router.push({
        name: "projectDetails",
        params: {
          projectid: project._id
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clickable {
  cursor: pointer;
}
.search {
  width: 250px;
  margin-bottom: 10px;
}
.app-row {
  margin-bottom: 15px;
}
</style>
