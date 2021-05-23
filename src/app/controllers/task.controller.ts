import api from '../api/Api';
import { sleep } from '../helpers/helpers';
import { Task } from '../models/Task';

export const loadTasksPreviews = (): void => {
  const todoList = <HTMLDivElement>document.querySelector('#todo-list');

  api.getTasks().then((tasks) => {
    const template = tasks.map(
      (task) => `<div id="task-${task.id}" class="task-preview">${task.title}</div>`,
    );
    todoList.innerHTML = template.join('');

    tasks.forEach((task) => {
      const taskView = <HTMLDivElement>document.querySelector(`#task-${task.id}`);
      taskView.addEventListener('click', () => peekTask(task.id));
    });
  });
};

export const addNewTask = (): void => {
  const addTaskButton = <HTMLInputElement>document.querySelector('#add-task');
  addTaskButton.addEventListener('click', () => {
    registerTask();
  });
};

const renderTask = (task: Task): string => {
  return `
  <div class="task">
    <h3>${task.title}</h3>
    <p>
      <span>state: ${task.state}</span>
      <span>priority: ${task.priority}</span>
      <span>content: ${task.content}</span>
    </p>
  </div>`.trimStart();
};

const peekTask = (id: number): void => {
  const taskZone = <HTMLDivElement>document.querySelector('#task-zone');
  api.getTaskById(id).then((task) => {
    taskZone.innerHTML = renderTask(task);
  });
};

const renderTaskForm = (): string => {
  return `
  <div id="add-task-form">
  </div>`;
};

const registerTask = async (): Promise<void> => {
  const taskZone = <HTMLDivElement>document.querySelector('#task-zone');
  const currentTask = <HTMLDivElement>document.querySelector('.task');
  if (currentTask != null) {
    currentTask.style.transform = 'translateX(150%)';
    currentTask.style.position = 'fixed';
    currentTask.style.width;
    await sleep(300);
    taskZone.innerHTML = '';
  }
  taskZone.innerHTML = renderTaskForm();
};
