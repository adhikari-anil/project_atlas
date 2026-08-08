"use client";

import { ChevronRight } from "lucide-react";

const settingsSections = [
  {
    title: "General",
    settings: [
      { label: "Language", value: "English" },
      { label: "Timezone", value: "UTC-5" },
      { label: "Date Format", value: "MM/DD/YYYY" },
    ],
  },
  {
    title: "Display",
    settings: [
      { label: "Theme", value: "Light" },
      { label: "Sidebar", value: "Expanded" },
      { label: "Compact Mode", value: "Off" },
    ],
  },
  {
    title: "Workspace",
    settings: [
      { label: "Default Organization", value: "Tech Startup" },
      { label: "Default Project", value: "Website Redesign" },
      { label: "Auto-save Interval", value: "30 seconds" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          Customize your experience
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-6 bg-card"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {section.title}
            </h2>

            <div className="space-y-3">
              {section.settings.map((setting, settingIdx) => (
                <button
                  key={settingIdx}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors border border-border flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {setting.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {setting.value}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* API Settings */}
      <div className="border border-border rounded-lg p-6 bg-card mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          API & Integrations
        </h2>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors border border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              API Keys
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors border border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Connected Apps
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors border border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Webhooks
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
