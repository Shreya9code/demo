import React from "react";
import {AppSidebar} from "./_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelComeContainer from "./dashboard/_components/WelComeContainer";

function DashboardProvider({ children }) {
  console.log("DashboardProvider loaded");
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>{/*<SidebarTrigger/>*/}<WelComeContainer/>
      {children}</div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
