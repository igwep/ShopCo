'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, googleProvider } from '@/app/Firebase';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, /* signOut */ } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/Firebase';


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
      // create firestore user document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        displayName: '', // You can set a default display name or leave it empty
        phone:'',
        address: '',
        profilePicture: '', // You can set a default profile picture URL or leave it empty
        isAdmin: false, // Set to true if the user is an admin
        isVerified: false, // Set to true if the user is verified
        // Add any other fields you want to store
      })


      // Send email verification
      await sendEmailVerification(user);
      /* router.push('/'); // Redirect to home page after signup */

    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setEmailVerified(true);
      setLoading(false);
    }
    console.log('Signing up:', { email, password });
  };

  const handleGoogleSignUp = async () => {
    
     try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during Google sign up.');
      }
    }
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
      {emailVerified && (
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
            className="w-full bg-black hover:opacity-90 text-white py-2 rounded-lg transition"
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
