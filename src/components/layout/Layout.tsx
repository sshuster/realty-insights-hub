
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Building, 
  Home, 
  LogOut, 
  Menu, 
  User, 
  BookOpen, 
  DollarSign, 
  BarChart3, 
  Users, 
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on user role
  const navItems = isAdmin
    ? [
        { label: 'Dashboard', icon: <BarChart3 size={20} />, path: '/admin-dashboard' },
        { label: 'User Management', icon: <Users size={20} />, path: '/users' },
        { label: 'Courses', icon: <BookOpen size={20} />, path: '/courses' },
        { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
      ]
    : [
        { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { label: 'Property Valuation', icon: <Building size={20} />, path: '/valuation' },
        { label: 'My Courses', icon: <BookOpen size={20} />, path: '/my-courses' },
        { label: 'Pricing', icon: <DollarSign size={20} />, path: '/pricing' },
      ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-realty-700">
                  <span className="flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    Realty Insights Hub
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 py-6">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start gap-2"
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Button
            variant="ghost"
            className="hidden md:flex items-center gap-2 text-xl font-bold text-realty-700"
            onClick={() => navigate('/')}
          >
            <Building className="h-6 w-6" />
            Realty Insights Hub
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="gap-2"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User menu */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block font-medium">
                {user.username} ({user.role})
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/login')}>
              <User className="h-5 w-5" />
              Login
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Realty Insights Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
