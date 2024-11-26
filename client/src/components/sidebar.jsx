import Link from "next/link"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

// Menu items.


export function AppSidebar(props) {
  return (
    <Sidebar>
      <SidebarContent className="backdrop-blur-sm bg-[#2e3192] p-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl text-white mb-[30px]">Lama Store</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-white">
              {props.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}