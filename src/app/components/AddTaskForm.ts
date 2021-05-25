import { html, render, TemplateResult } from 'lit-html';
import { Component } from './Component';
import { singleton } from './Singleton';
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
      <form action="" method="post" id="add-task-form">
        <label for="title">Title</label>
        <input type="text" name="title" placeholder="Enter a task title" id="" />

        <input type="hidden" name="state" value="false">
        <input type="hidden" name="priority" value="1">

        <input type="submit" value="Save task">
      </form>
    </div>`;
  };

  public render = (): void => {
    render(this.renderForm(), this.taskZone);
  };
}
