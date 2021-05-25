import { TaskModel } from '../models/TaskModel';
import { API_URL } from '../config/config';

class Api {
  private API_URL;

  constructor() {
    this.API_URL = API_URL;
  }

  getTasks = async (): Promise<TaskModel[]> => {
    let tasks = new Array<TaskModel>();

    await fetch(`${this.API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => (tasks = data))
      .catch(() => console.error('Unable to connect to server'));

    return tasks;
  };

  getTaskById = async (id: number): Promise<TaskModel> => {
    let task = new TaskModel();

    await fetch(`${this.API_URL}/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => (task = data))
      .catch(() => console.error('Unable to connect to server'));

    return task;
  };
}

const api = new Api();

export default api;
