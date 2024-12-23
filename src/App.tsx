import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task, callback: () => void) => {
    const taskWithId = {
      ...task,
      id: `${Date.now()}--${Math.random()}`,
    };

    callback();
    const updatedTasks = [...tasks, taskWithId];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (TasktoDelete: Task) => {
    const updatedTasks = tasks.filter((task) => task.id !== TasktoDelete.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCheckboxChange = (id: string | undefined) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(existingTasks);
  }, []);

  return (
    <main className="container">
      <h1 className="todoTitle">My ToDo</h1>
      <section className="todoList">
        <Form addTask={addTask} />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          handleCheckboxChange={handleCheckboxChange}
        />
      </section>
    </main>
  );
}

export default App;
