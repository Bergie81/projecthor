<template>
    <div class="container">
      <Calendar
      ref="calendar"
        :start-day="currMonth"
        :dateData="dateData"
        :on-month-change="onMonthChange"
        :mode="mode"

        class="ui-calendar"
      >
        <div slot="header-left" class="ui-calendar-header__left">
          <button
            :class="['ui-calendar-modeBtn' ,{ active: mode === 'month' }]"
            @click="mode = 'month'"
          >
            Month
          </button>
          <button
            :class="['ui-calendar-modeBtn', { active: mode === 'week' }]"
            @click="mode = 'week'"
          >
            Week
          </button>
        </div>

        <div
          slot-scope="item"
          :class="[
            'ui-calendar-item',
            {
              'is-otherMonth': item.isPrevMonth || item.isNextMonth,
              'is-today': item.isToday
            },
          ]"
          @click="clickMonth($event)"
        >
          <div
            :class="['ui-calendar-item-date']">
            {{item.date.date}}
          </div>
          <div
            v-for="(task, index) in item.data"
            :key="index"
            :style="colorTask(item.isNextMonth, task.color)"
            class="ui-calendar-item-name"
          >
            <span>{{task.title}}</span>
            <!-- <span class="del" @click="deleteItem(item.title)">✖️</span> -->
          </div>
        </div>
      </Calendar>
    </div>
</template>

<script>
import data from "./data";

export default {
  data() {
    return {
      colorbg: "red",
      currMonth: "",
      dateData: data.Array,
      mode: "month"
    };
  },
  methods: {
    colorTask(status, itemColor) {
      let color;
      !status
        ? (color = { backgroundColor: itemColor })
        : { backgroundColor: "white" };
      return color;
    },
    clickMonth(event) {
      // console.log("Month Clicked");
      console.log(event.target.parentElement);
    },
    onMonthChange(val) {
      // console.log(val);
    },
    changeDate() {
      this.$refs.calendar.changeDate("2017-12-12");
    },
    deleteItem(title) {
      this.dateData = this.dateData.filter(item => item.title !== title);
    },
    renderHeader({ prev, next, selectedDate }) {
      // console.log(selectedDate)
      const h = this.$createElement;

      const prevButton = h(
        "div",
        {
          class: ["ui-calendar-modeBtn"],
          on: {
            click: prev
          }
        },
        ["prev"]
      );

      const nextButton = h(
        "div",
        {
          class: ["ui-calendar-modeBtn"],
          on: {
            click: next
          }
        },
        ["next"]
      );

      const dateText = h("div", { class: ["ui-calendar-modeBtn"] }, [
        selectedDate
      ]);
      return h("div", [prevButton, dateText, nextButton]);
    }
  }
};
</script>

<style>
.vue-calendar {
  background: #fff;
  display: flex;
  flex-direction: column;
}
.vue-calendar-header {
  position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
}
.vue-calendar-header-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #19a0ff;
}
.vue-calendar-header-left,
.vue-calendar-header-right {
  flex: 1;
}
.vue-calendar-header-date {
  display: inline-block;
  margin: 0 32px;
}
.vue-calendar-control {
  cursor: pointer;
}
.vue-calendar-week-title {
  display: flex;
  border-color: #e8ebee;
  border-style: solid;
  border-width: 1px 0 1px 1px;
}
.vue-calendar-week-title-item {
  flex: 1;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  color: #19a0ff;
}
.vue-calendar-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.vue-calendar-body-row {
  flex: 1;
  display: flex;
  height: 5em;
}
.vue-calendar-day-item {
  flex: 1;
  overflow: hidden;
  border-color: #e8ebee;
  border-style: solid;
  border-width: 0 0 1px 1px;
}
.vue-calendar {
  background: #fff;
  display: flex;
  flex-direction: column;
}
.vue-calendar-header {
  position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
}
.vue-calendar-header-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #19a0ff;
}
.vue-calendar-header-left,
.vue-calendar-header-right {
  flex: 1;
}
.vue-calendar-header-date {
  display: inline-block;
  margin: 0 32px;
}
.vue-calendar-control {
  cursor: pointer;
}
.vue-calendar-week-title {
  display: flex;
  border-color: #e8ebee;
  border-style: solid;
  border-width: 1px 0 1px 1px;
}
.vue-calendar-week-title-item {
  flex: 1;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  color: #19a0ff;
}
.vue-calendar-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.vue-calendar-body-row {
  flex: 1;
  display: flex;
  height: 5em;
}
.vue-calendar-day-item {
  flex: 1;
  overflow: hidden;
  border-color: #e8ebee;
  border-style: solid;
  border-width: 0 0 1px 1px;
}
.vue-calendar {
  background: #fff;
  display: flex;
  flex-direction: column;
}
.vue-calendar-header {
  position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
}
.vue-calendar-header-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #19a0ff;
}
.vue-calendar-header-left,
.vue-calendar-header-right {
  flex: 1;
}
.vue-calendar-header-date {
  display: inline-block;
  margin: 0 32px;
}
.vue-calendar-control {
  cursor: pointer;
}
.vue-calendar-week-title {
  display: flex;
  border-color: #e8ebee;
  border-style: solid;
  border-width: 1px 0 1px 1px;
}
.vue-calendar-week-title-item {
  flex: 1;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  color: #19a0ff;
}
.vue-calendar-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.vue-calendar-body-row {
  flex: 1;
  display: flex;
  height: 5em;
}
.vue-calendar-day-item {
  flex: 1;
  overflow: hidden;
  border-color: #e8ebee;
  border-style: solid;
  border-width: 0 0 1px 1px;
}

/* My EDITS */
.ui-calendar {
  height: auto;
}
.ui-calendar-header__left > button {
  font-size: 12px;
}
.ui-calendar-header__left > button:nth-child(2) {
  margin-left: -4px;
}
.ui-calendar-modeBtn {
  position: relative;
  display: inline-block;
  background: #fff;
  border: 1px solid #ff7dc5;
  color: #ff7dc5;
  padding: 5px 1em;
  font-size: 13px;
  line-height: 1;
  box-shadow: 0 1px 3px #ffcae7;
  min-width: 5em;
  margin-right: -1px;
  text-align: center;
  cursor: pointer;
}
.ui-calendar-modeBtn:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.ui-calendar-modeBtn:last-child {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.ui-calendar-modeBtn:active,
.ui-calendar-modeBtn:focus {
  outline: none;
}
.ui-calendar-modeBtn.active,
.ui-calendar-modeBtn:active {
  background: #ff7dc5;
  color: #fff;
  z-index: 2;
}
.ui-calendar .k-calendar-header-center {
  color: #ff7dc5;
}
.ui-calendar .k-calendar-week-title-item {
  color: #ff7dc5;
}
.ui-calendar-item {
  padding: 5px 10px;
  color: #666;
}
.ui-calendar-item.is-otherMonth {
  color: #bbb;
}
.ui-calendar-item.is-today .ui-calendar-item-date {
  position: relative;
  display: inline-block;
  background: #ff7dc5;
  color: #fff;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  top: -1px;
}
.ui-calendar-item-name {
  font-size: 12px;
}
.ui-calendar-item-name > * {
  vertical-align: middle;
}
.ui-calendar-item-name .del {
  display: inline-block;
  cursor: pointer;
  color: inherit;
  margin-bottom: -2px;
}
.vue-calendar-body-row {
  height: auto;
  min-height: 100px;
}
</style>
