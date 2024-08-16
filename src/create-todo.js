export default function createTodo(title, desc, due, prio = false, completed = false) {
    const todoTitle = title;
    const todoDesc = desc;
    const todoDue = due;
    let todoPrio = prio;
    let complete = completed;

    const toggleComplete = () => {
        complete == true ? complete = false : complete = true;
    };

    const checkComplete = () => {
        return complete;
    }

    const togglePrio = () => {
        todoPrio == true ? todoPrio = false : todoPrio = true;
    }

    const checkPrio = () => {
        return todoPrio;
    }
    

    return {todoTitle, todoDesc, todoDue, todoPrio, complete, togglePrio, toggleComplete, checkComplete, checkPrio};
}