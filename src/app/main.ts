import { app } from './components/App';
import './main.scss';

const main = (): void => {
  app.init();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
