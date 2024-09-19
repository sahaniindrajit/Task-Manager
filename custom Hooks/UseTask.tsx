import getTask from "@/actions/getTask";
import TaskCard from "@/components/taskCard";
import { useEffect, useState } from "react";

interface Task {
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
}

interface UseTaskProps {
    status: "TODO" | "IN_PROGRESS" | "DONE";
}

export default function UseTask({ status }: UseTaskProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await getTask();

                const allTasks = response.map((task) => ({
                    title: task.title,
                    description: task.description ?? "",
                    status: task.status,
                    priority: task.priority,
                    dueDate: new Date(task.dueDate).toLocaleDateString("en-US"),
                }));

                setTasks(allTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []);

    // Filter tasks based on the status prop
    const filteredTasks = tasks.filter(task => task.status === status);

    return (
        <div>
            <ul>
                {filteredTasks.map((task, index) => (
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
