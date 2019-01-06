<template>
  <section id="task-details" v-if="currentProject">
    <!-- <p> ID {{ $route.params.taskid }} </p> -->
    <task-header
      :currentProject="currentProject"
      :currentTask="currentTask"
    ></task-header>

    <main class="app-container">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="16">
          <ui-card>
            <h2 class="app-text-subheadline">Steps:</h2>
            <!-- No Steps -->
            <div v-if="!currentTask._steps">
              <el-row type="flex" justify="center">
                  <svgicon :icon="'layer'" height="30" :color="'#999'"></svgicon>
              </el-row> 
              <el-row>  
                  <p class="app-text-italic mt-3">No Steps defined. <br> Add some when needed.</p>
              </el-row> 
            </div> 
            <!-- Steps defined -->
            <el-row v-if="currentTask._steps">
                <steps-list
                  :list="currentTask._steps">
                </steps-list> 
            </el-row>
            <!-- Add Step -->
            <add-step></add-step>
          </ui-card>
        </el-col>

        <!-- Sidebar -->
        <el-col :xs="24" :sm="8">
          <avatar-list
            :title="'Task Partners'"
            :currentJob="currentTask">
          </avatar-list>

          <ui-card class="text-center">
            <p class="mb-32 font-semibold">Pinboard:</p>
          </ui-card>

          <ui-card class="text-center">
            <p class="mb-32 font-semibold">Task Log:</p>
          </ui-card>
        </el-col>
      </el-row>
    </main>
  </section>
</template>

<script>
import TaskHeader from "@/components/Headers/HeaderJobDetails.vue";
import StepsList from "@/components/Widgets/StepsList.vue";
import AddStep from "@/components/Widgets/AddStep.vue";
import AvatarList from "@/components/Widgets/AvatarList.vue";
import { getProjectFromID, getTaskFromID } from "@/utils/dbData";
import { dbProjectsRef } from "@/firebase";
export default {
  name: "taskDetails",
  components: {
    TaskHeader,
    StepsList,
    AddStep,
    AvatarList
  },
  data() {
    return {};
  },
  computed: {
    currentProject() {
      return getProjectFromID(
        this.$store.getters.decryptedProjects,
        this.$route.params.projectid
      );
    },
    currentTask() {
      return getTaskFromID(this.currentProject, this.$route.params.taskid);
    }
  },
  methods: {
    getProjectFromID,
    getTaskFromID
  }
};
</script>

<style scoped>
</style>
