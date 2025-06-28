"use client"
import { SideBarOptions } from "@/app/services/Constants"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const path=usePathname()
  return (
    <Sidebar>
      <SidebarHeader >
        <Image src={"/logo.jpg"} alt="Logo" width={200} height={140} className="mx-auto" />
        <h1 className="text-center text-2xl font-bold">AI Interview Scheduler</h1>
        <p className="text-center text-sm text-gray-500">Schedule your interviews with ease</p>
        <Button><Plus/>Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option,index)=>(
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={option.path} className="flex items-center">
                    <option.icon className="h-5 w-5" />
                    <span className="ml-2">{option.name}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}