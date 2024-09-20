import getTask from "@/actions/getTask";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tasksState } from "@/state/taskAtom";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
}

interface UseTaskProps {
    refresh: boolean;
    status: "TODO" | "IN_PROGRESS" | "DONE";
}

export default function UseTask() {
    const [tasks, setTasks] = useRecoilState(tasksState); // Using Recoil state instead of local state

    useEffect(() => {
        async function fetchTasks() {
            try {
                const allTasks = await getTask();

                const formattedTasks = allTasks.map((task: Task) => ({
                    id: task.id,
                    title: task.title,
                    description: task.description ?? "",
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                        : "No Date",
                }));


                setTasks(formattedTasks); // Set tasks in Recoil state
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        fetchTasks();
    }, []);

}
