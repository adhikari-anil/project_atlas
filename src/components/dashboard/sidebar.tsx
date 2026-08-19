"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  User,
  Settings,
  ChevronLeft,
  Menu,
  Users,
  FolderKanban,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Organizations", href: "/dashboard/organizations", icon: Building2 },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/setting", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOrganizationsOpen, setIsOrganizationsOpen] = useState(false);

  const pathname = usePathname();

  const params = useParams();

  const orgId = params.organizationId as string | undefined;

  const isOrganizationActive =
    pathname === `/dashboard/organizations/${orgId}` ||
    pathname.startsWith(`/dashboard/organizations/${orgId}`);

  const organizationOpen =
    isOrganizationsOpen && Boolean(orgId && isOrganizationActive);

  const organizationChildren = orgId
    ? [
        {
          name: "Projects",
          href: `/dashboard/organizations/${orgId}/projects`,
          icon: FolderKanban,
        },
        {
          name: "Members",
          href: `/dashboard/organizations/${orgId}/members`,
          icon: Users,
        },
      ]
    : [];

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-sidebar-accent rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen
          bg-sidebar border-r border-sidebar-border
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64 lg:w-64"}
          z-40 lg:z-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sm font-bold text-sidebar-primary-foreground">
                  PM
                </span>
              </div>
              <span className="font-semibold text-sidebar-foreground">
                ProjectHub
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1.5 hover:bg-sidebar-accent rounded-lg ml-auto"
          >
            <ChevronLeft
              className={`w-4 h-4 text-sidebar-foreground transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;

            if (item.name === "Organizations") {
              return (
                <div key={item.name}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (!isCollapsed) {
                          setIsOrganizationsOpen(true);
                        }
                      }}
                      className={`
                        flex-1
                        flex items-center
                        gap-3
                        px-3 py-2
                        rounded-lg
                        transition-colors duration-200
                        ${
                          isOrganizationActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />

                      {!isCollapsed && (
                        <span className="text-sm">{item.name}</span>
                      )}
                    </Link>
                    {!isCollapsed && (
                      <button
                        type="button"
                        onClick={() =>
                          setIsOrganizationsOpen((previous) => !previous)
                        }
                        className="
                          p-2
                          rounded-lg
                          text-sidebar-foreground
                          hover:bg-sidebar-accent/50
                          transition-colors
                        "
                        aria-label="Toggle organizations menu"
                      >
                        {isOrganizationActive && (
                          <ChevronDown
                            className={`
                            w-4 h-4
                            transition-transform
                            duration-200
                            ${organizationOpen ? "rotate-180" : ""}
                          `}
                          />
                        )}
                      </button>
                    )}
                  </div>

                  {!isCollapsed && orgId && (
                    <div
                      className={`
                        overflow-hidden
                        transition-all
                        duration-200
                        ${
                          organizationOpen
                            ? "max-h-40 opacity-100 mt-1"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div
                        className="
                          ml-5
                          pl-4
                          border-l
                          border-sidebar-border
                          space-y-1
                        "
                      >
                        {organizationChildren.map((child) => {
                          const ChildIcon = child.icon;

                          const isChildActive =
                            pathname === child.href ||
                            pathname.startsWith(child.href + "/");

                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`
                                flex
                                items-center
                                gap-3
                                px-3 py-2
                                rounded-lg
                                text-sm
                                transition-colors
                                ${
                                  isChildActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                                }
                              `}
                            >
                              <ChildIcon className="w-4 h-4 shrink-0" />

                              <span>{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 shrink-0" />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  john@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
