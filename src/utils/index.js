import nodeCrypto from "crypto";


// often used Functions
export const createRandomId = num => {
  return nodeCrypto.randomBytes(num).toString("hex");
};

export const getDate = timestamp => {
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}.${month}.${year}`;
};

export const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const findProject = (projects, id) => {
  const foundProject = projects.filter(project => project._id === id);
  return foundProject[0];
};

// Sort Array of Objects by a property
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
export const dynamicSort = property => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

// Sort Object of Objects by a attribute
// https://stackoverflow.com/questions/14286654/how-to-sort-a-js-object-of-objects
// dynamicSortObj(your_object,'attribute_to_sort')
export const dynamicSortObj = (data, attr) => {
  var arr = [];
  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      var obj = {};
      obj[prop] = data[prop];
      obj.tempSortName = data[prop][attr];
      arr.push(obj);
    }
  }
  arr.sort(function (a, b) {
    var at = a.tempSortName,
      bt = b.tempSortName;
    return at > bt ? 1 : at < bt ? -1 : 0;
  });
  var result = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    var obj = arr[i];
    delete obj.tempSortName;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var id = prop;
      }
    }
    var item = obj[id];
    result.push(item);
  }
  return result;
};

/* import decryptedProjects
  currentProjectFromLocalStorage() {
      let storeProjectId = localStorage.getItem("currentProjectId");
      if (storeProjectId !== "") {
        this.projectMemberList = this.findProject(this.decryptedProjects, storeProjectId)
        return this.findProject(this.decryptedProjects, storeProjectId);
      }
    },
 */

export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles;
    const permissionRoles = value;
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role);
    });
    if (!hasPermission) {
      return false;
    }
    return true;
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`);
    return false;
  }
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;
  setTimeout(() => {
    console.log(new Date());
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}


/**
 * KANN MAN EVENTUELL GEBRAUCHEN
 */



export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}