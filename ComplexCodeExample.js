// File Name: ComplexCodeExample.js

// This is a complex JavaScript code example demonstrating a task scheduler system

// Define the TaskScheduler class
class TaskScheduler {
  constructor() {
    this.tasks = [];
    this.currentTaskIndex = 0;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  run() {
    if (this.currentTaskIndex >= this.tasks.length) {
      console.log('All tasks completed!');
      return;
    }

    const currentTask = this.tasks[this.currentTaskIndex++];
    console.log('Running task:', currentTask.name);

    currentTask.execute(this.run.bind(this));
  }
}

// Define the Task class
class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  execute(callback) {
    console.log(`Task '${this.name}' started. Duration: ${this.duration}ms`);
    setTimeout(() => {
      console.log(`Task '${this.name}' completed.`);
      callback();
    }, this.duration);
  }
}

// Create an instance of TaskScheduler
const scheduler = new TaskScheduler();

// Create multiple tasks and add them to the scheduler
const task1 = new Task('Task 1', 2000);
const task2 = new Task('Task 2', 3000);
const task3 = new Task('Task 3', 1000);
scheduler.addTask(task1);
scheduler.addTask(task2);
scheduler.addTask(task3);

// Start running the tasks
scheduler.run();

// Output:
// Running task: Task 1
// Task 'Task 1' started. Duration: 2000ms
// Running task: Task 2
// Task 'Task 1' completed.
// Task 'Task 2' started. Duration: 3000ms
// Running task: Task 3
// Task 'Task 2' completed.
// Task 'Task 3' started. Duration: 1000ms
// Task 'Task 3' completed.
// All tasks completed!