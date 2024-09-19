import getTask from "@/actions/getTask";
import TaskCard from "@/components/taskCard";
import { useEffect, useState } from "react";

interface Task {
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: Date | null;
}

export default function UseTask() {
    const [tasks, setTasks] = useState<Task[]>([
        { title: '', description: '', status: "TODO", priority: "LOW", dueDate: null }
    ]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await getTask();

                const allTasks = response.map((task) => ({
                    title: task.title,
                    description: task.description ?? "",
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "",
                }));

                setTasks(allTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []);

    return (
        <div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <TaskCard
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            priority={task.priority}
                            dueDate={task.dueDate}
                        />
                    </li>

                ))}
            </ul>
        </div>
    );
}
