const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const ArrayData = [
  {
    date: `${year}-${month - 1}-${day}`,
    title: "buy something",
    color: "cyan"
  },
  {
    date: `${year}-${month}-${day}`,
    title: "shopping",
    color: "yellow"
  },
  {
    date: `${year}-${month}-${day}`,
    title: "buy something more and look for a special gift",
    color: "green"
  },
  {
    date: `${year}-${month}-${day}`,
    title: "shopping again",
    color: "orange"
  },
  {
    date: `${year}-${month}-${day}`,
    title: "buy something again",
    color: "blue"
  },
  {
    date: `${year}-${month}-${day}`,
    title: "shopping lets go",
    color: "pink"
  },
  {
    date: `${year}-${month + 1}-2`,
    title: "remember homework",
    color: "cyan"
  },
  {
    date: `${year}-${month + 1}-15`,
    title: "music festival",
    color: "cyan"
  },
  {
    date: `${year}-${month + 2}-6`,
    title: "a course of lectures",
    color: "cyan"
  }
];
const ObjectData = {};

ArrayData.forEach(item => {
  ObjectData[item.date] = { title: item.title };
});

export default {
  Array: ArrayData,
  Object: ObjectData
};
