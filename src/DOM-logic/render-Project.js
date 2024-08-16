import { projectList } from "../project-list";

export default function renderProject(project, container = document.querySelector('#project')) {
    const projectElement = document.createElement('div');
    projectElement.setAttribute('data-index', project.idNum);
    projectElement.classList.add('project-item');

    const titleDiv = document.createElement('div');
    titleDiv.textContent = project.projectTitle;
    titleDiv.classList.add('project-title');
    projectElement.appendChild(titleDiv);
    
    if (!(project.projectTitle == 'Default Todos')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('project-delete-btn');
        projectElement.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${project.projectTitle}"?`)) {
                projectElement.parentElement.removeChild(projectElement);
                projectList.remove(project);
                
            }
        });
    }

    const todoContainer = document.createElement('div');
    todoContainer.classList.toggle('todo-container');
    projectElement.appendChild(todoContainer);

    container.appendChild(projectElement);
    return projectElement;  
}
