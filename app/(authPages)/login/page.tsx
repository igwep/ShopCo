'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/app/Firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    const message = 'Email and password are required';
    toast.error(message);
    setError(message);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Logged in successfully!');
    setEmail('');
    router.push('/');
  } catch (error: unknown) {
    console.error('Login error:', error);

    let message = 'Failed to log in. Please try again.';

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof (error as { code: unknown }).code === 'string'
    ) {
      const code = (error as { code: string }).code;
      if (code === 'auth/user-not-found') {
        message = 'User not found. Please check your email.';
      } else if (code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      } else if (code === 'auth/invalid-email') {
        message = 'Invalid email format.';
      } else if (code === 'auth/invalid-credential') {
        message = 'Wrong email or password. Please try again.';
      } else if (code === 'auth/too-many-requests') {
        message = 'Too many login attempts. Please try again later.';
      }
    }

    toast.error(message);
    setError(message);
  } finally {
    setLoading(false);
  }
};

 const handleGoogleSignIn = async () => {
  setLoading(true);
  setError(null);

  try {
    await signInWithPopup(auth, googleProvider);
    toast.success('Logged in with Google successfully!');
    router.push('/');
  } catch (error: unknown) {
    console.error('Google Sign-In error:', error);

    let message = 'Failed to log in with Google. Please try again.';

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof (error as { code: unknown }).code === 'string'
    ) {
      const code = (error as { code: string }).code;
      if (code === 'auth/popup-closed-by-user') {
        message = 'Google sign-in was canceled.';
      } else if (code === 'auth/cancelled-popup-request') {
        message = 'Another popup is already open.';
      }
    }

    toast.error(message);
    setError(message);
  } finally {
    setLoading(false);
    setEmail('');
  }
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
         <h1 className='text-red-400 p-4'>{error}</h1>

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
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>

         <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded-lg transition ${
    loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-black hover:opacity-90 text-white cursor-pointer'
  }`}
>
  {loading ? 'Logging in to Account...' : 'Sign Up'}
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
