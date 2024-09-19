"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input"
import { ListIcon, LayoutIcon, MenuIcon, LogOut, Search, Filter } from "lucide-react";
import logout from "@/actions/logout";
import TaskCard from '@/components/taskCard';
import AddTaskCard from '@/components/addTaskCard';
import UseTask from '@/custom Hooks/UseTask';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"


export default function Dashboard() {

    const [view, setView] = useState("kanban");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            <aside
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-2xl font-bold text-gray-900">ManageFiasco</h1>
                        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                            <MenuIcon className="h-6 w-6 text-gray-900" />
                        </Button>
                    </div>
                    <nav className="flex-1 space-y-2 p-4">
                        <Button
                            variant={view === "list" ? "default" : "ghost"}
                            className={`w-full justify-start ${view === "list" ? "text-white" : "text-gray-600 hover:text-gray-900"}`}
                            onClick={() => setView("list")}
                        >
                            <ListIcon className="mr-2 h-4 w-4" />
                            List View
                        </Button>
                        <Button
                            variant={view === "kanban" ? "default" : "ghost"}
                            className={`w-full justify-start ${view === "kanban" ? "text-white" : "text-gray-600 hover:text-gray-900"}`}
                            onClick={() => setView("kanban")}
                        >
                            <LayoutIcon className="mr-2 h-4 w-4" />
                            Kanban Board
                        </Button>
                        <Button
                            variant={view === "logout" ? "default" : "ghost"}
                            className={`w-full justify-start text-gray-600 hover:text-gray-900`}
                            onClick={async () => {
                                await logout();
                                router.push('/')
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 overflow-hidden">
                <div className="flex h-16 items-center justify-between bg-white px-4 shadow-sm">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                        <MenuIcon className="h-6 w-6 text-gray-900" />
                    </Button>

                    <h2 className="text-xl font-semibold text-gray-900">{view === "kanban" ? "Kanban Board" : "List View"}</h2>
                    <div className="flex items-center space-x-2">
                        <AddTaskCard />

                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-4rem)] p-4">
                    {view === "kanban" ? <KanbanBoard /> : <ListView />}
                </ScrollArea>
            </main>
        </div>
    );
}

function KanbanBoard() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <KanbanColumn title="To Do" color="bg-yellow-100" content={<UseTask status='TODO' />} />
            <KanbanColumn title="In Progress" color="bg-blue-100" content={<UseTask status='IN_PROGRESS' />} />
            <KanbanColumn title="Done" color="bg-green-100" content={<UseTask status='DONE' />} />

        </div>
    );
}

function KanbanColumn({ title, color, content }) {
    return (
        <Card className={`${color}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    );
}

function ListView() {
    const [searchQuery, setSearchQuery] = useState("")
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
    })

    const handleFilterChange = (category, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [value]: !prevFilters[category][value],
            },
        }))
    }

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
                                                <label htmlFor={`progress-${key}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                                                <label htmlFor={`priority-${key}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                <TaskCard
                    title="Complete Project"
                    description="Finish up the remaining tasks"
                    status="TODO"
                    priority="HIGH"
                    dueDate={new Date('2024-09-30')}
                />
            </CardContent>
        </Card>
    )
}