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

interface EditTaskCardProps {
    task: Task;
    onEdit: (updatedTask: Task) => void; // Updated prop for handling the edit
}

export default function EditTaskCard({ task, onEdit }: EditTaskCardProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate || '');

    const [tasks, setTasks] = useRecoilState(tasksState);

    useEffect(() => {
        // Reset fields when task changes
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setDueDate(task.dueDate || '');
    }, [task]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const taskData = {
                title,
                description,
                status,
                priority,
                ...(dueDate && dueDate !== '' ? { dueDate: new Date(dueDate).toISOString() } : {}) // Only include dueDate if it has a value
            };

            // Call the editTask function
            const response = await editTask(task.id, taskData);
            if (response.error) {
                throw new Error(response.error);
            }
            const updatedTask = response.task;

            // Call the onEdit prop to update the task in the parent component
            onEdit(updatedTask);

            // Optionally update the local state if needed
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
            );

            setOpen(false);
        } catch (error) {
            console.error('Error updating task:', error);
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
                            <Select value={status} onValueChange={(value) => setStatus(value)}>
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
                            <Select value={priority} onValueChange={(value) => setPriority(value)}>
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
                        <Button type="submit">Update Task</Button>
                    </CardFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
