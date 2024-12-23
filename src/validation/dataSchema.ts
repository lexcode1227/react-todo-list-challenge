import { z } from "zod";
import { priority } from "../types";

export const todoSchema = z.object({
  taskName: z
    .string()
    .min(5, "The task name must be greater than 5 and less than 30")
    .max(30)
    .regex(
      /^[A-Za-z\s]+$/,
      "Task name must contain only alphabetic characters and spaces"
    ),
  priority: z.enum(priority, {
    errorMap: () => ({ message: "The priority is required" }),
  }),
  storyPoints: z
    .number()
    .min(1, "The story points must be positive numbers")
    .max(20, "The story points must be greater than 0 and less than 20"),
  assignedTo: z
    .string()
    .min(1, "Must be a valid user name (letters and spaces only)."),
  dueDate: z
    .date()
    .min(new Date(), "Must be a valid date in the future.")
    .nullable()
    .refine((date) => date !== null && date > new Date(), {
      message: "La fecha debe ser en el futuro",
    }),
  completed: z.boolean(),
});

export const searchTodoSchema = z.object({
  search: z.string().optional(),
});
