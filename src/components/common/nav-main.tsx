"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  menuTitle,
  items,
}: {
  menuTitle: string,
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    collapsible?: boolean // <-- new flag
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{menuTitle}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // If collapsible is false OR there are no sub-items, render a simple link
          if (!item.collapsible || !item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`hover:rounded-full hover:text-white hover:bg-blue-600 text-muted-foreground 
          ${item.isActive ? "rounded-full text-white bg-blue-600" : ""}`}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="shrink-0" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          // Otherwise render a collapsible group
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible "
            >
              <SidebarMenuItem  >
                <CollapsibleTrigger asChild className="hover:bg-blue-600 hover:text-white rounded-full" >
                  <SidebarMenuButton tooltip={item.title} className={`
    rounded-full
    group-data-[state=open]/collapsible:bg-blue-600
    group-data-[state=open]/collapsible:text-white
  `} >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent >
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild className="hover:bg-blue-600 hover:text-white rounded-full">
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
