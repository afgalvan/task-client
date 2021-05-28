import { Button } from './Button';
import { Component } from './Component';
import { singleton } from '../models/singleton';
import { AddTaskForm } from './AddTaskForm';
import { TodoList } from './TodoList';
import './AddTaskButton.scss';

@singleton
export class AddTaskButton extends Component<HTMLInputElement> implements Button {
  constructor(elementId: string) {
    super(elementId);
  }

  public onClick(callback: () => void): void {
    this.component?.addEventListener('click', callback);
  }

  public render = (): void => {
    this.onClick(() => {
      new AddTaskForm().render();
      new TodoList().hide();
    });
  };
}
