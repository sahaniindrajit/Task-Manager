/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilValue, useRecoilState } from "recoil";
import { filteredTaskList, tasksState } from "@/state/taskAtom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskCard from '@/components/taskCard';
import UseTask from "@/custom Hooks/UseTask";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import updateStatus from "@/actions/updateStatus";

function KanbanColumn({ title, color, tasks, setDraggedTaskId, onDrop, isLoading }) {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = () => {
        onDrop();
    };
    return (
        <Card className={`${color}`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </div>
                ) : tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard key={task.id} {...task} setDraggedTaskId={setDraggedTaskId} />
                    ))
                ) : (
                    <div className="text-center text-gray-500">No tasks</div>
                )}
            </CardContent>
        </Card>
    );
}

export default function KanbanBoard() {
    const allTask = UseTask();
    const [tasks, setTasks] = useRecoilState(tasksState);
    const tasksByStatus = useRecoilValue(filteredTaskList);
    const [isLoading, setIsLoading] = useState(true);
    const [draggedTaskId, setDraggedTaskId] = useState(null);

    const handleDrop = async (newStatus) => {
        if (!draggedTaskId) return;

        try {
            const updatedTask = updateStatus(draggedTaskId, { status: newStatus });



            // Update the local state after successfully updating the server
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === draggedTaskId ? { ...task, status: newStatus } : task
                )
            );
        } catch (error) {
            console.error('Error updating task status:', error);
        } finally {
            setDraggedTaskId(null);  // Clear the dragged task ID after dropping
        }
    };

    useEffect(() => {
        try {
            while (allTask != true) {
                setIsLoading(true)
            }
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1150);

        }
    }, [allTask])

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <KanbanColumn
                title="To Do"
                color="bg-yellow-100"
                tasks={tasksByStatus.TODO}
                onDrop={() => handleDrop("TODO")}
                setDraggedTaskId={setDraggedTaskId}
                isLoading={isLoading}
            />
            <KanbanColumn
                title="In Progress"
                color="bg-blue-100"
                tasks={tasksByStatus.IN_PROGRESS}
                onDrop={() => handleDrop("IN_PROGRESS")}
                setDraggedTaskId={setDraggedTaskId}
                isLoading={isLoading}
            />
            <KanbanColumn
                title="Done"
                color="bg-green-100"
                tasks={tasksByStatus.DONE}
                onDrop={() => handleDrop("DONE")}
                setDraggedTaskId={setDraggedTaskId}
                isLoading={isLoading}
            />
        </div>
    );
}
