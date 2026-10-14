import { Sidebar } from "@/components/dashboard/Sidebar";

type Props = {
    children: React.ReactNode;
}

export default function DashboardLayout({children}: Props){
    return(
        <div className="w-full flex justify-between items-start min-h-svh">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    )
}