import { z } from "zod";
import { searchTodoSchema } from "./validation/dataSchema";

export const priority = ["Urgent", "High", "Normal", "Low"] as const;

export type Priority = (typeof priority)[number];

export const mappedPriority: Record<Priority, string> = {
  Urgent: "Urgent",
  High: "High",
  Normal: "Normal",
  Low: "Low",
};

export type Task = {
  taskName: string;
  priority: Priority;
  storyPoints: number;
  assignedTo: string;
  dueDate: Date;
  completed: boolean;
  id?: string;
};

export type SearchFormData = z.infer<typeof searchTodoSchema>;
