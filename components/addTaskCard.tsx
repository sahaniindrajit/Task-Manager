import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";

export default function AddTaskCard() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Create the task payload
            const taskData = {
                title,
                description,
                status,
                priority
            };

            // Only include dueDate if it's provided
            if (dueDate) {
                taskData.dueDate = new Date(dueDate);
            }

            const response = await axios.post('http://localhost:3000/api/task', taskData);

            console.log('Response:', response.data);
            setOpen(false);
        } catch (error) {
            console.error('Error submitting task:', error);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-90 text-gray-900"> {/* Set background opacity and text color */}
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="title">Title</label>
                            <Input id="title" placeholder="Enter task title" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="description">Description</label>
                            <Textarea id="description" placeholder="Enter task description" onChange={(e) => setDescription(e.target.value)} />
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
                            <Input id="dueDate" type="date" onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                    </div>
                    <CardFooter className="justify-end space-x-2">
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Task</Button>
                    </CardFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
