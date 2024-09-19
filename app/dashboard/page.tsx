"use client"; // Ensure this is at the top

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListIcon, LayoutIcon, MenuIcon, LogOut } from "lucide-react";
import logout from "@/actions/logout";

export default function Dashboard() {
    const [view, setView] = useState("kanban");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-2xl font-bold text-gray-900">ManageFiasco</h1>
                        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                            <MenuIcon className="h-6 w-6 text-gray-900" /> {/* Ensure toggle icon is visible */}
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
                            logout
                        </Button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden">
                <div className="flex h-16 items-center justify-center bg-white px-4 shadow-sm">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden absolute left-4">
                        <MenuIcon className="h-6 w-6 text-gray-900" /> {/* Ensure toggle icon is visible */}
                    </Button>
                    <h2 className="text-xl font-semibold text-gray-900">{view === "kanban" ? "Kanban Board" : "List View"}</h2>
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
            <KanbanColumn title="To Do" color="bg-yellow-100" />
            <KanbanColumn title="In Progress" color="bg-blue-100" />
            <KanbanColumn title="Done" color="bg-green-100" />
        </div>
    );
}

function KanbanColumn({ title, color }) {
    return (
        <Card className={`${color}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Drag and drop tasks here</p>
            </CardContent>
        </Card>
    );
}

function ListView() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Task List</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Your tasks will appear here in list format</p>
            </CardContent>
        </Card>
    );
}
