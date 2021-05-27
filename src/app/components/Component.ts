export abstract class Component<T extends HTMLElement> {
  component: T;
  id: string;

  constructor(elementId: string) {
    this.id = elementId;
    this.component = <T>document.querySelector(`#${elementId}`);
  }

  public reloadProps = (): void => {
    this.component = <T>document.querySelector(`#${this.id}`);
  }

  public abstract render: () => void;
}
