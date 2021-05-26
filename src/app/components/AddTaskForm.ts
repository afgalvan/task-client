import { html, render, TemplateResult } from 'lit-html';
import { Component } from './Component';
import { singleton } from './Singleton';
// import api from '../controllers/task.controller';
import './AddTaskForm.scss';

@singleton
export class AddTaskForm extends Component<HTMLFormElement> {
  taskZone = <HTMLDivElement>document.getElementById('task-zone');

  constructor() {
    super('add-task-form');
  }

  private renderForm = (): TemplateResult => {
    // prettier-ignore
    return html`
    <div class="AddTaskForm">
      <div class="options">
        <span class="close"
        @click=${() => render(document.createElement('div'), this.taskZone)}>x</span>
      </div>

      <form id="add-task-form">
        <label for="title">Title</label>
        <input type="text" name="title" placeholder="Enter a task title">

        <label for="content">Description</label>
        <input type="text" name="content" placeholder="Enter a task description">
        <input type="hidden" name="state" value="false">
        <input type="hidden" name="priority" value="1">

        <input type="submit" value="Save task">
      </form>
    </div>`;
  };

  sendForm = (): void => {
    this.reload();
    console.log('Gei');
    const component = <HTMLFormElement>document.getElementById('add-task-form');

    if (component !== null) {
      const formData = new FormData(component);
      for (let key of formData.keys()) {
        console.log(key);
      }
    }

    this.component.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      //api.postTask(formData).then((response) => console.log(response));
    });
  };

  public render = (): void => {
    render(this.renderForm(), this.taskZone);
    this.sendForm();
  };
}
