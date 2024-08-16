import renderProjectTodos from "./DOM-logic/render-project-todos";
import { projectList } from "./project-list";
import saveToStorage from "./save-to-storage";

export default function createProject(title, todos = [], id = 0) {
    let projectTitle = title;
    let projectTodos;
    if (todos.length != 0) {
        projectTodos = [...todos];
    } else {
        projectTodos = [];
    }
    const getProjectTodos = () => {
        return projectTodos;
    }

    const add = (todo) => {
        projectTodos.push(todo);
        saveToStorage();
        projectList.update();
    };

    const renderTodos = () => {
        renderProjectTodos(this);
    }
    
    const remove = (todo) => {
        let newTodoList = projectTodos.filter((todoInList) => {
            return todoInList !== todo;
        })
        projectTodos = [...newTodoList];
        
        saveToStorage();
        projectList.update();
    }

    const idNum = id;

    return {projectTitle, projectTodos, idNum, getProjectTodos, add, renderTodos, remove};
}