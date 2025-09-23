import styled from "@emotion/styled";
import { Button } from "../components/button";

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
`;

export const TasksPage = () => {
  return (
    <Wrapper>
      <h1>TaskLite</h1>
      <p>Ваш список задач появится здесь</p>
      <Button label="Добавить задачу" />
    </Wrapper>
  );
};