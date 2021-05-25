import header from './Header';

class App {
  public init = (): void => {
    header.init();
  };
}

export const app = new App();
