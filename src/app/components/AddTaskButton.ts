import { Button } from './Button';
import { Component } from './Component';
import './AddTaskButton.scss';

export class AddTaskButton extends Component<HTMLInputElement> implements Button {
  public onClick(callback: () => any): void {
    super.component?.addEventListener('click', callback);
  }

  public init(): void {}
}
