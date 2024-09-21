/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRecoilState } from 'recoil';
import { tasksState } from '@/state/taskAtom';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import TaskCard from '@/components/taskCard'; // Assuming TaskCard component exists for rendering tasks

export default function ListView() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        progress: {
            TODO: false,
            IN_PROGRESS: false,
            DONE: false,
        },
        priority: {
            LOW: false,
            MEDIUM: false,
            HIGH: false,
        },
    });

    const [tasks, setTasks] = useRecoilState(tasksState);

    const handleFilterChange = (category, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [value]: !prevFilters[category][value],
            },
        }));
    };

    // Filter tasks based on search query and filters
    const filteredTasks = tasks.filter(task => {
        const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesProgress = filters.progress[task.status];
        const matchesPriority = filters.priority[task.priority];

        const progressFilterActive = Object.values(filters.progress).some(value => value);
        const priorityFilterActive = Object.values(filters.priority).some(value => value);

        const matchesFilters =
            (!progressFilterActive || matchesProgress) &&
            (!priorityFilterActive || matchesPriority);

        return matchesSearchQuery && matchesFilters;
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Task List</CardTitle>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                className="pl-8"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <h4 className="font-medium leading-none">Filter Tasks</h4>
                                    <div className="grid gap-2">
                                        <h5 className="text-sm font-medium leading-none">Progress</h5>
                                        {Object.entries(filters.progress).map(([key, value]) => (
                                            <div key={key} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`progress-${key}`}
                                                    checked={value}
                                                    onCheckedChange={() => handleFilterChange("progress", key)}
                                                />
                                                <label htmlFor={`progress-${key}`} className="text-sm font-medium leading-none">
                                                    {key.replace("_", " ")}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid gap-2">
                                        <h5 className="text-sm font-medium leading-none">Priority</h5>
                                        {Object.entries(filters.priority).map(([key, value]) => (
                                            <div key={key} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`priority-${key}`}
                                                    checked={value}
                                                    onCheckedChange={() => handleFilterChange("priority", key)}
                                                />
                                                <label htmlFor={`priority-${key}`} className="text-sm font-medium leading-none">
                                                    {key}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardHeader>
            <CardContent>

                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            priority={task.priority}
                            dueDate={task.dueDate}
                            id={task.id}
                            setDraggedTaskId={function (id: string): void { }} />
                    ))
                ) : (
                    <p>No tasks match your criteria.</p>
                )}
            </CardContent>
        </Card>
    );
}
