<template>
  <div id="stepsList">
    <div v-for="(element, key, index) in list" :key="key">
      <step-item :element="element" :elementKey="key" :index="index"></step-item>
    </div>
  </div>
</template>

<script>
import StepItem from "@/components/Widgets/StepItem.vue";
export default {
  name: "stepsList",
  components: {
    StepItem
  },
  props: {
    list: {
      type: Object
    }
  }
};
</script>
