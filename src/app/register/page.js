'use client'

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Add confirm password state
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState('');
    
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError('');
        setUserCreated(false);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match'); // Set error message if passwords don't match
            setCreatingUser(false);
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' } // Fixed header typo
        });

        if (response.ok) {
            setUserCreated(true);
        } else {
            setError('An error has occurred. Please try again later.');
        }
        setCreatingUser(false);
    }

    return (
        <section className="mt-16">
            <h1 className='text-center text-primary text-4xl mb-4'>
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
               </div>
            )}
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
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)} 
                    className="block w-full mb-2"
                />
                <input 
                    type='password' 
                    placeholder='Password' 
                    value={password}
                    disabled={creatingUser}
                    onChange={ev => setPassword(ev.target.value)} 
                    className="block w-full mb-2"
                />
                <input 
                    type='password' 
                    placeholder='Confirm Password' 
                    value={confirmPassword}
                    disabled={creatingUser}
                    onChange={ev => setConfirmPassword(ev.target.value)} 
                    className="block w-full mb-4"
                />
                <button 
                    type='submit' 
                    disabled={creatingUser} 
                    className="block w-full bg-primary text-white py-2"
                >
                    Register
                </button>
                <div className='my-4 text-center text-gray-500'>
                    or login with provider
                </div>
                <button
                    onClick={() => signIn('google', {callbackUrl:'/'})}
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
               </div>
            </form>
        </section>
    )
}
