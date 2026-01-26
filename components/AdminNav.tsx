'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function AdminNav() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (admin) {
      const adminData = JSON.parse(admin);
      setAdminEmail(adminData.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/admin/login');
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/trades', label: 'Trades' },
    { href: '/admin/kyc', label: 'KYC' },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="bg-[#0a0a0a] border-b border-gray-800 shadow-lg">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image
                src="/images/FYBIT_white_horizontal.png"
                alt="Fybit Admin Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-sm font-semibold text-[#50D2C1] bg-[#50D2C1]/10 px-2 py-1 rounded">
                Admin
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className=" md:flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-[#50D2C1] text-black shadow-sm'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-[#50D2C1]" />
              )}
            </button>

            {/* Admin dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-[#50D2C1] rounded-full flex items-center justify-center text-black font-semibold text-sm shadow-sm">
                  {adminEmail ? adminEmail.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="hidden sm:block text-sm text-gray-300">{adminEmail}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
                    Admin Account
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setShowMobileMenu(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-[#50D2C1] text-black'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
