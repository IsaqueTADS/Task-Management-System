import * as React from "react";

import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/context/user-context";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData } = useUser();

  console.log(userData)

  if(!userData) return null;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={userData.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
           
            <div className="flex justify-between">
              <Button variant="outline">
                <Link to={"/signup"}>Cadastrar-se</Link>
              </Button>
              <Button>
                <Link to={"/login"}>logar</Link>
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
