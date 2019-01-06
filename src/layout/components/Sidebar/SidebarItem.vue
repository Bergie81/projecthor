<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <!-- EINFACHER MENUEPUNKT -->
    <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
        <svgicon :icon="onlyOneChild.meta.icon" height="12" :color="setIconColor(item.children[0].path)"></svgicon>
        <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </router-link>

    <!-- HEAD UNTERMENUE -->
    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <svgicon v-if="item.meta&&item.meta.icon" :icon="item.meta.icon" height="12" :color="setIconColor(item.children[0].path)"></svgicon>
        <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}} </span>
      </template>
      <!-- UNTERMENUEPUNKTE -->
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item 
          :is-nest="false" 
          class="nest-menu" 
          v-if="child.children&&child.children.length>0" 
          :item="child" 
          :key="child.path" 
          :base-path="resolvePath(child.path)"
          ></sidebar-item>
        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item 
            
            :index="resolvePath(child.path)"
            >
            <svgicon v-if="child.meta&&child.meta.icon" height="12" :color="setIconColor(item.children[0].path)"></svgicon>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";

export default {
  name: "SidebarItem",
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    },
    iconColor: {
      type: String,
      default: "white"
    },
    iconColorActive: {
      type: String,
      default: "white"
    }
  },
  data() {
    return {
      onlyOneChild: null,
      hover: false
    };
  },
  computed: {
    /*   styleObject() {
      let theme = this.$store.getters.getTheme;
      return { backgroundColor: theme.sidebarBg };
    } */
  },
  methods: {
    setIconColor(item) {
      if (this.$route.path === "/" + item) {
        return this.iconColorActive;
      } else {
        return this.iconColor;
      }
    },
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    }
  }
};
</script>
