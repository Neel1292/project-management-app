export function getData() {
    const data = JSON.parse(localStorage.getItem('projectData')) || [];
    return data;
}

export function addData(data) {
    const storeData = {
        projectId: data.projects.projectId,
        projects: data.projects,
        tasks: data.tasks

    }
    localStorage.setItem('projectData', JSON.stringify(storeData));
}

export function removeData(data) {
    localStorage.setItem('projectData', JSON.stringify(data));
}

export function getTask() {
   const data = localStorage.getItem('projectTask') || [];
   return JSON.parse(data);
}

export function removeTask(task) {
    localStorage.setItem('projectTask', JSON.stringify(task));
}