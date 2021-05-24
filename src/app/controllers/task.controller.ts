import api from '../api/Api';
import { restore, sleep } from '../helpers/helpers';
import { Task } from '../models/Task';

class TaskController {
  public loadTasksPreviews = (): void => {
    const todoList = <HTMLDivElement>document.querySelector('#todo-list');

    api.getTasks().then((tasks) => {
      const template = tasks.map(
        (task) => `<div id="task-${task.id}" class="task-preview">${task.title}</div>`,
      );
      todoList.innerHTML = template.join('');

      tasks.forEach((task) => {
        const taskView = <HTMLDivElement>document.querySelector(`#task-${task.id}`);
        taskView.addEventListener('click', () => this.peekTask(task.id));
      });
    });
  };

  public addNewTask = (): void => {
    const addTaskButton = <HTMLInputElement>document.querySelector('#add-task');
    addTaskButton.addEventListener('click', () => {
      this.registerTask();
    });
  };
  private renderTask = (task: Task): string => {
    return `
    <div class="task">
      <h3>${task.title}</h3>
      <p>
        <span>state: ${task.state}</span>
        <span>priority: ${task.priority}</span>
        <span>content: ${task.content}</span>
      </p>
    </div>`;
  };

  private peekTask = (id: number): void => {
    const taskZone = <HTMLDivElement>document.querySelector('#task-zone');
    api.getTaskById(id).then((task) => {
      taskZone.innerHTML = this.renderTask(task);
    });
  };

  private renderTaskForm = (): string => {
    return `
    <div id="add-task-form">
    </div>`;
  };

  private registerTask = async (): Promise<void> => {
    const taskZone = <HTMLDivElement>document.querySelector('#task-zone');
    const currentTask = <HTMLDivElement>document.querySelector('.task');
    if (currentTask != null) {
      currentTask.style.transform = 'translateX(150%)';
      currentTask.style.position = 'fixed';
      currentTask.style.width;
      await sleep(300);
      taskZone.innerHTML = '';
    }
    taskZone.innerHTML = this.renderTaskForm();
  };

  public taskListToggle = (): void => {
    const taskList = <HTMLDivElement>document.querySelector('#todo-list');
    const curtain = <HTMLDivElement>document.querySelector('#curtain');
    const todoToggle = <HTMLSpanElement>document.querySelector('#todo-toggle');

    todoToggle.addEventListener('click', () => {
      taskList.style.width = '55%';

      if (taskList.style.transform === 'translateX(-100%)') {
        curtain.style.display = 'grid';
        taskList.style.transform = 'translateX(0)';
        return;
      }

      curtain.style.display = 'none';
      taskList.style.transform = 'translateX(-100%)';
    });

    restore();
  };
}

const taskController = new TaskController();

export default taskController;
