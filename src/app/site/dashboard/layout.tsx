"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Store, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon, label, isActive, isCollapsed }: SidebarLinkProps) => (
  <Link href={href}>
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive behavior - collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/site/dashboard", icon: <BarChart3 size={20} />, label: "Overview" },
    { href: "/site/dashboard/stores", icon: <Store size={20} />, label: "Stores" },
    { href: "/site/dashboard/products", icon: <ShoppingBag size={20} />, label: "Products" },
    { href: "/site/dashboard/users", icon: <Users size={20} />, label: "Customers" },
    { href: "/site/dashboard/orders", icon: <CreditCard size={20} />, label: "Orders" },
    { href: "/site/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r transition-all duration-300 ease-in-out md:relative",
          isCollapsed ? "w-16" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center gap-2">
            {!isCollapsed && <span className="text-xl font-bold text-primary">BuildAI</span>}
            {isCollapsed && <span className="text-xl font-bold text-primary">B</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:flex hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronRight className={`h-5 w-5 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
          </Button>
          {/* Mobile close button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden flex"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t">
            <SidebarLink
              href="/site/dashboard/help"
              icon={<HelpCircle size={20} />}
              label="Help & Support"
              isActive={pathname === "/site/dashboard/help"}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top navigation */}
        <header className="h-16 flex items-center justify-between px-4 border-b bg-white">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center ml-auto gap-4">
            <div className="text-right mr-4">
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-xs text-muted-foreground">Premium Plan</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">JS</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
