import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CheckSquare, Home, Settings, ShoppingBag } from "lucide-react"
const adminItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Product",
    url: "product",
    icon: ShoppingBag,
  },
  {
    title: "Approval",
    url: "approval",
    icon: CheckSquare,
  },
  {
    title: "Settings",
    url: "setting",
    icon: Settings,
  },
]
export default function Layout({ children }) {
  return (
    <SidebarProvider  className="dark w-full">
      <AppSidebar items={adminItems} />
      <main  className="w-[100%]">
        <SidebarTrigger />
        <div className="mx-12">
        {children}
        </div>
     
      </main>
    </SidebarProvider>
  )
}