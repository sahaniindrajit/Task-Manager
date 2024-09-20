import { useRecoilValue } from "recoil";
import { filteredTaskList } from "@/state/taskAtom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskCard from '@/components/taskCard';
import UseTask from "@/custom Hooks/UseTask";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

function KanbanColumn({ title, color, tasks, setActiveCard, onDrop, isLoading }) {
    return (
        <Card className={`${color}`}>
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
                        <TaskCard key={task.id} {...task} setActiveCard={setActiveCard} onDrop={onDrop} />
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
    const tasksByStatus = useRecoilValue(filteredTaskList);
    const [activeCard, setActiveCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            <KanbanColumn title="To Do" color="bg-yellow-100" tasks={tasksByStatus.TODO} setActiveCard={setActiveCard} onDrop={onDrop} isLoading={isLoading} />
            <KanbanColumn title="In Progress" color="bg-blue-100" tasks={tasksByStatus.IN_PROGRESS} setActiveCard={setActiveCard} onDrop={onDrop} isLoading={isLoading} />
            <KanbanColumn title="Done" color="bg-green-100" tasks={tasksByStatus.DONE} setActiveCard={setActiveCard} onDrop={onDrop} isLoading={isLoading} />
        </div>
    );
}

function onDrop(status, id) {
    // Handle drop logic here
}
