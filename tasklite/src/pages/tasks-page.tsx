import { useState } from "react";
import styled from "@emotion/styled";
import type { Task, Filter } from "../entities/task";
import { makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";
import { TaskList } from "../components/task-list";
import { FilterBar } from "../views/filter-bar";
import { SearchBar } from "../views/search-bar";
import { useMemo } from "react";
import { TaskModal } from "../components/task-modal";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
  max-width: 600px;
  margin: 0 auto;
`;

const Counter = styled.p`
  margin-top: ${(p) => p.theme.spacing(2)};
  font-size: 14px;
  color: ${(p) => p.theme.colors.textMuted};
`;

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });
  }, [tasks, filter]);

  const searchedTasks = useMemo(() => {
    return filteredTasks.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [filteredTasks, query]);

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const handleEditTask = (
    id: string,
    newTitle: string,
    newDescription: string
  ) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: newTitle, description: newDescription } : t
      )
    );
  };

  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <Wrapper>
      <h1>TaskLite</h1>
      <TaskInput onAdd={handleAddTask} />
      <SearchBar query={query} onChange={setQuery} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={searchedTasks}
        onToggle={handleToggleTask}
        onRemove={handleRemoveTask}
        onEdit={(task) => setEditingTask(task)}
      />
      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleEditTask}
        />
      )}

      <Counter>
        Всего: {total} | Активных: {active} | Выполненных: {completed}
      </Counter>
    </Wrapper>
  );
};
