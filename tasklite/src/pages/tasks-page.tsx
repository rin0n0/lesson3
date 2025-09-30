import { useState } from "react";
import styled from "@emotion/styled";
import { Task, makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";
import { TaskList } from "../components/task-list";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
`;

const List = styled.ul`
  margin-top: ${(p) => p.theme.spacing(2)};
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: ${(p) => p.theme.spacing(1)};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

const Counter = styled.p`
  margin-top: ${(p) => p.theme.spacing(2)};
  font-size: 14px;
  color: ${(p) => p.theme.colors.textMuted};
`;

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <Wrapper>
      <h1>TaskLite</h1>
      <TaskInput onAdd={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onRemove={handleRemoveTask}
      />
      <Counter>
        Всего: {total} | Активных: {active} | Выполненных: {completed}
      </Counter>
    </Wrapper>
  );
};