import createProject from "../create-project";
import { projectList } from "../project-list";
import renderProject from "./render-Project";

export default function projectForm() {
    const projectFormContainer = document.createElement('div');
    projectFormContainer.classList.toggle('proj-form-container');
    const projectForm = document.createElement('form');
    
    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.name = 'project-name-input';
    projectNameInput.id = 'project-name-input';
    projectNameInput.placeholder = 'Project Name';

    const projectNameInputLabel = document.createElement('label');
    projectNameInputLabel.setAttribute('for', 'project-name-input');

    const submitButton = document.createElement('button');
    submitButton.classList.add('project-form-submit');
    submitButton.textContent = 'Create Project';
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('action', '#');

    projectForm.appendChild(projectNameInputLabel);
    projectForm.appendChild(projectNameInput);
    projectForm.appendChild(submitButton);
    projectFormContainer.appendChild(projectForm);

    let projectSelect = document.querySelector('#todo-form-project-list');
    
    function projectFormEventListener(projectName) {
        if (projectList.list.hasOwnProperty(projectName)) {
            alert ('A project with this name already exists.');
        } else {
            if (projectList.list[projectName] == projectName) {
                alert(`Project with name ${projectName} already exists.`);
            } else {
                let newProject = createProject(projectName);
                projectList.add(newProject);
                return renderProject(newProject);
            }
        }
    }

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let projectName = projectNameInput.value;
        projectFormEventListener(projectName);
        createProjectDropdown();
        
        if(projectSelect.hasChildNodes) {
            projectSelect.replaceChildren();
            createProjectDropdown();
        }
        projectNameInput.value = '';
    })

    projectSelect.addEventListener('mouseover', () => {
        let projSelectVal = projectSelect.value;
        if(projectSelect.hasChildNodes) {
            projectSelect.replaceChildren();
            createProjectDropdown();
            projectSelect.value = projSelectVal;
        }
    })

    function createProjectDropdown() {
        for (const project in projectList.list) {
            let projectOption = document.createElement('option');
            projectOption.value = project;
            projectOption.textContent = project;
            projectOption.dataset.index = projectList.list[project].idNum;
            projectSelect.appendChild(projectOption);
        }
    }

    return projectFormContainer;
}