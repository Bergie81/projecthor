<template>
    <section id="user-list-item">
        <el-row type="flex" justify="start" align="middle" class="app-card-slim">
            <span class="mr-5">
                <el-checkbox v-if="type === 'checkbox'" v-model="checked" @change="getSelection"></el-checkbox>
                <el-radio v-if="type === 'radio'" v-model="checked" @change="getSelection"></el-radio>
            </span>
            <avatars :avatars="[user]" :tooltip="false"></avatars>
            <span class="ml-4 mr-2">
                {{ user.name }} {{ user.surname }} ({{ user.initials }})
            </span>
        </el-row>
    </section>
</template>

<script>
import Avatars from "@/components/Widgets/Avatars.vue";
export default {
  name: "userListItem",
  components: { Avatars },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      checked: this.isChecked || this.allIsChecked
    };
  },
  props: {
    type: {
      type: String,
      default: "checkbox"
    },
    user: {
      type: Object,
      required: true
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    allIsChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSelection() {
      this.$emit("selection", { id: this.user._id, checked: this.checked });
    }
  }
};
</script>

<style>
</style>
