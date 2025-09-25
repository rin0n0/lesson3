import { useState } from "react";
import styled from "@emotion/styled";
import { Task, makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";

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



export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
  };

  return (
    <Wrapper>
      <h1>TaskLite</h1>
      <TaskInput onAdd={handleAddTask} />
      <List>
        {tasks.map((t) => ( 
          <ListItem key={t.id}>{t.title}</ListItem>
        ))}
      </List>
    </Wrapper>
  );
};