export abstract class Component<T extends HTMLElement> {
  component: T;

  constructor(elementId: string) {
    this.component = <T>document.getElementById(elementId);
  }

  public abstract init(): void;
}
