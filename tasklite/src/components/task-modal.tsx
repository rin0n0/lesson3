import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Modal = styled.div`
    background: ${(p) => p.theme.colors.surface};
    padding: ${(p) => p.theme.spacing(3)};
    border-radius: ${(p) => p.theme.radius.md};
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: ${(p) => p.theme.spacing(2)};
`

const Input = styled.input`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
`;
const TextArea = styled.textarea`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
    min-height: 80px;
    resize: vertical;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${(p) => p.theme.spacing(1)};
`;
const Button = styled.button<{ variant?: "primary" | "secondary" }>`
    padding: 6px 14px;
    border-radius: ${(p) => p.theme.radius.sm};
    border: 1px solid
        ${(p) => (p.variant === "primary" ? p.theme.colors.accent : p.theme.colors.border)};
    background: ${(p) => (p.variant === "primary" ? p.theme.colors.accent : p.theme.colors.surface)};
    color: ${(p) => (p.variant === "primary" ? "#fff" : p.theme.colors.text)};
    cursor: pointer;
`;

type TaskModalProps = {
    task: Task;
    onSave: (id: string, title: string, description: string) => void;
    onClose: () => void;
};

export const TaskModal = (p: TaskModalProps) => {
    const [title, setTitle] = useState(p.task.title);
    const [description, setDescription] = useState(p.task.description ?? "");
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") p.onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [p]);
    return (
        <Overlay>
            <Modal>
                <h2>Редактирование задачи</h2>

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Actions>
                    <Button onClick={p.onClose}>Отмена</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (title.trim() !== "") {
                                p.onSave(p.task.id, title.trim(), description.trim());
                                p.onClose();
                            }
                        }}
                    >
                        Сохранить
                    </Button>
                </Actions>
            </Modal>
        </Overlay>
    );
};

