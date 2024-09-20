import { useRecoilValue } from "recoil";
import { filteredTaskList } from "@/state/taskAtom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskCard from '@/components/taskCard';
import UseTask from "@/custom Hooks/UseTask";

export default function KanbanBoard() {
    const random = UseTask()
    const tasksByStatus = useRecoilValue(filteredTaskList);

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <KanbanColumn title="To Do" color="bg-yellow-100" tasks={tasksByStatus.TODO} />
            <KanbanColumn title="In Progress" color="bg-blue-100" tasks={tasksByStatus.IN_PROGRESS} />
            <KanbanColumn title="Done" color="bg-green-100" tasks={tasksByStatus.DONE} />
        </div>
    );
}

function KanbanColumn({ title, color, tasks }) {
    return (
        <Card className={`${color}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {tasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </CardContent>
        </Card>
    );
}