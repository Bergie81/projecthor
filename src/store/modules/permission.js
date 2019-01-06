import {
  asyncRouterMap,
  constantRouterMap
} from "@/router";

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}

function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}


const state = {
  routers: constantRouterMap,
  addRouters: []
}
const getters = {
  permission_routers: state => state.routers,
  addRouters: state => state.addRouters
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers;
    state.routers = constantRouterMap.concat(routers);
  }
}
const actions = {
  GenerateRoutes({
    commit
  }, data) {
    return new Promise(resolve => {
      const {
        roles
      } = data;
      let accessedRouters;
      if (roles.indexOf("admin") >= 0) {
        accessedRouters = asyncRouterMap;
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
      }
      commit("SET_ROUTERS", accessedRouters);
      resolve();
    });
  }
}


export default {
  state,
  getters,
  mutations,
  actions
};