import { TaskModel } from '../models/TaskModel';
import { API_URL } from '../config/config';

class Api {
  private API_URL: string;

  constructor() {
    this.API_URL = API_URL + '/tasks';
  }

  getTasks = async (): Promise<TaskModel[]> => {
    let tasks = new Array<TaskModel>();

    await fetch(this.API_URL)
      .then((response) => response.json())
      .then((data) => (tasks = data))
      .catch(() => console.error('Unable to connect to server'));

    return tasks.reverse();
  };

  getTaskById = async (id: number): Promise<TaskModel> => {
    let task = new TaskModel();

    await fetch(`${this.API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => (task = data))
      .catch(() => console.error('Unable to connect to server'));

    return task;
  };

  postTask = async (task: TaskModel): Promise<TaskModel> => {
    const request = new Request(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    let responseTask = new TaskModel();
    await fetch(request)
      .then((response) => response.json())
      .then((data) => (responseTask = data))
      .catch(() => console.error('Unable to connect to server'));

    return responseTask;
  };

  deleteTaskById = async (id: number): Promise<string> => {
    const request = new Request(`${this.API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
    });

    let response = '';
    await fetch(request)
      .then((response) => console.log(response))
      .catch(() => console.error('Unable get a response from the server'));

    return response;
  };
}

const api = new Api();

export default api;
