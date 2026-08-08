export interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export interface LoadingStateProps {
  text?: string;
}

export interface BadgeProps {
  variant?: "default" | "secondary" | "outline";
  status?: string;
  priority?: string;
  children: React.ReactNode;
}
