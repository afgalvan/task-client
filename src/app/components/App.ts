import { Header } from './Header';
import { TodoList } from './TodoList';

class App {
  public init = (): void => {
    new Header('header').render();
    new TodoList('todo-list').render();
  };
}

export const app = new App();
