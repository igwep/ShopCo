'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, googleProvider } from '@/app/Firebase';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, /* signOut */ } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/Firebase';
import { toast } from 'react-hot-toast';


export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState('');

  //signOut(auth);
  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: serverTimestamp(),
      displayName: '',
      phone: '',
      address: '',
      profilePicture: '',
      isAdmin: false,
      isVerified: false,
      items: [],
    });

    // Send email verification
    await sendEmailVerification(user);

    // Optional: you can show a toast or message here
    toast.success('Account created! Please check your email to verify your account.');

    // Don't redirect yet if waiting for email verification
    setEmailVerified(true);

  } catch (error: any) {
    console.error('Signup error:', error);

    let message = 'Failed to create an account. Please try again.';

    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already in use.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email format.';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/operation-not-allowed') {
      message = 'Email/password accounts are not enabled.';
    }

    toast.error(message);
    setError(message);
  } finally {
    setLoading(false);
  }

  console.log('Signing up:', { email, password });
};


  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
     try {
     const result = await signInWithPopup(auth, googleProvider);
     const user = result.user;
     // check if user already exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create Firestore document if new user
      await setDoc(userRef, {
        email: user.email,
        createdAt: serverTimestamp(),
        displayName: user.displayName || '',
        phone: user.phoneNumber || '',
        address: '',
        profilePicture: user.photoURL || '',
        isAdmin: false,
        isVerified: true, // Google users are usually considered verified
        items: [], // Initialize with an empty array for cart items
      });
    }

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during Google sign up.');
      }
    }
    setLoading(false);
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
        <h1 className='text-red-400 p-4'>{error}</h1>
{emailVerified && !error && (
  <p className="text-sm text-green-500 mb-4">
    A verification email has been sent to {email}. Please check your inbox.{' '}
    <a href="/" className="text-black underline hover:opacity-90">
      Go to Home
    </a>
  </p>
)}



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

         <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        Confirm Password
      </label>
      <div className="relative">
        <input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(prev => !prev)}
          className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
        >
          {showConfirmPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition ${
    loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-black hover:opacity-90 text-white cursor-pointer'
  }`}
          >
         {loading ? 'Creating Account...' : 'Sign Up'}
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
         <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an Account?{' '}
            <Link href="/login" className="text-black font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
