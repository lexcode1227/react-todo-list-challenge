import { useState } from "react";
import { useForm } from "react-hook-form";
import "./TaskList.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchTodoSchema } from "../validation/dataSchema";
import { SearchFormData, Task } from "../types";

const TaskList = ({
  tasks,
  deleteTask,
  handleCheckboxChange,
}: {
  tasks: Task[];
  deleteTask: (task: Task) => void;
  handleCheckboxChange: (id: string | undefined) => void;
}) => {
  const { register } = useForm<SearchFormData>({
    resolver: zodResolver(searchTodoSchema),
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchValue)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
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
              <button onClick={() => deleteTask(task)}>Delete</button>
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
