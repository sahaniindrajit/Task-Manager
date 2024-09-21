/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useRecoilState } from "recoil";
import { tasksState } from "@/state/taskAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, Trash2 } from "lucide-react";
import deleteTask from "@/actions/deleteTask";
import EditTaskCard from "./editTaskCard";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    setDraggedTaskId: (id: string) => void;
}

export default function TaskCard({
    id,
    title,
    description,
    status,
    priority,
    dueDate,
    setDraggedTaskId,
}: TaskCardProps) {
    const [tasks, setTasks] = useRecoilState(tasksState);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const result = await deleteTask(id);

            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const priorityColors = {
        LOW: "bg-green-500",
        MEDIUM: "bg-yellow-500",
        HIGH: "bg-red-500",
    };

    const progressColors = {
        TODO: "bg-gray-500",
        IN_PROGRESS: "bg-blue-500",
        DONE: "bg-green-500",
    };

    const handleDragStart = () => {
        setDraggedTaskId(id);  // Set the dragged task ID
    };

    return (
        <>
            <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto my-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out" draggable onDragStart={handleDragStart}  >
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
                    <Badge
                        variant="outline"
                        className={`text-white ${progressColors[status]} capitalize px-2 py-1`}
                    >
                        {status}
                    </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-gray-700 mb-2">{description}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                        <Badge variant="outline" className="flex items-center space-x-2">
                            <Circle className={`h-2 w-2 ${priorityColors[priority]}`} />
                            <span className="text-sm">{priority}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center space-x-2">
                            <Circle className="h-2 w-2 bg-gray-500" />
                            <span className="text-sm">Due {dueDate}</span>
                        </Badge>
                    </div>
                </CardContent>
                <div className="flex justify-end space-x-2 p-2">
                    <EditTaskCard task={{ id, title, description, status, priority, dueDate }} onEdit={handleEdit} />

                    <Button
                        className="flex items-center"
                        variant="outline"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...

                            </div>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Task
                            </>
                        )}
                    </Button>
                </div>
            </Card>

        </>
    );
}
