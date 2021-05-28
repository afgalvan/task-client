import { render } from 'lit-html';
import { Component } from './Component';
import { singleton } from './Singleton';
import api from '../controllers/task.controller';
import { TaskPreview } from './TaskPreview';
import './TodoList.scss';

@singleton
export class TodoList extends Component<HTMLDivElement> {
  public isVisible?: boolean;

  windowMedia = window.matchMedia('(min-width: 1050px)');

  curtain = <HTMLDivElement>document.querySelector('#curtain');

  constructor(id: string = 'todo-list') {
    super(id);
  }

  public render = (): void => {
    api.getTasks().then((tasks) => {
      const template = tasks.map((task) =>
        new TaskPreview(task).build(),
      );

      render(template, this.component);
    });
  };

  refresh = (): void => {
    this.render();
  };

  clearOut = (): void => {
    render(document.createElement('div'), this.component);
  };

  toggle = (): boolean => {
    const transform = this.component.style.transform;
    this.component.style.width = '55%';

    if (transform === 'translateX(-100%)' || !transform) {
      this.curtain.style.display = 'grid';
      this.curtain.addEventListener('click', () => this.hide());
      this.component.style.transform = 'translateX(0)';
      return (this.isVisible = true);
    }

    return this.hide();
  };

  hide = (): boolean => {
    if (this.isVisible && !this.windowMedia.matches) {
      this.curtain.style.display = 'none';
      this.component.style.transform = 'translateX(-100%)';
      return (this.isVisible = false);
    }

    return (this.isVisible = true);
  };

  restoreDimensions = (): void => {
    this.windowMedia.addEventListener('change', () => {
      if (this.windowMedia.matches) {
        this.component.style.width = '25%';
        this.component.style.transform = 'translateX(0)';
        this.component.style.position = 'static';
        this.curtain.style.display = 'none';
        return;
      }

      this.component.style.transform = 'translateX(-100%)';
      this.component.style.position = 'fixed';
    });
  };
}
