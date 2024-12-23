import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Form.css";
import { todoSchema } from "../validation/dataSchema";
import { mappedPriority, Task } from "../types";

const Form = ({
  addTask,
}: {
  addTask: (task: Task, callback: () => void) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      completed: false,
    },
  });

  const priorityOptions = Object.entries(mappedPriority).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  const onSubmit = (data: Task) => {
    addTask(data, reset);
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="formGroup">
        <label className="label" htmlFor="taskName">
          Task Name
        </label>
        <input
          className="input"
          id="taskName"
          {...register("taskName", {
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Task name must contain only alphabetic characters",
            },
          })}
          required
        />
        {errors.taskName && <span>{errors.taskName.message}</span>}
      </div>
      <div className="formGroup">
        <label className="label" htmlFor="priority">
          Priority
        </label>
        <select
          className="select"
          id="priority"
          {...register("priority")}
          required
        >
          {priorityOptions}
        </select>
        {errors.priority && <span>{errors.priority.message}</span>}
      </div>
      <div className="formGroup">
        <label className="label" htmlFor="storyPoints">
          Story Points
        </label>
        <input
          className="input"
          id="storyPoints"
          type="number"
          {...register("storyPoints", { valueAsNumber: true })}
          required
        />
        {errors.storyPoints && <span>{errors.storyPoints.message}</span>}
      </div>
      <div className="formGroup">
        <label className="label" htmlFor="assignedTo">
          Assigned To
        </label>
        <input
          className="input"
          id="assignedTo"
          {...register("assignedTo")}
          required
        />
        {errors.assignedTo && <span>{errors.assignedTo.message}</span>}
      </div>
      <div className="formGroup">
        <label className="label" htmlFor="dueDate">
          Due Date
        </label>
        <input
          className="input"
          id="dueDate"
          type="date"
          {...register("dueDate", { valueAsDate: true })}
          required
        />
        {errors.dueDate && <span>{errors.dueDate.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
