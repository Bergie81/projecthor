import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout/Layout.vue";

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  // { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  // { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: "",
    component: Layout,
    children: [{
      path: "",
      component: () =>
        import("@/views/Dashboard.vue"),
      name: "Dashboard",
      meta: {
        title: "Dashboard",
        icon: "chalkboard-user",
        // noCache: true
      }
    }]
  },
  {
    path: "/projects",
    component: Layout,
    //redirect: "/projects/show-projects", redirects to path when clicked on breadcrumb
    //alwaysShow: true, // will always show the root menu
    meta: {
      title: "Projects",
      icon: "project"
    },
    children: [{
        path: "all",
        name: "Projects",
        component: () =>
          import("@/views/Projects/ShowProjects.vue"),
        meta: {
          title: "Show Projects",
          layer: 0
        }
      },
      {
        path: "new-project",
        component: () =>
          import("@/views/Projects/NewProject.vue"),
        name: "newProject",
        meta: {
          title: "New Project",
          layer: 1
        }
      },
      {
        path: ":projectid",
        component: () =>
          import("@/views/Projects/ProjectDetails.vue"),
        name: "projectDetails",
        meta: {
          title: "Project Details",
          layer: 1
        },
        hidden: true
      },
      {
        path: ":projectid/edit-project",
        component: () =>
          import("@/views/Projects/EditProject.vue"),
        name: "editProject",
        meta: {
          title: "Edit",
          layer: 2
        },
        hidden: true
      },
      /* {
        path: ":projectid/add-task",
        component: () => import("@/views/Tasks/AddTask.vue"),
        name: "addTask",
        meta: {
          title: "Add Task"
        },
        hidden: true
      }, */
      {
        path: ":projectid/:taskid",
        component: () =>
          import("@/views/Tasks/TaskDetails.vue"),
        name: "taskDetails",
        meta: {
          title: "Task Details",
          layer: 2
        },
        hidden: true
      },
      {
        path: ":projectid/:taskid/edit",
        component: () =>
          import("@/views/Tasks/EditTask.vue"),
        name: "editTask",
        meta: {
          title: "Edit",
          layer: 3
        },
        hidden: true
      },
      {
        path: "add-user",
        component: () =>
          import("@/views/Users/NewUser.vue"),
        name: "addUser",
        meta: {
          title: "Add User"
        },
        hidden: true
      }
    ]
  },
  {
    path: "/boards",
    component: Layout,
    children: [{
      path: "/boards",
      component: () =>
        import("@/views/Boards/ShowBoards.vue"),
      name: "boards",
      meta: {
        title: "Boards",
        icon: "table",
        noCache: true
      }
    }]
  },
  {
    path: "/calendar",
    component: Layout,
    children: [{
      path: "/calendar",
      component: () =>
        import("@/views/Calendar.vue"),
      name: "calendar",
      meta: {
        title: "Calendar",
        icon: "calendar",
        noCache: true
      }
    }]
  },
  {
    path: "/user",
    component: Layout,
    name: "User",
    redirect: "/user/show-user", //redirects to path when clicked on breadcrumb
    meta: {
      title: "User",
      icon: "users"
    },
    children: [{
        path: "show-user",
        component: () =>
          import("@/views/Users/AllUser.vue"),
        name: "showUser",
        meta: {
          title: "Users",
          icon: "users2"
        }
      },
      {
        path: ":userid",
        component: () =>
          import("@/views/Users/UserDetails.vue"),
        name: "userBoard",
        meta: {
          title: "Me"
        },
        hidden: true
      }
    ]
  },
  {
    path: "/admin",
    component: Layout,
    name: "Admin",
    redirect: "/admin/admin-dashboard", //redirects to path when clicked on breadcrumb
    meta: {
      title: "Admin",
      icon: "user-gear"
    },
    children: [{
        path: "admin-dashboard",
        component: () =>
          import("@/views/Admin.vue"),
        name: "admin",
        meta: {
          title: "Dashboard"
        },
        hidden: false
      },
      {
        path: "/new-user",
        component: () =>
          import("@/views/Users/NewUser.vue"),
        name: "newUser",
        meta: {
          title: "New User"
        }
      }
    ]
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
  // [
  //   {
  //     path: "/",
  //     name: "home",
  //     component: Home
  //   },
  //   {
  //     path: "/about",
  //     name: "about",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () =>
  //       import(/* webpackChunkName: "about" */ "./views/About.vue")
  //   }
  // ]
});

/* router.beforeEach((to, from, next) => {
  console.log("ROUTER");
}) */

export const asyncRouterMap = [];

// export const asyncRouterMap = [
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/index',
//     alwaysShow: true, // will always show the root menu
//     meta: {
//       title: 'permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'page',
//       component: () => import('@/views/permission/page'),
//       name: 'pagePermission',
//       meta: {
//         title: 'pagePermission',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'directive',
//       component: () => import('@/views/permission/directive'),
//       name: 'directivePermission',
//       meta: {
//         title: 'directivePermission'
//         // if do not set roles, means: this page does not require permission
//       }
//     }]
//   },

//   {
//     path: '/icon',
//     component: Layout,
//     children: [{
//       path: 'index',
//       component: () => import('@/views/svg-icons/index'),
//       name: 'icons',
//       meta: { title: 'icons', icon: 'icon', noCache: true }
//     }]
//   },

//   {
//     path: '/components',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'component-demo',
//     meta: {
//       title: 'components',
//       icon: 'component'
//     },
//     children: [
//       { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' } },
//       { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' } },
//       { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' } },
//       { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' } },
//       { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' } },
//       { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' } },
//       { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' } },
//       { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' } },
//       { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' } },
//       { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' } },
//       { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' } },
//       { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' } },
//       { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' } }
//     ]
//   }
// ]