import createProject from "./create-project";
import generateUI from "./DOM-logic/generate-ui";
import renderProject from "./DOM-logic/render-Project";
import './style.css';
import todoForm from "./DOM-logic/todo-form";
import { projectList } from "./project-list";
import projectForm from "./DOM-logic/project-form";
import renderProjectTodos from "./DOM-logic/render-project-todos";

const body = document.querySelector('body');
generateUI();
let formTodo = todoForm();
body.appendChild(formTodo);
let formProject = projectForm();
body.appendChild(formProject);

let defaultTodos = createProject('Default Todos');

if (projectList.list.hasOwnProperty('Default Todos') === false) {
    projectList.add(defaultTodos);
}
let defaultProject = renderProject(defaultTodos, document.querySelector('#content'));


function updateUI() {
    
    projectList.update();
    
    for (let project in projectList.list) {
        let currentProjIDNum = projectList.list[project].idNum;
        let projectDOM = document.querySelector(`div [data-index="${currentProjIDNum}"]`);
        
            if (project !== 'Default Todos') {
                renderProject(projectList.list[project]);
                let projectDOM = document.querySelector(`div[data-index="${currentProjIDNum}"] > div.todo-container`);
                
                if (projectList.list[project].projectTodos.length != 0) {
                    let todoDOM = renderProjectTodos(projectList.list[project]);
                    projectDOM.replaceChildren(todoDOM);     
                }
            } else if (project == 'Default Todos') {
                if(projectList.list['Default Todos'].projectTodos.length !== 0) {
                    let defaultContainer = document.querySelector(`div[data-index="${currentProjIDNum}"] > div.todo-container`);
                    let defaultTodosDOM = renderProjectTodos(projectList.list['Default Todos']);
                    defaultContainer.replaceChildren(defaultTodosDOM);
                }
            }
};
}

window.addEventListener('load', () => {
    projectList.update();
    
    if (document.contains(document.querySelector(`[data-index='${0}']`)) == false) {
        document.querySelector('#content').appendChild(defaultProject);
    }
    updateUI();
});

window.addEventListener('change', () => {
    projectList.update();
})


