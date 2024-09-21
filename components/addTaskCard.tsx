import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRecoilState } from 'recoil';
import { tasksState, Task } from '@/state/taskAtom';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';

export default function AddTaskCard() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const [tasks, setTasks] = useRecoilState(tasksState);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        setIsLoading(true);

        event.preventDefault();

        try {
            // Task data
            const taskData = {
                title,
                description,
                status,
                priority,
                ...(dueDate && dueDate !== '' ? { dueDate: new Date(dueDate).toISOString() } : {})
            };


            const response = await axios.post('/api/task', taskData);

            //for formating date
            const newTask: Task = {
                ...response.data,
                dueDate: response.data.dueDate
                    ? (() => {
                        const date = new Date(response.data.dueDate);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                        const year = date.getFullYear(); // Full year
                        return `${day}-${month}-${year}`;
                    })()
                    : null
            };



            setTasks([...tasks, newTask]);

            setTitle('');
            setDescription('');
            setStatus('');
            setPriority('');
            setDueDate('');
            setOpen(false);

        } catch (error) {
            console.error('Error submitting task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-90 text-gray-900">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
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
                            <Select onValueChange={(value) => setStatus(value)}>
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
                            <Select onValueChange={(value) => setPriority(value)}>
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
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex items-center justify-center"
                            type="submit"
                            variant="ghost"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...

                                </div>
                            ) : (
                                "Add Task →"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}