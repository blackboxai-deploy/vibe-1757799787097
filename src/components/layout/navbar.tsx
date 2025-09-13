'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Demo user - in real app this would come from session
  const demoUser = {
    name: 'Demo Student',
    email: 'student@university.edu',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'STUDENT'
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">UniFund</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/campaigns" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Browse Campaigns
            </Link>
            <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              About
            </Link>
          </div>

          {/* User Menu and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <>
              <Link href="/campaigns/create">
                <Button className="hidden sm:inline-flex bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                  Start Campaign
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={demoUser.image} alt={demoUser.name} />
                      <AvatarFallback className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700">
                        {demoUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{demoUser.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-600 dark:text-gray-400">
                        {demoUser.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Demo Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-4 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-4 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-4 h-0.5 bg-gray-600 dark:bg-gray-400 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-3">
            <Link 
              href="/campaigns" 
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Campaigns
            </Link>
            <Link 
              href="/categories" 
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/campaigns/create"
              className="block pt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                Start Campaign
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}