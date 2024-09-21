import { Loader2 } from "lucide-react";

export default function Loading() {
    return <div>
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="text-lg">Loading...</span>
        </div>
    </div>
}