import { atom, selector } from 'recoil';

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


export const filteredTaskList = selector({
    key: "filteredTaskList",
    get: ({ get }) => {
        const tasks = get(tasksState);
        return {
            TODO: tasks.filter((task) => task.status === "TODO"),
            IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
            DONE: tasks.filter((task) => task.status === "DONE"),
        };
    },
});