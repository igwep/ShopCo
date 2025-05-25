'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: Handle signup logic here
    console.log('Signing up:', { email, password });
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign-up logic
    console.log('Google Sign-Up');
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
          <p className="text-sm text-gray-500">Create your account</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:opacity-90 text-white py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign-Up Placeholder */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Or continue with</p>
          <button
            onClick={handleGoogleSignUp}
            className="flex items-center gap-2 justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <Image
              width={30}
              height={25}
              src="/SVG/icons8-google (1).svg"
              alt="Google"
              className="h-auto"
            />
            <span className="text-sm">Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
