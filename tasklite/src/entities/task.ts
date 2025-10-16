export type Task = {
  readonly id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
};

export type Filter = "all" | "active" | "completed";

export function makeTask(title: string): Task {
  return {
    id: Math.random().toString(36).slice(2, 9),
    title: title.trim(),
    description: "",
    completed: false,
    createdAt: new Date(),
  };
}
