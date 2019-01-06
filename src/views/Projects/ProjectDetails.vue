<template>
  <section id="project-details" v-if="currentProject">
    <!-- <p> ID {{ $route.params.projectid }} </p> -->
    <project-header
      :currentProject="currentProject">
    </project-header>

    <main class="app-container">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="16">
          <ui-card>
            <h2 class="app-text-subheadline">Tasks:</h2>
            <div v-if="!currentProject._tasks">
              <el-row type="flex" justify="center">
                  <svgicon :icon="'emoticon-unhappy'" height="50" :color="'#999'"></svgicon>
              </el-row> 
              <el-row>  
                  <p class="app-text-italic mt-3">No Tasks defined, yet. Add some!</p>
              </el-row> 
            </div> 
            <el-row v-if="currentProject._tasks">
                <tasks-list
                  :currentProject="currentProject">
                </tasks-list>
            </el-row>
            <add-task 
              class="mt-4"
              :currentProject="currentProject">
            </add-task>
          </ui-card>
        </el-col>
    
        <el-col :xs="24" :sm="8">
          <avatar-list
            :title="'Project Members'"
            :currentJob="currentProject">
          </avatar-list>

          <ui-card class="text-center">
            <p class="mb-32 font-semibold">Pinboard:</p>
          </ui-card>

          <ui-card class="text-center">
            <p class="mb-32 font-semibold">Project Log:</p>
          </ui-card>
        </el-col>
      </el-row>
    </main>
  </section>
</template>

<script>
import ProjectHeader from "@/components/Headers/HeaderJobDetails.vue";
import TasksList from "@/components/Widgets/TasksList";
import AddTask from "@/components/Widgets/AddTask.vue";
import AvatarList from "@/components/Widgets/AvatarList.vue";
import { getProjectFromID } from "@/utils/dbData";
export default {
  name: "projectDetails",
  components: {
    ProjectHeader,
    TasksList,
    AddTask,
    AvatarList
  },
  computed: {
    currentProject() {
      return getProjectFromID(
        this.$store.getters.decryptedProjects,
        this.$route.params.projectid
      );
    }
  },
  methods: {
    getProjectFromID
  }
};
</script>

<style scoped>
</style>
