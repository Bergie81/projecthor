<template>
  <div id="stepItem">
      <el-row
        type="flex" 
        justify="left"
        align="middle">
        <el-col :xs="4" :sm="3" >
          <el-row :style="styleObject(element).color" class="number" type="flex" justify="end" align="middle">
           {{ achievedStep }}%
          </el-row>
        </el-col>
        <el-col :xs="20" :sm="21" :style="styleObject(element).borderColor" class="card">
          <el-row type="flex" justify="space-between" align="middle" class="content">
            <el-col class="hidden-xs-only mr-2" :sm="6" :lg="3" :xl="2">
              <span v-for="avatar in getUser(element._inCharge)" :key="avatar._id">
                <img class="card-avatar" :src="`${baseUrl}avatars/avatar-${avatar.image}.jpg`">
              </span>
            </el-col>
            <el-col :xs="24" :sm="18" :lg="21"  :xl="22">
              <p class="title">{{ index+1 }}. {{ element.title }}</p>
            </el-col>
          </el-row>
          <el-row 
            v-if="element._progress" 
            v-for="progress in element._progress" :key="progress['.key']"
            class="pl-4 py-2"
            type="flex" 
            align="middle">
            <el-col :xs="2" :sm="2">
              <span v-for="avatar in getUser(progress._achiever)" :key="avatar._id">
                <img class="card-avatar" :src="`${baseUrl}avatars/avatar-${avatar.image}.jpg`">
              </span>
            </el-col>
            <el-col :xs="18" :sm="18">
              <p class="description"> {{ progress.description }} </p>
            </el-col>
            <el-col :xs="8" :sm="4">
              <p class="app-text-progress"> {{ progress.achieved }}% </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end" align="middle">
            <el-button 
              class="app-control-btn mr-2 mb-6" 
              type="text" 
              @click="goToStepEdit">
              <svgicon class="app-btn-icon" :icon="'edit'"></svgicon>
              <span class="ml-2">Edit</span>
            </el-button>
            <el-button 
              v-if="!showAddProgressStep"
              class="app-control-btn mr-6 mb-6" 
              type="text" 
              @click="showAddProgressStep = !showAddProgressStep">
              <svgicon class="app-btn-icon" :icon="'plus'"></svgicon>
              <span class="ml-2">Add Progress</span>
            </el-button>
            <el-button
              v-if="showAddProgressStep" 
              class="app-control-btn mr-6 mb-6" 
              type="text" 
              @click="showAddProgressStep = !showAddProgressStep">
              <svgicon class="app-btn-icon" :icon="'edit'"></svgicon>
              <span class="ml-2">Cancel</span>
            </el-button>
        </el-row>
      <el-row>
          <add-progress-step 
            class="mb-6"
            v-if="showAddProgressStep" 
            :step="element"
            :stepKey="elementKey"            
            @showWidget="showAddProgressStep = $event">
          </add-progress-step>
        </el-row>
  </div>
    
</template>

<script>
import AddProgressStep from "@/components/Widgets/AddProgressStep.vue";
import Avatars from "@/components/Widgets/Avatars.vue";
import { dynamicSortObj } from "@/utils/index.js";
export default {
  name: "stepItem",
  components: {
    AddProgressStep,
    Avatars
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      showAddProgressStep: false
    };
  },
  props: {
    element: {
      type: Object
    },
    elementKey: {
      type: String
    },
    index: {
      type: Number
    }
  },
  computed: {
    achievedStep() {
      if (this.element._progress) {
        // sortiert Objekte nach steigender Größe von "achieved",
        // nimmt den letzten (und somit max.) Wert von "achieved"
        return dynamicSortObj(this.element._progress, "achieved").pop()
          .achieved;
      } else {
        return 0;
      }
    }
  },
  methods: {
    dynamicSortObj,
    goToStepEdit() {},
    getUser(member) {
      return this.$store.getters.getUsers.filter(user => {
        return user._id === member;
      });
    },
    styleObject(member) {
      const color = this.$store.getters.getUsers.filter(user => {
        return user._id === member._inCharge;
      })[0].color;
      return {
        borderColor: {
          borderLeftColor: color
        },
        color: {
          color
        }
      };
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
.title {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0px 15px 0 0px;
}
.description {
  font-size: 1rem;
  padding: 0px 15px 0 15px;
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
