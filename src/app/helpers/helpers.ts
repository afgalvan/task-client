export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const restore = (): void => {
  const curtain = <HTMLDivElement>document.querySelector('#curtain');
  const taskList = <HTMLDivElement>document.querySelector('#todo-list');
  const windowMedia = window.matchMedia('(min-width: 750px)');

  windowMedia.addEventListener('change', () => {
    if (windowMedia.matches) {
      taskList.style.width = '25%';
      taskList.style.transform = 'translateX(0)';
      taskList.style.position = 'static';
      curtain.style.display = 'none';
      return;
    }

    taskList.style.transform = 'translateX(-100%)';
    taskList.style.position = 'fixed';
  });
};
