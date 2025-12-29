async function promiseAllLimit(tasks, limit) {
  const results = new Array(tasks.length); // 按顺序保存结果
  let index = 0; // 下一个要执行的任务索引

  // 工作者函数：每次取一个任务执行
  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++; // 分配任务
      try {
        const res = await tasks[currentIndex](); // 执行异步任务
        results[currentIndex] = res;
      } catch (err) {
        results[currentIndex] = Promise.reject(err); // 保持原始错误
      }
    }
  }

  // 同时启动 limit 个 worker
  const workers = Array(Math.min(limit, tasks.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers); // 等所有 worker 完成
  return results;
}


// =========================================================================
// how to use 
function createTask(id, delay) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Task ${id} done`);
        resolve(id);
      }, delay);
    });
}

const tasks = [
  createTask(1, 1000),
  createTask(2, 500),
  createTask(3, 300),
  createTask(4, 400),
  createTask(5, 800),
];

// 每次最多执行 2 个任务
promiseAllLimit(tasks, 2).then((res) => {
  console.log("All done:", res);
});
// ==============================================================
// Task 2 done
// Task 3 done
// Task 1 done
// Task 4 done
// Task 5 done
// All done: [1, 2, 3, 4, 5]
