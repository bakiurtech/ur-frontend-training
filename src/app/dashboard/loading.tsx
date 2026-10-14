import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return(
        <div className="w-full h-svh flex justify-center items-center">
            <LoaderCircle strokeWidth={3} className="animate-spin w-8 h-8"/>
        </div>
    )
}