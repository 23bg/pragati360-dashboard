"use client"

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
    BellRing, // For Alerts
    Activity, // For Activity & Logs
    ShieldCheck, // For Account Security
    HardDrive, // For Account Devices
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
            {
                title: "Alerts",
                url: ROUTES.APP.ALERTS,
                icon: BellRing,
            },
            {
                title: "Activity & Logs",
                url: ROUTES.APP.ACTIVITY_LOGS,
                icon: Activity,
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
        ],

        account: [
            {
                title: "Profile",
                url: ROUTES.APP.ACCOUNT,
                icon: UserCircle,
            },
            {
                title: "Security",
                url: ROUTES.APP.ACCOUNT_SECURITY,
                icon: ShieldCheck,
            },
            {
                title: "Devices",
                url: ROUTES.APP.ACCOUNT_DEVICES,
                icon: HardDrive,
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
                            <SidebarMenuButton >
                                <Link href={ROUTES.APP.ROOT} className="flex items-center gap-2">
                                    <span className="text-xl font-semibold text-blue-600">Pragati360</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent className="">


                <NavMain items={withActiveFlag(data.Overview)} menuTitle="Overview" />
                <NavMain items={withActiveFlag(data.navMain)} menuTitle="Modules" />
                <NavMain items={withActiveFlag(data.account)} menuTitle="Account" />
                <NavMain items={withActiveFlag(data.support)} menuTitle="Support" />
            </SidebarContent>
        </Sidebar>
    )
}
