/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRecoilState } from 'recoil';
import { tasksState, Task } from '@/state/taskAtom';
import editTask from '@/actions/editTask';
import { Loader2 } from "lucide-react";

type EditTaskResponse =
    | { task: Task }
    | { error: string };

interface EditTaskCardProps {
    task: Task;
    onEdit: (updatedTask: Task) => void;
}

export default function EditTaskCard({ task, onEdit }: EditTaskCardProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE">(task.status);
    const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate || ''); // Default to empty string
    const [isLoading, setIsLoading] = useState(false);

    const [tasks, setTasks] = useRecoilState(tasksState);

    useEffect(() => {
        // Reset fields when task changes
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setDueDate(task.dueDate || '');
    }, [task]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const taskData = {
                title,
                description,
                status,
                priority,
                ...(dueDate ? { dueDate: new Date(dueDate).toISOString() } : {}),
            };

            const response: EditTaskResponse = await editTask(task.id, taskData);

            if ('task' in response) {
                const updatedTask = response.task;
                onEdit(updatedTask);

                setTasks((prevTasks) =>
                    prevTasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
                );

                setOpen(false);
            } else {
                console.error('Error updating task:', response.error);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-90 text-gray-900">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="title">Title</label>
                            <Input id="title" value={title} placeholder="Enter task title" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="description">Description</label>
                            <Textarea id="description" value={description} placeholder="Enter task description" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="status">Status</label>
                            <Select value={status} onValueChange={(value) => setStatus(value as "TODO" | "IN_PROGRESS" | "DONE")}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TODO">To Do</SelectItem>
                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                    <SelectItem value="DONE">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="priority">Priority</label>
                            <Select value={priority} onValueChange={(value) => setPriority(value as "LOW" | "MEDIUM" | "HIGH")}>
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="dueDate">Due Date</label>
                            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                    </div>

                    <CardFooter className="justify-end space-x-2">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
                            type="submit"
                            variant="ghost"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </div>
                            ) : (
                                "Edit Task →"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
