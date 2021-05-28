import api from '../controllers/task.controller';
import { TaskModel } from '../models/TaskModel';
import { html, render, TemplateResult } from 'lit-html';
import { Component } from './Component';
import { Task } from './Task';
import { TodoList } from './TodoList';
import './TaskPreview.scss';

export class TaskPreview extends Component<HTMLDivElement> {
  task: TaskModel;
  isExisting: boolean;

  constructor(task: TaskModel) {
    super(`task${task.id}`);
    this.task = task;
    this.isExisting = true;
  }

  render = (): void => {};

  build = (task: TaskModel = this.task): TemplateResult => {
    return html`<div
      id="task-${task.id}"
      @click=${() => this.peekTask()}
      class="task-preview"
    >
      <span class="preview-title">${task.title}</span>
      <span class="options">
        <span class="update-task">📝</span>
        <span class="delete-task" @click=${() => this.selfDelete()}>🗑</span>
      </span>
    </div>`;
  };

  peekTask = (): void => {
    if (!this.task.id || !this.isExisting) {
      return;
    }

    api.getTaskById(this.task.id).then((task) => {
      new Task(task).render();
      new TodoList().hide();
    });
  };

  selfDelete = (): void => {
    if (!this.task.id) {
      return;
    }

    this.isExisting = false;
    api.deleteTaskById(this.task.id).then(() => {
      const taskZone = <HTMLDivElement>document.getElementById('task-zone');
      const currentTask = document.getElementById(`displayed-task-${this.task.id}`);
      if (currentTask) {
        render(document.createElement('div'), taskZone);
      }

      new TodoList().refresh();
    });
  };
}
