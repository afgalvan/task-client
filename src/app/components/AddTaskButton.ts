import { Button } from './Button';
import { Component } from './Component';
import { singleton } from './Singleton';
import { AddTaskForm } from './AddTaskForm';
import './AddTaskButton.scss';
import { TodoList } from './TodoList';

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
      new TodoList('todo-list').hide();
    });
  };
}
