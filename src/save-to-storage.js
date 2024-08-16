import { projectList } from "./project-list";

export default function saveToStorage() {
    let projectListCleaned = {};

    function extractTodoInfo(todos) {
        
        let extractedTodos = [];
        if(todos == []) {
            return extractedTodos;
        } else {
            todos.forEach(element => {
                
                    let extractedObj = {
                        todoTitle: element.todoTitle,
                        todoDesc: element.todoDesc,
                        todoDue: element.todoDue,
                        todoPrio: element.todoPrio,
                        complete: element.complete
                    }
                    
                    extractedTodos.push(extractedObj);
                });
            
            
            return extractedTodos;
        }
    }
    
    function extractProjectInfo(p) {
        
        
        
        let extractedProject = {
            projectTitle: p.projectTitle,
            projectTodos: extractTodoInfo(p.projectTodos),
            idNum: p.idNum
        };
        
        
        return extractedProject;
    }

    
    for (const project in projectList.list) {
        
            projectListCleaned[projectList.list[project].projectTitle] = extractProjectInfo(projectList.list[project]);
    }
    
    
    let projectListJSON = JSON.stringify(projectListCleaned);
    
    localStorage.setItem('projectList', projectListJSON);
    
    if (Object.keys(projectList.list).length === 1) {
        localStorage.setItem('idCount', '1');
    } else {
        localStorage.setItem('idCount', JSON.stringify(projectList.idCount));
    }
    
}