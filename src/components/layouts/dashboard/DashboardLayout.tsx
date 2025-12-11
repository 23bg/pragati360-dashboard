"use client";

import Link from "next/link";
import {
    HelpCircle,
    Moon,
    Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardAppSidebar } from "@/components/dashboard/side-bar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import ROUTES from "@/shared/constants/route";
import { useEffect } from "react";
import { useRouter } from "next/router";



export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken");
    //     if (!token) {
    //         router.replace(ROUTES.AUTH.LOG_IN)
    //     }
    // }, [router]);


    return (
        <div className="bg-blue-600">
            <SidebarProvider className="rounded overflow-hidden h-screen">
                <DashboardAppSidebar />
                <SidebarInset className="border shadow-xl  bg-zinc-50">
                    {/* Header */}
                    <header className="flex h-16 shrink-0 items-center justify-between px-4
      border-b bg-background dark:bg-zinc-900/40 backdrop-blur-sm rounded-t-2xl">
                        {/* Left: Sidebar + Breadcrumb */}
                        <div className="flex items-center gap-2 justify-center">
                            <Button size="icon" className="rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-blue-600 " variant="outline" >
                                <SidebarTrigger />
                            </Button>




                        </div>



                        {/* Right: Controls */}
                        <div className="flex items-center gap-3">

                            <Button variant='outline' className="text-muted-foreground hover:text-white hover:bg-blue-600 bg-muted rounded-full m-0 px-10 ">
                                <Search />
                                <span className="pr-12"> Type of Search...</span>
                            </Button>

                            <TooltipProvider delayDuration={150}>


                                {/* Help Button */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" className="rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-blue-600 " variant="outline" >
                                            <Moon className="h-5 w-5 " />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Help & Support</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={150}>


                                {/* Help Button */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" className="rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-blue-600 " variant="outline" >
                                            <HelpCircle className="h-5 w-5 " />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Help & Support</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>



                        </div>
                    </header>

                    {/* Main content */}
                    <main className="overflow-hidden ">


                        <div className="h-screen">
                            <ScrollArea className=" h-full">
                                {children}
                            </ScrollArea>
                        </div>


                    </main>
                    {/* FOOTER */}
                    <footer className="border-t bg-background dark:bg-zinc-900/40 backdrop-blur-sm rounded-b-2xl">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-6 py-3 text-xs text-muted-foreground">
                            <span>©2025 Pragati360, Made for better you brand.</span>
                            <div className="flex gap-3">
                                <Link href="#" className="hover:text-primary transition">License</Link>
                                <Link href="#" className="hover:text-primary transition">More Themes</Link>
                                <Link href="#" className="hover:text-primary transition">Documentation</Link>
                                <Link href="#" className="hover:text-primary transition">Support</Link>
                            </div>
                        </div>
                    </footer>
                </SidebarInset>

            </SidebarProvider >
        </div>
    );
}

