'use client';
import React, { useState } from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/actions/auth-actions';
import { createWallets } from '@/lib/actions/wallet-action';

const Register = ({ session }: { session: any }) => {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!fullname || !email || !password || !confirmPassword) {
      setMessage('⚠️ Please fill all the fields.');
      return;
    }

    if (password.length < 8) {
      setMessage('⚠️ Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('⚠️ Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const result = await signUp(email, password, fullname);

      if (result?.user) {
        await createWallets(email, fullname);
        setMessage('🎉 Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/Account/Login');
        }, 2000);
      } else {
        setMessage('⚠️ Failed to register. Please try again.');
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message || 'Error creating account.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header session={session} />

      <div className="account-details">
        <h2>Sign Up</h2>
        <p className="note">
          To complete registration, you need to click on the confirmation link sent to your email.
        </p>

        <form onSubmit={handleRegister}>
          <label>Full name</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <label>Email</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label>Create a password</label>
          <div className="relative flex items-center">
            <input
              className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 cursor-pointer text-gray-600 hover:text-yellow-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {/* 🔥 Password rule warning */}
          {password.length > 0 && password.length < 8 && (
            <p className="text-red-500 text-sm -mt-1 mb-2">
              Password must be at least 8 characters long.
            </p>
          )}

          {/* Confirm Password */}
          <label>Confirm your password</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <span
              className="absolute right-3 cursor-pointer text-gray-600 hover:text-yellow-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="terms" />
            <span>
              I agree to the{' '}
              <Link className="text-[#50D2C1]" href="/Terms">
                Terms
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button type="submit" className="change-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {message && <p className="text-center mt-3 font-semibold text-[#50D2C1]">{message}</p>}
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

/*

'use client';
import React, { useState } from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/actions/auth-actions';
import { createWallets } from '@/lib/actions/wallet-action';

const Register = ({ session }: { session: any }) => {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!fullname || !email || !password || !confirmPassword) {
      setMessage('⚠️ Please fill all the fields.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('⚠️ Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const result = await signUp(email, password, fullname);

      if (result?.user) {
        await createWallets(email, fullname);
        setMessage('🎉 Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/Account/Login');
        }, 2000);
      } else {
        setMessage('⚠️ Failed to register. Please try again.');
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message || 'Error creating account.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Header session={session} />
      </div>
      <div className="account-details">
        <h2>Sign Up</h2>
        <p className="note">
          To complete registration, you need to click on the confirmation link that was sent to the
          email.
        </p>
        <form onSubmit={handleRegister}>
          <label>Full name</label>
          <input
            className="border border-gray-300  rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label>Email</label>
          <input
            className="border border-gray-300  rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Create a password</label>
          <div className="relative flex items-center">
            <input
              className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 cursor-pointer text-gray-600 hover:text-yellow-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <label>Confirm your password</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-600 my-1"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-3 cursor-pointer text-gray-600 hover:text-yellow-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <label className="">
            <input type="checkbox" name="terms" className="" />
            <span> I have read and agree to the </span>
            <Link className="text-[#50D2C1]" href="/Terms">
              <span className="text-[#50D2C1]">Terms</span>
            </Link>
          </label>

          <input type="hidden" name="timestamp" />
          <button type="submit" className="change-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {message && <p className="text-center mt-3 font-semibold text-[#50D2C1]">{message}</p>}
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Register;

*/
