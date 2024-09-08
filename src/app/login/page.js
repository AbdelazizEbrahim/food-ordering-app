'use client';

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState('');

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false, 
        email,
        password,
      });

      if (result.error) {
        setError(result.error || "Invalid email or password");
      } else {
        window.location.href = '/'; // Redirect to home page or dashboard
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }

    setLoginInProgress(false);
  }

  return (
    <section>
      <h1 className='text-center text-primary text-4xl mb-4'>
        Login
      </h1>
      {error && (
        <div className="my-4 text-center text-red-500">
          {error}
        </div>
      )}
      <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
        <input 
          type='email' 
          placeholder='Email' 
          value={email} 
          required
          disabled={loginInProgress}
          onChange={ev => setEmail(ev.target.value)} 
          className="block w-full mb-2"
        />
        <input 
          type='password' 
          placeholder='Password' 
          required
          value={password} 
          disabled={loginInProgress}
          onChange={ev => setPassword(ev.target.value)} 
          className="block w-full mb-4"
        />
        <button 
          type='submit' 
          disabled={loginInProgress} 
          className="block w-full bg-blue-500 text-white py-2"
        >
          {loginInProgress ? "Logging in..." : "Login"}
        </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button 
          className='flex gap-4 justify-center w-full py-2' 
          type="button"
          disabled={loginInProgress}
          onClick={() => signIn('google', {callbackUrl:'/'}) }
        >
          <Image src={'/google.png'} alt={'Google Logo'} width={24} height={24} />
          Login with Google
        </button>
      </form>
      <div className="text-center my-4 text-gray-500 border-t pt-4">
        Don’t have an account?{' '}
        <Link className="underline" href={'/register'}>Register here &raquo;</Link>
      </div>
    </section>
  );
}
