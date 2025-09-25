import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./button";
import { ErrorText } from "./error-text"

type TaskInputProps = {
  onAdd: (title: string) => void;
};

const Wrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

const Input = styled.input`
  flex: 1;
  padding: ${(p) => p.theme.spacing(1)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
`;

export const TaskInput = (p: TaskInputProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setError("Название задачи не может быть пустым");
      return;
    }

    if (trimmed.length > 50) {
      setError("Название задачи слишком длинное (макс. 50 символов)");
      return;
    }

    p.onAdd(trimmed);
    setValue("");
    setError(null);
  };

  return (
    <div>
      <Wrapper>
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          placeholder="Введите задачу"
        />
        <Button label="Добавить" onClick={handleAdd} />
      </Wrapper>
      {error && <ErrorText message={error}/>}
    </div>
  );
};


