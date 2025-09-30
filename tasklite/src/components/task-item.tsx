import styled from "@emotion/styled";
import type { Task } from "../entities/task";
type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.spacing(1)};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
  user-select: none;
`;
const Title = styled.span<{ completed?: boolean }>`
  text-decoration: ${(p) => (p.completed ? "line-through" : "none")};
  color: ${(p) =>
    p.completed ? p.theme.colors.textMuted : p.theme.colors.text};
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(p) => p.theme.colors.error};
`;
export const TaskItem = (p: TaskItemProps) => {
  return (
    <Item>
      <Title completed={p.task.completed} onClick={() => p.onToggle(p.task.id)}>{p.task.title}</Title>
      <Button onClick={() => p.onRemove(p.task.id)}>✕</Button>
    </Item>
  );
};
