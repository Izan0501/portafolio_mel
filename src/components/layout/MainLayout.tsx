import type { ReactNode } from 'react';
import { FloatingNavbar } from './FloatingNavbar';

type NavView = "about" | null;

interface MainLayoutProps {
  children: ReactNode;
  onNavigate?: (view: NavView) => void;
  currentView?: string;
}

export function MainLayout({ children, onNavigate, currentView }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-clip">
      <FloatingNavbar onNavigate={onNavigate} currentView={currentView} />
      <main>{children}</main>
    </div>
  );
}
