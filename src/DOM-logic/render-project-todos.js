import renderTodo from "./render-Todo";

export default function renderProjectTodos(project) {
    const todoList = document.createElement('div');
    todoList.id = `${project.projectTitle}-todos`;
    const todoListContainer = document.createElement('div');
    todoListContainer.classList.add('todo-list-container');
    todoList.appendChild(todoListContainer);
    
    let projectTodoList = project.getProjectTodos();
    function updateList() {
        projectTodoList = project.getProjectTodos();
        projectTodoList.forEach(element => {
            let todo = renderTodo(element);
            todoListContainer.appendChild(todo);
            }
        ); 
    }
    updateList();
  
    const dropdownBtn = document.createElement('button');

    dropdownBtn.classList.add('fa-solid', 'fa-angle-up');
    dropdownBtn.addEventListener('click', () => {
        if (!(todoListContainer.classList.contains('hidden'))) {
            todoListContainer.classList.toggle('hidden');
            dropdownBtn.classList.replace('fa-angle-up', 'fa-angle-down');

        } else {
            todoListContainer.classList.toggle('hidden');
            dropdownBtn.classList.replace('fa-angle-down', 'fa-angle-up');
        }
    });
    todoList.appendChild(dropdownBtn);
    
    return todoList;
}