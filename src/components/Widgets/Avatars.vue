<template>
  <div>
    <div v-if="typeof avatars[0] === 'object'">
        <span v-for="avatar in avatars" :key="avatar._id">
            <el-tooltip :disabled="!tooltipOn" class="item" effect="light" :content="avatar.name + ' (' + avatar.initials + ')'" placement="left-start">
                <img class="app-avatar" :src="`${baseUrl}avatars/avatar-${avatar.image}.jpg`">
            </el-tooltip>
        </span>
    </div>
    <div v-if="typeof avatars[0] === 'string'">
        <span v-for="avatar in avatars" :key="avatar._id">
            <el-tooltip :disabled="!tooltipOn" class="item" effect="light" :content="findUserData(avatar).name + ' (' + findUserData(avatar).initials + ')'" placement="left-start">
                <img class="app-avatar" :src="`${baseUrl}avatars/avatar-${findUserData(avatar).image}.jpg`">
            </el-tooltip>
        </span>
    </div>
    <div v-if="typeof avatars === 'string' && avatars !== ''">
            <el-tooltip :disabled="!tooltipOn" class="item" effect="light" :content="findUserData(avatars).name + ' (' + findUserData(avatars).initials + ')'" placement="left-start">
                <img class="app-avatar" :src="`${baseUrl}avatars/avatar-${findUserData(avatars).image}.jpg`">
            </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "widgetAvatar",
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      tooltipOn: this.tooltip
    };
  },
  props: {
    avatars: {
      default() {
        return [];
      }
    },
    tooltip: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["getUsers"])
  },
  methods: {
    findUserData(avatar) {
      return this.getUsers.filter(user => user._id === avatar)[0];
    }
  }
};
</script>

<style lang="scss">
.app-avatar {
  margin-right: 3px;
  height: 50px;
  max-width: 50px;
  border-radius: 8px;
}
</style>
