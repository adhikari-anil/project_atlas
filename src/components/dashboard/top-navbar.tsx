"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, LogOut, Settings } from "lucide-react";
import { logoutUserAction } from "@/actions";

function getBreadcrumb(path: string) {
  if (path === "/dashboard") return "Dashboard";
  if (path === "/dashboard/organizations") return "Organizations";
  if (path === "/dashboard/projects") return "Projects";
  if (path === "/dashboard/profile") return "Profile";
  if (path === "/dashboard/setting") return "Setting";
  else return "Tasks";
}

export function TopNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClick = async () => {
    await logoutUserAction();
    router.push("/login");
  };
  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm text-muted-foreground">Home</span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm font-medium text-foreground">
            {getBreadcrumb(pathname)}
          </span>
        </div>

        {/* Center - Search (hidden on mobile, visible on tablet+) */}
        <div className="hidden md:flex flex-1 max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Notification button */}
          <button className="p-2 hover:bg-accent rounded-lg transition-colors relative group">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            <div className="opacity-0 group-hover:opacity-100 absolute top-full mt-2 right-0 bg-popover border border-border rounded-lg px-2 py-1 text-xs whitespace-nowrap text-popover-foreground pointer-events-none transition-opacity">
              3 notifications
            </div>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600" />
              <span className="hidden md:inline text-sm font-medium text-foreground">
                JD
              </span>
            </button>

            {/* Dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">
                    John Doe
                  </p>
                  <p className="text-xs text-muted-foreground">
                    john@example.com
                  </p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-accent text-sm text-popover-foreground flex items-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-accent text-sm text-popover-foreground flex items-center gap-2 transition-colors border-t border-border"
                  onClick={handleClick}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </header>
  );
}
