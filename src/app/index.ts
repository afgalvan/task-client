import '../styles/main.css';
import taskController from './controllers/task.controller';

const main = (): void => {
  taskController.loadTasksPreviews();
  taskController.addNewTask();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
