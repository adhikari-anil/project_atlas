"use client";

import { Lock, CheckCheck, Bell, Shield } from "lucide-react";

interface ProfileDetail {
  id: string;
  email: string;
  status: "ACTIVE" | "DEACTIVATED" | "SUSPENDED" | "PENDING";
  createdAt: Date;
  updatedAt: Date;
  username: string | null;
  passwordHash: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  emailVerifiedAt: Date | null;
}
interface ProfileDetails {
  profile: ProfileDetail;
}
export default function ProfileDetalsPage({ profile }: ProfileDetails) {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          Manage your account settings
        </p>
      </div>

      {/* Profile Section */}
      <div className="border border-border rounded-lg p-6 bg-card mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Account Information
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-linear-to-br from-blue-400 to-blue-600"></div>
            <div>
              <button className="text-sm px-3 py-1 bg-accent hover:bg-accent/80 text-foreground rounded transition-colors">
                Change Avatar
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={`${profile.firstName} ${profile.lastName}`}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                defaultValue={profile.email}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {profile.emailVerifiedAt ? (
                <p className="border bg-black text-white rounded-md p-2">
                  <CheckCheck />
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Account Status
            </label>
            <input
              type="text"
              defaultValue={profile.status}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
            Save Changes
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="border border-border rounded-lg p-6 bg-card mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h2>

        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors border border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Change Password
            </span>
            <span className="text-xs text-muted-foreground">→</span>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors border border-border flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Two-Factor Authentication
            </span>
            <span className="text-xs text-muted-foreground">Not enabled</span>
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="border border-border rounded-lg p-6 bg-card mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm text-foreground">
              Email notifications for project updates
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm text-foreground">
              Email notifications for task assignments
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-sm text-foreground">
              Weekly digest summary
            </span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
        <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Danger Zone
        </h2>

        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          Delete Account
        </button>
      </div>
    </div>
  );
}
