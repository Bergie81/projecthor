// "projects" must be Array
export const getProjectFromID = (projects, projectID) => {
    return projects.filter(project => {
        return project._id === projectID;
    })[0];
};

// "tasks" must be Object; including Key of Task (.ref)
export const getTaskFromID = (project, taskID) => {
    let task = {};
    let tasks = project._tasks;
    if (tasks) {
        for (var key in tasks) {
            if (tasks[key]._id === taskID) {
                tasks[key].ref = key;
                tasks[key].projectRef = project['.key'];
                task = tasks[key];
            }
        }
    }
    return task;
};

// "object" is project, task, ...
export const setDbPath = (object) => {
    let pathObj = {};
    const id = object._id.substring(0, 4);
    if (id === "proj") {
        pathObj.back = "Projects"; //route name
        pathObj.edit = "editProject"; //route name
        pathObj.currentJob = `${object['.key']}`;
        pathObj.jobs = `${object['.key']}/_tasks`;
        pathObj.members = `${object['.key']}/_member`;
        pathObj.type = "project";
    } else if (id === "task") {
        pathObj.back = "projectDetails"; //route name
        pathObj.edit = "editTask"; //route name
        pathObj.currentJob = `${object.projectRef}/_tasks/${object.ref}`;
        pathObj.jobs = `${object.projectRef}/_tasks/${object.ref}/_steps`;
        pathObj.members = `${object.projectRef}/_tasks/${object.ref}/_member`;
        pathObj.type = "task";
    }
    return pathObj;
};