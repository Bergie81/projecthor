<template>
  <div id="step-item">
    <el-row
      type="flex" 
          justify="left"
          align="middle">
      <el-col :xs="1" :sm="2" >
        <!-- <el-row :style="styleObject(element).color" class="number" type="flex" justify="end" align="middle"> -->
        <el-row class="number" type="flex" justify="end" align="middle">
          {{ index+1 }}.
        </el-row>
      </el-col>
      <!-- <el-col :xs="15" :sm="18" :style="styleObject(element).borderColor" class="pointer card" @click.native="goToTask(element)"> -->
      <el-col :xs="15" :sm="18" class="pointer card" @click.native="goToTask(element)">
        <el-row type="flex" justify="space-between" align="middle" class="content">
          <el-col class="hidden-xs-only mr-2" :sm="6" :lg="3" :xl="2">
            <span v-for="avatar in getUser(element._inCharge)" :key="avatar._id">
              <img class="card-avatar" :src="`${baseUrl}avatars/avatar-${avatar.image}.jpg`">
            </span>
          </el-col>
          <el-col :xs="24" :sm="18" :lg="21"  :xl="22">
            <p class="text-xs mb-1">{{ getDate(element.dateStart) }} - {{ getDate(element.dateEnd) }}</p>
            <p class="font-semibold text-lg">{{ element.title }}</p>
          </el-col>
        </el-row>
        <el-row>
          <p class="description">{{ element.description }}</p>
          </el-row>
      </el-col>
      <el-col :xs="8" :sm="4">
        <!-- <el-row :style="styleObject(element).color" class="status" type="flex" justify="end"> -->
        <el-row class="status" type="flex" justify="end">
            99%
        </el-row>
      </el-col>
    </el-row>
  </div>
    
</template>

<script>
import Avatars from "@/components/Widgets/Avatars.vue";
import { getDate } from "@/utils/index";
export default {
  name: "tasksList",
  components: {
    Avatars
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
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
  computed: {},
  methods: {
    getDate,
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
    },
    isTaskPartner(task) {
      let isPartner = false;
      const currentUser = this.$store.getters.currentUser;
      if (currentUser === task._inCharge) {
        isPartner = true;
      } else {
        if (task._member) {
          const inMember = task._member.filter(
            member => member === currentUser
          );
          if (currentUser === inMember[0]) {
            isPartner = true;
          }
        }
      }
      return isPartner;
    },
    goToTask(task) {
      if (this.isTaskPartner(task)) {
        this.$router.push({
          name: "taskDetails",
          params: {
            taskid: task._id
          }
        });
      }
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
