import { Component } from './Component';
import { AddTaskButton } from './AddTaskButton';
import './Header.scss';
import { ToggleButton } from './ToggleButton';

class Header extends Component<HTMLDivElement> {
  private addTaskButton = new AddTaskButton('add-task');

  private toggleButton = new ToggleButton('todo-toggle');

  public init(): void {
    this.addTaskButton.init();
    this.toggleButton.init();
  }
}

const header = new Header('header');

export default header;
