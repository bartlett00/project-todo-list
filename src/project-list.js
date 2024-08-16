import getStorage from "./get-storage";
import saveToStorage from "./save-to-storage";

export let projectList = {
    list: getStorage(),
    add: (project) => {
        projectList.list[project.projectTitle] = project;
        if (projectList.tempID != 0) {
            project.idNum = projectList.tempID;
            projectList.tempID = 0;
        } else {
          project.idNum = projectList.idCount++;  
        }
        saveToStorage();
        
    },
    remove: (project) => {
        projectList.tempID = project.idNum;
        delete projectList.list[project.projectTitle];
        saveToStorage();
        
    },
    idCount: Number(JSON.parse(localStorage.getItem('idCount'))),
    tempID: 0,
    getProjectList: () => {
        return projectList.list;
    },
    update: () => {
        
        delete projectList.list;
        projectList.list = getStorage();
        
    },
    removeTodo: (project, todo) => {
        let newTodoList = projectList.list[project].projectTodos.filter((todoInList) => {
            return todoInList !== todo;
        })
        projectList.list[project].projectTodos = [...newTodoList];
        saveToStorage();
    }
}