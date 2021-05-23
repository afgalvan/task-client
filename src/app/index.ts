import '../styles/main.css';
import * as taskController from './controllers/task.controller';

const main = async (): Promise<void> => {
  taskController.loadTasksPreviews();
  taskController.addNewTask();
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
