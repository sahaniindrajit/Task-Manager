import { atom, selector } from "recoil";

// Task interface
interface Task {
    id: string;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
}

// Atom to store the list of tasks
export const taskListState = atom<Task[]>({
    key: "taskListState", // unique ID 
    default: [], // initial state
});

export const filteredTaskList = selector({
    key: "filteredTaskList",
    get: ({ get }) => {
        const tasks = get(taskListState);
        return {
            TODO: tasks.filter((task) => task.status === "TODO"),
            IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
            DONE: tasks.filter((task) => task.status === "DONE"),
        };
    },
});
