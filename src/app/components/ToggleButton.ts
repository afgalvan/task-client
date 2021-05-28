import { Button } from './Button';
import { Component } from './Component';
import { singleton } from '../models/singleton';
import { TodoList } from './TodoList';
import './ToggleButton.scss';

@singleton
export class ToggleButton extends Component<HTMLInputElement> implements Button {
  public onClick(callback: () => any): void {
    this.component?.addEventListener('click', callback);
  }

  public render = (): void => {
    this.onClick(() => {
      const todoList = new TodoList('todo-list');
      todoList.toggle();
      todoList.restoreDimensions();
    });
  };
}
