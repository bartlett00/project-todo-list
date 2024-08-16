export default function generateUI() {
    const body = document.querySelector('body');

    const uiContainer = document.createElement('div');
    uiContainer.id = 'ui-container';

    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';

    const content = document.createElement('div');
    content.id = 'content';

    const project = document.createElement('div');
    project.id = 'project';

    const title = document.createElement('div');
    title.id = 'UI-title';
    title.textContent = 'To-do List';
    
    content.appendChild(project);

    contentContainer.appendChild(title);
    contentContainer.appendChild(content);

    uiContainer.appendChild(contentContainer);
    body.appendChild(uiContainer);
}