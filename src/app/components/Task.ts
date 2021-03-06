import { Component } from './Component';
import { TaskModel } from '../models/TaskModel';
import { html, render, TemplateResult } from 'lit-html';
import './Task.scss';

export class Task extends Component<HTMLDivElement> {
  taskZone = <HTMLDivElement>document.getElementById('task-zone');
  task: TaskModel | undefined;

  constructor(task?: TaskModel) {
    super('task');
    this.task = task;
  }

  public render = (): void => {
    if (this.task !== undefined) {
      this.renderTask(this.task);
    }
  };

  public renderTask = (task: TaskModel): void => {
    render(this.buildTask(task), this.taskZone);
  };

  private buildTask = (task: TaskModel): TemplateResult => {
    const state = task.state ? '✅' : '⭕';
    // prettier-ignore
    return html`
    <div class="Task" id="displayed-task-${task.id}">
      <div class="options">
        <span class="close" title="Close task"
        @click=${() => render(document.createElement('div'), this.taskZone)}>x</span>
      </div>

      <h3 class="task-title" id="task-title">${task.title}</h3>
      <p class="description">
        <span id="task-state">${state}</span>
        <span id="task-priority">${task.priority}</span>
        <span id="task-priority">${task.content}</span>
      </p>

      <div class="update">
        <span class="delete" title="Delete task">🗑</span>
        <span class="done" title="Mark task as done">✅</span>
      </div>
    </div>`;
  };
}
