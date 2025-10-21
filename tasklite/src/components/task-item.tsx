import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { useState } from "react";

type TaskItemProps = {
  task: Task;
  isFirst?: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
};
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.spacing(1)};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
  user-select: none;
`;
const Title = styled.span<{ completed?: boolean; isFirst?: boolean }>`
  text-decoration: ${(p) => (p.completed ? "line-through" : "none")};
  color: ${(p) =>
    p.completed ? p.theme.colors.textMuted : p.theme.colors.text};
  cursor: pointer;
  font-weight: ${(p) => (p.isFirst ? "bold" : "normal")};
  user-select: none; // запрет выделения текста
`;

const DateText = styled.span`
  font-size: 12px;
  color: ${(p) => p.theme.colors.textMuted};
  margin-top: 2px;
  font-weight: normal;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Description = styled.div<{ expanded: boolean }>`
  font-size: 13px;
  color: ${(p) => p.theme.colors.textMuted};
  font-weight: normal; /* всегда обычный вес */
  margin-top: ${(p) => p.theme.spacing(1)};
  line-height: 1.5;

  max-height: ${(p) => (p.expanded ? "200px" : "0")};
  opacity: ${(p) => (p.expanded ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
`;

export const TaskItem = (p: TaskItemProps) => {
  const [showDescription] = useState(false);
  return (
    <Item>
      <Content>
        <Title
          completed={p.task.completed}
          isFirst={p.isFirst}
          onClick={() => p.onToggle(p.task.id)}
        >
          {p.task.title}
        </Title>
        <Description expanded={showDescription}>
          {p.task.description}
        </Description>
        <DateText>
          {p.task.createdAt.toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </DateText>
      </Content>

      <div>
        <IconButton onClick={() => p.onEdit(p.task)} aria-label="Изменить">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
              stroke="#c2c2c2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
        <IconButton onClick={() => p.onRemove(p.task.id)} aria-label="Удалить">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M19 5L5 19M5.00001 5L19 19"
                stroke="#dd8888"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>{" "}
        </IconButton>
      </div>
    </Item>
  );
};
