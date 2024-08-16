import createTodo from "../create-todo";
import { projectList } from "../project-list";
import renderProjectTodos from "./render-project-todos";

export default function todoForm() {
    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('todo-input-container');
    const form = document.createElement('form');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'todo-name';
    nameInput.id = 'todo-name';
    nameInput.placeholder = 'Todo Name';
    const nameInputLabel = document.createElement('label')
    nameInputLabel.setAttribute('for', 'todo-name');

    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.name = 'todo-desc';
    descInput.id = 'todo-desc';
    descInput.placeholder = 'Details';
    const descInputLabel = document.createElement('label');
    descInputLabel.setAttribute('for', 'todo-desc');

    const dueInput = document.createElement('input');
    dueInput.type = 'text';
    dueInput.name = 'todo-due';
    dueInput.id = 'todo-due';
    dueInput.placeholder = 'Time/Date Due';
    const dueInputLabel = document.createElement('label');
    dueInputLabel.setAttribute('for', 'todo-due');

    const projectSelect = document.createElement('select');
    projectSelect.id = 'todo-form-project-list';
    projectSelect.name = 'todo-form-project-list';
    const defaultProjectOption = document.createElement('option');
    defaultProjectOption.value = 'Default Todos';
    defaultProjectOption.textContent = 'Default Todos';
    defaultProjectOption.setAttribute('data-index', 0);
    projectSelect.appendChild(defaultProjectOption);
    
    const submitButton = document.createElement('button');
    submitButton.classList.add('todo-form-submit');
    submitButton.textContent = 'Create To-do';
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('action', '#');

    form.appendChild(nameInputLabel);
    form.appendChild(nameInput);
    form.appendChild(descInputLabel);
    form.appendChild(descInput);
    form.appendChild(dueInputLabel);
    form.appendChild(dueInput);
    form.appendChild(projectSelect);
    form.appendChild(submitButton);

    todoFormContainer.appendChild(form);
   
    function todoListener(title, desc, due, project, projectIndex) {
        if (title == '') {
            alert('Please enter a name for this todo.');
        } else {
        let newTodo = createTodo(title, desc, due);
        projectList.list[project].add(newTodo);
        
        
        let currentProjectTodos = renderProjectTodos(projectList.list[project]);
        
        let projectTodoDOMContainer = document.querySelector(`div[data-index='${projectIndex}'] div.todo-container`);
        projectTodoDOMContainer.replaceChildren(renderProjectTodos(projectList.list[project]));
        
        }
    }

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const name = nameInput.value;
        const desc = descInput.value;
        const due = dueInput.value;
        const project = projectSelect.value;
        const projectIndex = 
        document.querySelector(`option[value='${project}']`)
        .dataset.index;
    
        
        todoListener(name, desc, due, project, projectIndex);
        nameInput.value = ''; 
        dueInput.value = ''; 
        descInput.value = '';
        projectSelect.value = 'Default Todos';
    });

    return form;
}