import api from '../controllers/task.controller';
import { Component } from './Component';
import { singleton } from './Singleton';
import { Task } from './Task';
import './TodoList.scss';

@singleton
export class TodoList extends Component<HTMLDivElement> {
  public visible?: boolean;

  windowMedia = window.matchMedia('(min-width: 1050px)');

  curtain = <HTMLDivElement>document.querySelector('#curtain');

  public render = (): void => {
    api.getTasks().then((tasks) => {
      const template = tasks.map(
        (task) => `<div id="task-${task.id}" class="task-preview">${task.title}</div>`,
      );

      this.component.innerHTML = template.join('');

      tasks.forEach((task) => {
        const taskPreview = <HTMLDivElement>document.querySelector(`#task-${task.id}`);
        taskPreview.addEventListener('click', () => this.peekTask(task.id));
      });
    });
  };

  public peekTask = (id: number): void => {
    api.getTaskById(id).then((task) => {
      new Task(task).render();
      if (!this.windowMedia.matches) {
        this.toggle();
      }
    });
  };

  public toggle = (): boolean => {
    const transform = this.component.style.transform;
    this.component.style.width = '55%';

    if (transform === 'translateX(-100%)' || !transform) {
      this.curtain.style.display = 'grid';
      this.curtain.addEventListener('click', () => this.hide());
      this.component.style.transform = 'translateX(0)';
      return (this.visible = true);
    }

    return this.hide();
  };

  public hide = (): boolean => {
    if (this.visible && !this.windowMedia.matches) {
      this.curtain.style.display = 'none';
      this.component.style.transform = 'translateX(-100%)';
      return (this.visible = false);
    }

    return (this.visible = true);
  };

  restore = (): void => {
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
