"use client"

import * as React from "react"
import {
    CreditCard,

    Phone,
    SquareTerminal,

    MessageCircleQuestion,
    LucideInstagram,

    UserCircle,

    StoreIcon,
    Home,
    Workflow,
} from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"


// import logo from "@/assets/favicon.svg"
import Link from "next/link"
import ROUTES from "@/shared/constants/route"
import { NavMain } from "../common/nav-main"
import { usePathname } from "next/navigation"

export function DashboardAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const pathname = usePathname();
    const withActiveFlag = (items: any[]) =>
        items.map((item) => {
            const isRoot = item.url === "/app";

            return {
                ...item,
                isActive: isRoot
                    ? pathname === "/" // Dashboard ONLY active on "/"
                    : pathname === item.url || pathname.startsWith(item.url + "/"),
            };
        });
    const data = {
        IconTitle: [
            {
                title: "Pragati360",
                url: ROUTES.APP.ROOT,
                icon: SquareTerminal, // keeps that “tech platform” feel
                // isActive: true,
            },
        ],

        Overview: [
            {
                title: "Business",
                url: ROUTES.APP.ROOT,
                icon: Home,
                // isActive: true,
            },
        ],

        navMain: [


            {
                title: "Outlets",
                url: ROUTES.APP.BUSINESS.ROOT,
                icon: StoreIcon, // chat-style, instantly clear
            },

            {
                title: "Instagram",
                url: ROUTES.APP.INSTAGRAM.ROOT,
                icon: LucideInstagram, // chat-style, instantly clear
            },


            {
                title: "Subscriptions",
                url: ROUTES.APP.SUBSCRIPTION.ROOT,
                icon: CreditCard, // payment-related
            },
            {
                title: "Integrations",
                url: ROUTES.APP.INTEGRATIONS,
                icon: Workflow,
            },
            {
                title: "Account",
                url: ROUTES.APP.ACCOUNT,
                icon: UserCircle, // standard and clean
            },
        ],

        support: [
            {
                title: "Contact",
                url: ROUTES.APP.CONTACT,
                icon: Phone, // simpler & clearer than PhoneCall for general support
            },
            {
                title: "FAQs",
                url: ROUTES.APP.FAQs,
                icon: MessageCircleQuestion,
            },
        ],
    };


    return (
        <Sidebar collapsible="icon" {...props} variant="inset" className="h-screen overflow-hidden " >
            <SidebarHeader className="mx-0 px-0 ">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild>
                                <Link href={'/dashboard'} className="flex items-center gap-2">
                                    {/* <img src={logo} height={25} width={25} alt={""} /> */}

                                    <span className="text-xl font-semibold text-blue-600">Pragati360</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent className="">


                <NavMain items={withActiveFlag(data.Overview)} menuTitle="Overview" />
                <NavMain items={withActiveFlag(data.navMain)} menuTitle="Menus" />
                <NavMain items={withActiveFlag(data.support)} menuTitle="Support" />
            </SidebarContent>



        </Sidebar>
    )
}
