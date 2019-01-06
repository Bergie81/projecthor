const state = {
  system: [],
  /*   tasksL: [{
        title: "Element1"
      },
      {
        title: "Element2"
      },
      {
        title: "Element3"
      }
    ], */
  categories: [
    {
      value: "Executive Board",
      label: "Executive Board",
      children: [
        {
          value: "Business Development",
          label: "Business Development",
          children: [
            {
              value: "New Markets",
              label: "New Markets"
            },
            {
              value: "Partnerships",
              label: "Partnerships"
            }
          ]
        }
      ]
    },
    {
      value: "Marketing",
      label: "Marketing",
      children: [
        {
          value: "Marketing Material",
          label: "Marketing Material",
          children: [
            {
              value: "Flyer",
              label: "Flyer"
            },
            {
              value: "Broschures",
              label: "Broschures"
            },
            {
              value: "Other",
              label: "Other"
            }
          ]
        },
        {
          value: "Online Marketing",
          label: "Online Marketing",
          children: [
            {
              value: "Social Media",
              label: "Social Media"
            },
            {
              value: "Webpage",
              label: "Webpage"
            },
            {
              value: "Other",
              label: "Other"
            }
          ]
        }
      ]
    },
    {
      value: "Sales",
      label: "Sales",
      children: [
        {
          value: "Customer Acquisition",
          label: "Customer Acquisition",
          children: [
            {
              value: "New Customer",
              label: "New Customer"
            },
            {
              value: "Other",
              label: "Other"
            }
          ]
        },
        {
          value: "Demo",
          label: "Demo",
          children: [
            {
              value: "In-House",
              label: "In-House"
            },
            {
              value: "On-Site",
              label: "On-Site"
            },
            {
              value: "Other",
              label: "Other"
            }
          ]
        }
      ]
    }
  ],
  priorities: ["Urgent & Important", "Important", "Urgent", "Other"],
  departments: [
    "Administration",
    "Executive Board",
    "Finance",
    "HR",
    "IT",
    "Marketing",
    "Production",
    "R&D",
    "Sales"
  ],
  swatches: [
    "#D32F2F",
    "#C2185B",
    "#7B1FA2",
    "#512DA8",
    "#303F9F",
    "#1976D2",
    "#0288D1",
    "#0097A7",
    "#00796B",
    "#388E3C",
    "#689F38",
    "#AFB42B",
    "#FBC02D",
    "#FFA000",
    "#F57C00",
    "#E64A19",
    "#5D4037",
    "#616161",
    "#455A64",
    "#2D3C43"
  ]
};

const getters = {
  getSystem: state => state.system,
  getCategories: state => state.categories,
  getPriorities: state => state.priorities,
  getDepartments: state => state.departments,
  //getDefault: state => state.defaults,
  getSwatches: state => state.swatches
};

const mutations = {
  //für Draggable
  /* updateList: (state, value) => {
    state.taskL = value;
  } */
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
