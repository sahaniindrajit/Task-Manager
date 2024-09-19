import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, Edit, Trash2 } from "lucide-react";

interface TaskCardProps {
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: Date | null;
}

export default function TaskCard({
    title,
    description,
    status,
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

    const formatDate = (date: Date | null) => {
        if (!date || !(date instanceof Date)) {
            return "Not yet due";
        }
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };


    return (
        <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto my-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
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
                        <span className="text-sm">Due {formatDate(dueDate)}</span>
                    </Badge>
                </div>
            </CardContent>
            <div className="flex justify-end space-x-2 p-2">
                <Button variant="outline" size="sm" className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </div>
        </Card>
    );
}
