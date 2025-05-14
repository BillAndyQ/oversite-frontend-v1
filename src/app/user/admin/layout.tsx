import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) { 
    return (
        <div className="">
            <SidebarProvider>
                <Sidebar/>
                <SidebarInset>
                    <div className="flex min-h-screen bg-white md:background-es flex-col">
                    {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}