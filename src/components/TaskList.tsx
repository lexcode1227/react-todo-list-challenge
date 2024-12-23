import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./TaskList.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchTodoSchema } from "../validation/dataSchema";
import { SearchFormData, Task } from "../types";

const TaskList = () => {
  const { register } = useForm<SearchFormData>({
    resolver: zodResolver(searchTodoSchema),
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const tasksWithIds = existingTasks.map((task: Task) =>
      task.id ? task : { ...task, id: `${Date.now()}-${Math.random()}` }
    );
    setTasks(tasksWithIds);
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchValue)
  );

  const handleDeleteTask = (id: string | undefined) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (id: string | undefined) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <section className="taskList">
      <h2>Todo List</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="formGroup">
          <label className="label" htmlFor="search">
            Search
          </label>
          <input
            className="input"
            id="search"
            {...register("search")}
            placeholder="Search task by name..."
            onChange={handleSearchChange}
          />
        </div>
      </form>

      {filteredTasks.length > 0 ? (
        <ul className="taskListContainer">
          {filteredTasks.map((task) => (
            <li className="taskCard" key={task.id}>
              <div className="taskCard-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                <p className="taskCard-title">{task.taskName}</p>
              </div>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron tareas con ese nombre</p>
      )}
    </section>
  );
};

export default TaskList;
