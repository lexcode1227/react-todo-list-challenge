import { useState } from "react";
import { useForm } from "react-hook-form";
import "./TaskList.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchTodoSchema } from "../validation/dataSchema";
import { SearchFormData, Task } from "../types";
import { useDebounce } from "use-debounce";

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
  const [searchValueDebounced] = useDebounce(searchValue, 500);

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchValueDebounced)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <section className="taskList">
      <h2>Todo List</h2>
      {tasks.length !== 0 && (
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
      )}

      {filteredTasks.length > 0 ? (
        <ul className="taskListContainer">
          {filteredTasks.map((task) => (
            <li className="taskCard" key={task.id}>
              <div className="taskCard-header">
                <div className="taskCard-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <p className="taskCard-title">{task.taskName}</p>
                </div>
                <button onClick={() => deleteTask(task)}>Delete</button>
              </div>
              <div className="taskCard-body">
                <div className="taskCard-body--info">
                  <p className="taskCard-body--title">Priority: </p>
                  <p className="taskCard-body--value">{task.priority}</p>
                </div>
                <div className="taskCard-body--info">
                  <p className="taskCard-body--title">Story Points:</p>
                  <p className="taskCard-body--value">{task.storyPoints}</p>
                </div>
                <div className="taskCard-body--info">
                  <p className="taskCard-body--title">Assigned to:</p>
                  <p className="taskCard-body--value">{task.assignedTo}</p>
                </div>
                <div className="taskCard-body--info">
                  <p className="taskCard-body--title">Due date:</p>
                  <p className="taskCard-body--value">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No due date"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Not found results</p>
      )}
    </section>
  );
};

export default TaskList;
