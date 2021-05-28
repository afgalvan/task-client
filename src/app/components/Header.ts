import { Component } from './Component';
import { AddTaskButton } from './AddTaskButton';
import { ToggleButton } from './ToggleButton';
import { singleton } from '../models/singleton';
import './Header.scss';

@singleton
export class Header extends Component<HTMLDivElement> {
  private addTaskButton = new AddTaskButton('add-task');

  private toggleButton = new ToggleButton('todo-toggle');

  public render = (): void => {
    this.addTaskButton.render();
    this.toggleButton.render();
  };
}
