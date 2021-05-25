import { Button } from './Button';
import { Component } from './Component';
import './ToggleButton.scss';

export class ToggleButton extends Component<HTMLInputElement> implements Button {
  public onClick(callback: () => any): void {
    super.component?.addEventListener('click', callback);
  }

  public init(): void {
  }
}
