import { projectList } from "../project-list";

export default function renderTodo(todo) {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo-item');

    const title = document.createElement('div');
    title.classList.add('todo-title')
    const description = document.createElement('div');
    description.classList.add('todo-desc');
    const dueDate = document.createElement('div');
    dueDate.classList.add('todo-date');

    const completeCheckDiv = document.createElement('div');
    completeCheckDiv.classList.add('todo-complete-checkbox');
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.name = 'toggleComplete';
    const completeCheckboxLabel = document.createElement('label');
    completeCheckboxLabel.setAttribute('for', 'toggleComplete');
    completeCheckDiv.appendChild(completeCheckboxLabel);
    completeCheckDiv.appendChild(completeCheckbox);
    todoElement.appendChild(completeCheckDiv);

    function checkTodoComplete() {
        if (todo.checkComplete()) {
            
            todoElement.classList.toggle('todo-complete');
        } else {
            
            todoElement.classList.toggle('todo-complete');
        }
    }

    function checkTodoPrio() {
        if (todo.checkPrio()) {
            
            todoElement.classList.toggle('todo-priority');
        } else {
            
            todoElement.classList.toggle('todo-priority');
        }
    }

    completeCheckbox.addEventListener('click', () => {
        if (completeCheckbox.checked) {
            todo.toggleComplete();
            
        } else {
            todo.toggleComplete();
            
        }
        checkTodoComplete();
    })
    
    const prioCheckDiv = document.createElement('div');
    prioCheckDiv.classList.add('todo-prio-checkbox');
    const prioCheckbox = document.createElement('input');
    prioCheckbox.type = 'checkbox';
    prioCheckbox.name = 'togglePrio';
    const prioCheckboxLabel = document.createElement('label');
    prioCheckboxLabel.setAttribute('for', 'togglePrio');
    prioCheckboxLabel.textContent = 'Priority';
    prioCheckDiv.appendChild(prioCheckboxLabel);
    prioCheckDiv.appendChild(prioCheckbox);
    todoElement.appendChild(prioCheckDiv);

    prioCheckbox.addEventListener('click', () => {
        if (prioCheckbox.checked) {
            todo.togglePrio();
            
        } else {
            todo.togglePrio();
            
        }
        checkTodoPrio();
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');

    function extractID(id) {
        let idArr = id.split('');
        idArr.splice(-6);
        return idArr.join('');
    }

    function deleteEventListener(parentID) {
        projectList.removeTodo(parentID, todo);
        
        
        
        if (todoElement.parentElement.childElementCount == 1) {
            todoElement.parentElement.parentElement.removeChild(
                todoElement.parentElement.parentElement.childNodes[1]
            );
            todoElement.parentElement.replaceChildren();
        } else {
           todoElement.parentElement.removeChild(todoElement); 
        }
    }
    deleteBtn.addEventListener('click', (e) => {
        let parentID = extractID(todoElement.parentElement.parentElement.id);
        let targetedProject = projectList.list[parentID];
        
        
        if(confirm(`Are you sure you want to delete this Todo?`)) {
            deleteEventListener(parentID);
            
            
        }
    })

    title.addEventListener('click', () => {
        description.classList.toggle('hidden');
        dueDate.classList.toggle('hidden');
        deleteBtn.classList.toggle('hidden');
        prioCheckDiv.classList.toggle('hidden');
    });

    title.textContent = todo.todoTitle;
    description.textContent = todo.todoDesc;
    dueDate.textContent = todo.todoDue;

    todoElement.appendChild(title);
    todoElement.appendChild(deleteBtn);
    todoElement.appendChild(description);
    todoElement.appendChild(dueDate);

    return todoElement;
}