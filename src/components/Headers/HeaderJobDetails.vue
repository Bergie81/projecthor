<template>
    <header id="header-job-details" class="app-header">
        <el-row v-if="currentJob._category">
          <p class="app-header-intro"> {{ getCategory }} </p>
          <p class="app-header-duration"> {{ getDuration }} </p>
      </el-row>
      <el-row v-if="currentJob.dateStart">
        <p class="app-header-intro"> {{ getCategory }} {{ currentProject.title }} </p>
        <p class="app-header-duration"> {{ getDate(currentJob.dateStart) }} - {{ getDate(currentJob.dateEnd) }} </p>
      </el-row>
      
       <el-row align="middle">
        <el-col :xs="24" :sm="16">
          <h1 class="app-header-headline"> {{ currentJob.title }} </h1>
        </el-col>
        <el-col :xs="24" :sm="8">
          <p class="app-header-status">80%</p>
        </el-col>
      </el-row> 

      <el-row>
        <p class="app-header-description"> {{ currentJob.description }} </p>
      </el-row>
      <controls :currentJob="currentJob"></controls>
      <!-- <pre>
        {{ currentJob }}
      </pre> -->
    </header>
</template>

<script>
import Controls from "@/components/Headers/HeaderJobDetailsControls.vue";
import { dynamicSortObj, getDate } from "@/utils/index";
export default {
  name: "headerJobDetails",
  components: {
    Controls
  },
  data() {
    return {};
  },
  props: {
    currentProject: {
      type: Object
    },
    currentTask: {
      type: Object
    }
  },
  computed: {
    currentJob() {
      if (this.currentTask) {
        return this.currentTask;
      } else {
        return this.currentProject;
      }
    },
    getCategory() {
      let string = "";
      for (const category of this.currentProject._category) {
        string = string.concat(category + " / ");
      }
      return string;
    },
    getDuration() {
      if (this.currentProject._tasks) {
        //Convert Object of Objects to Array of Objects, dynamic sort by property
        const start = dynamicSortObj(this.currentProject._tasks, "dateStart")[0]
          .dateStart;
        //.pop() isolates last item from Array
        const end = dynamicSortObj(this.currentProject._tasks, "dateEnd").pop()
          .dateEnd;
        return getDate(start).toString() + " - " + getDate(end).toString();
      }
    }
  },
  methods: {
    getDate,
    dynamicSortObj
  }
};
</script>


<style>
</style>
