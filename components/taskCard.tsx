import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
    title: string;
    description: string;
    progress: "TODO" | "IN_PROGRESS" | "DONE"; // Add 'progress'
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: Date;
}

export default function TaskCard({
    title,
    description,
    progress, // Add 'progress' here
    priority,
    dueDate,
}: TaskCardProps) {

    const priorityColors = {
        LOW: "bg-green-500",
        MEDIUM: "bg-yellow-500",
        HIGH: "bg-red-500"
    };

    const progressColors = {
        TODO: "bg-gray-500",
        IN_PROGRESS: "bg-blue-500",
        DONE: "bg-green-500"
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
                <Badge
                    variant="outline"
                    className={`${progressColors[progress]} text-white capitalize`}
                >
                    {progress}
                </Badge>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <Badge variant="outline" className="flex items-center space-x-1">
                        <Circle className={`h-2 w-2 ${priorityColors[priority]}`} />
                        <span>{priority}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                        <Circle className="h-2 w-2 bg-gray-500" />
                        <span>Due {formatDate(dueDate)}</span>
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
