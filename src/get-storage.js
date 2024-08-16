import createProject from "./create-project";
import createTodo from "./create-todo";

export default function getStorage() {
    if (localStorage.getItem('projectList') === null) {
        localStorage.setItem('projectList', '{}'); 
     }
    
    let projListJSON = localStorage.getItem('projectList');
    
    let projListRestored = JSON.parse(projListJSON);
    

    function restoreTodos(todos) {
        let restoredTodoArr = [];
        for (const todo in todos) {
            let restoredTodo = createTodo(
                todos[todo].todoTitle,
                todos[todo].todoDesc,
                todos[todo].todoDue,
                todos[todo].todoPrio,
                todos[todo].complete);
                
            restoredTodoArr.push(restoredTodo);
        }
        
        return restoredTodoArr;
    }
    function restoreProjects(projects) {
        let restoredProjList = {};
            for (let project in projects) {
                    let todos = restoreTodos(projects[project].projectTodos);
                    
                    let restoredProject =
                            createProject(
                                projects[project].projectTitle,
                                todos,
                                projects[project].idNum
                            );
                    
                    
                    
                    let projTitle = restoredProject.projectTitle;
                    
                    let clonedArray = [...restoredProject.projectTodos];
                    

                    restoredProjList[projTitle] = {...restoredProject};
                    
                    
                    
                }
        
        return restoredProjList;
    }

    let projectListNew = restoreProjects(projListRestored);
    
    return projectListNew;
}

