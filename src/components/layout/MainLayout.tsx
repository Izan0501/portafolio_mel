import type { ReactNode } from 'react';
import { FloatingNavbar } from './FloatingNavbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-clip">
      <FloatingNavbar/>
      <main>{children}</main>
    </div>
  );
}
