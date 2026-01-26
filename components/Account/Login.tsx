'use client';
import React, { useState } from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { Eye, Key, Mail, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn, signInSocial } from '@/lib/actions/auth-actions';

const Login = ({ session }: { session: any }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialAuth = async (provider: 'google') => {
    setLoading(true);
    setMessage('');

    try {
      await signInSocial(provider);
    } catch (err) {
      setMessage(
        `Error authenticating with ${provider}: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('⚠️ Please enter both email and password.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await signIn(email, password);
      if (result?.user) {
        setMessage('🎉 Login successful! Redirecting...');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessage('❌ Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      setMessage('⚠️ Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Header session={session} />
      </div>
      <div className="container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="account-details">
            <h2>Log In</h2>
            <p className="subtitle">Please check that you are visiting the correct URL:</p>
            <div className="secure-url">
              <span className="lock-icon">🔒</span>
              <Link href="https://www.fybit.app" target="_blank">
                <span className="scheme">https://</span>
                <span className="text-gray-200">fybit.app</span>
              </Link>
            </div>
            <label>Email</label>
            <div className="icon-wrapper">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300  rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
                placeholder="@mail.com"
                autoComplete="on"
              />
              <span className="input-icon">
                <Mail />
              </span>
            </div>

            {/*
            <label>Password</label>
            <div className="password-wrapper">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300  rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
                placeholder="Enter your password"
                type="password"
                autoComplete="off"
              />
              <span className="toggle-password">
                <Eye />
              </span>
            </div>
            */}

            <label>Password</label>
            <div className="relative flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
              />

              <span
                className="absolute right-3 cursor-pointer text-gray-600 hover:text-yellow-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>

            <label className="">
              <input type="checkbox" className="mr-2" />
              <span>Keep me signed in on this computer</span>
            </label>

            <input type="hidden" />
            <button className="change-button" type="submit">
              {loading ? 'Loggin in...' : 'Log In'}
            </button>

            {message && <p className="text-center mt-3 font-semibold text-[#50D2C1]">{message}</p>}

            <p className="forgot-link text-[#50D2C1] hover:text-yellow-600">
              <Link href="/Account/ForgotPassword">
                <span className="forgot-link">Forgot your password?</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
