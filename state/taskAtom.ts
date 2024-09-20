import { atom } from 'recoil';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
}

export const tasksState = atom<Task[]>({
    key: 'tasksState',
    default: [],
});