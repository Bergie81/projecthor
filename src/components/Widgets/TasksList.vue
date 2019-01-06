<template>
  <div id="task-list">
    <!-- :options="{animation: 150}" -->
    <draggable
      :list="taskList" 
      @update="setNewListOrder">
        <div v-for="(element, index) in sortedList" :key="index">
          <task-item :element="element" :index="index"></task-item>
        </div>
    </draggable>
  </div>
    
</template>

<script>
import draggable from "vuedraggable";
import TaskItem from "@/components/Widgets/TaskItem.vue";
import { dynamicSort } from "@/utils/index";
import { dbProjectsRef } from "@/firebase";
export default {
  name: "tasksList",
  components: {
    draggable,
    TaskItem
  },
  props: {
    currentProject: {
      type: Object,
      required: true
    }
  },
  computed: {
    taskList() {
      const tasks = this.currentProject._tasks;
      // put Firebase Project ID (ref) in _tasks
      for (var key in tasks) {
        if (tasks.hasOwnProperty(key)) {
          tasks[key].ref = key;
        }
      }
      // Object -> Array
      return Object.values(tasks);
    },
    sortedList() {
      return this.taskList.sort(this.dynamicSort("_orderId"));
    }
  },
  methods: {
    dynamicSort,
    setNewListOrder() {
      this.taskList.forEach((task, index) => {
        dbProjectsRef
          .child(`${this.currentProject[".key"]}/_tasks/${task.ref}/_orderId`)
          .set(index)
          .then(() => {})
          .catch(error => {
            this.$message.error("Oops, something went wrong: " + error);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.number {
  font-size: 3rem;
  font-weight: 400;
  padding-right: 5px;
  padding-bottom: 10px;
}
.card-avatar {
  display: flex;
  align-items: center;
  width: 80%;
  height: auto;
  border-radius: 100px;
}
.content {
  padding: 15px 15px 5px 15px;
}
.description {
  font-size: 0.8rem;
  padding: 10px 15px 15px;
}
.status {
  font-size: 2rem;
  font-weight: 700;
}
.card {
  background-color: white;
  font-size: 1rem;
  font-weight: 400;
  margin: 0px 0 5px;
  /* padding: 25px 35px; */
  /* border: 1px solid #f7fffa; */
  border-left-width: 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  -webkit-box-shadow: 0px 1px 55px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 55px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s linear 0s;
  -moz-transition: all 0.3s linear 0s;
  -ms-transition: all 0.3s linear 0s;
  -o-transition: all 0.3s linear 0s;
  transition: all 0.3s linear 0s;
  &:hover {
    /* border: 1px solid #f7fffa; */
    -webkit-box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
  }
}
</style>
