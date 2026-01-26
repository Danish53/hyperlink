'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import Image from 'next/image';
import { Eye, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) throw new Error('Please enter both email and password.');

      if (email === 'admin@fybit.com' && password === 'admin123') {
        localStorage.setItem('admin', JSON.stringify({ email, role: 'admin' }));
        router.push('/admin');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <Card className="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-xl ">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Image
              src="/images/FYBIT_black_horizontal.png"
              width={120}
              height={40}
              alt="Fybit Logo"
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-1">Admin Login</h2>
          <p className="text-gray-400 text-sm">
            Please check that you are visiting the correct URL:
          </p>

          <div className="flex items-center justify-center gap-1 mt-1 text-sm">
            <span className="text-[#50D2C1]">🔒</span>
            <a
              href="https://www.fybit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#50D2C1]"
            >
              <span className="text-[#50D2C1]">https://</span>fybit.app
            </a>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-700 bg-[#111] text-white placeholder-gray-500 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all"
                required
              />
              <Mail className="absolute right-3 top-3 text-gray-500" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-700 bg-[#111] text-white placeholder-gray-500 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-[#50D2C1]"
              >
                <Eye size={18} />
              </span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-900/40 border border-red-700 rounded-md text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-[#50D2C1] hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition-all shadow-md shadow-[#50D2C1]/20"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </Button>

          {/* Forgot password */}
          <p className="text-center mt-3 text-[#50D2C1] hover:text-yellow-600 text-sm">
            <a href="/Account/ForgotPassword">Forgot your password?</a>
          </p>
        </form>

        {/* Demo info */}
        <div className="mt-8 p-4 bg-[#111] border border-gray-700 rounded-md text-center">
          <p className="text-xs text-gray-400">
            Demo credentials: <span className="text-[#50D2C1]">admin@fybit.com</span> /{' '}
            <span className="text-[#50D2C1]">admin123</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
