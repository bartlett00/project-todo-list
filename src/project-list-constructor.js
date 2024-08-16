import createTodo from "./create-todo";
import createProject from "./create-project";
import saveToStorage from "./save-to-storage";

export default function createProjectList(projListData = {}) {
    function restoreTodos(todos) {
        let restoredTodoArr = [];
        for (const todo in todos) {
            restoredTodoArr.push(createTodo(
                todos[todo].todoTitle,
                todos[todo].todoDesc,
                todos[todo].todoDue,
                todos[todo].todoPrio,
                todos[todo].complete
            ))
        }
        return restoredTodoArr;
    }
    function restoreProjects(projects) {
        let restoredProjList = {};
            for (const project in projects) {
                    restoredProjList[projects[project].projectTitle] = 
                    createProject(
                        projects[project].projectTitle,
                        restoreTodos(projects[project].projectList)
                    )
            }
        
        
        
        return restoredProjList;
    }
    
    let list = restoreProjects(projListData);
    const add = (project) => {
        list[project.projectTitle] = project;
        project.idNum = idCount++;
        
        saveToStorage();
    }
    const remove = (project) => {
        idCount = project.idNum - 1;
        delete list[project.projectTitle];
        saveToStorage();
    }
    const getProjectList = () => {
        return list;
    }
    let idCount = JSON.parse(localStorage.getItem('idCount'));
    const clear = () => {
        list = {};
    }
    const updateList = (newData) => {
        
        list = newData;
        
    }

    return {list, add, remove, idCount, getProjectList, clear, updateList};
}