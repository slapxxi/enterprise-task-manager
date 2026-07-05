const INTERVAL = 2000;

let deadlines = {};

addEventListener('message', ({ data }) => {
  const { type, payload } = data;

  switch (type) {
    case 'deadlines-replace':
      deadlines = {};
      Object.entries(payload).forEach(([taskId, deadline]) => {
        deadlines[taskId] = deadline;
      });
      break;
    default:
      break;
  }
});

addEventListener('unload', () => {
  clearInterval(intervalId);
});

const intervalId = setInterval(() => {
  const expiredDeadlines = {};
  let length = 0;

  Object.entries(deadlines).forEach(([taskId, deadline]) => {
    if (new Date(deadline) < Date.now()) {
      expiredDeadlines[taskId] = deadline;
      length += 1;
    }
  });

  if (length === 0) {
    return;
  }

  postMessage({ type: 'deadlines-expired', payload: expiredDeadlines });
}, INTERVAL);
