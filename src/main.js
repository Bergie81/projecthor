import Vue from "vue";

import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import VueSVGIcon from "vue-svgicon";
import "./svg-icons/";

//Styles
import "@/styles/tailwind.css";
import "@/styles/index.scss";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";

// global import for custom components
import Card from "./components/UI/Card.vue";

Vue.use(Element, {
  locale
});
Vue.use(VueSVGIcon);

Vue.component("uiCard", Card);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");