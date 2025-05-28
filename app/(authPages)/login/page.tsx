'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
//import { auth, googleProvider } from '@/app/Firebase';
//import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle login logic here
    console.log('Logging in:', { email, password });
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log('Google Sign-In');
  };

  return (
    <div className="min-h-screen flex items-center font-fancyFont justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md">
        {/* Logo Area */}
        <div className="mb-6 text-center items-center flex flex-col space-y-4 justify-center">
          <Image
            width={130}
            height={120}
            src="/SVG/SHOP.CO.svg"
            alt="logo"
            className="w-36 h-auto"
          />
          <p className="text-sm text-gray-500">Log in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-black hover:opacity-90 text-white py-2 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Google Sign-In Placeholder */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Or continue with</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 justify-center w-full border border-gray-300 rounded-lg py-2 cursor-pointer hover:bg-gray-50 transition"
          >
            <Image
              width={30}
              height={25}
              src="/SVG/icons8-google (1).svg"
              alt="logo"
              className="h-auto"
            />
            <span className="text-sm">Sign in with Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
