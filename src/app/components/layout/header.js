'use client'

import Link from "next/link"
import { signOut, useSession } from "next-auth/react";


export default function Header(){
  const session = useSession();
  console.log(session);
  const status = session.status;
    return (
        <>
    <header className="flex items-center justify-between">
      
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="">
          AMIFA
        </Link>
        <Link href={''}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
        
      </nav>
      <nav>
        {status === 'authenticated' && (
          <button onClick={() => signOut()}
             className="bg-primary rounded-full text-white px-8 py-2">
          Log out
        </button>
        )}
        { status === 'unauthenticated' && (
           <> 
            <Link href={'/login'} className="rounded-ful px-4 py-2">
              Login
            </Link>
            <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
              Reister
            </Link>
           </>
        )
        }
      </nav>
    </header>
    </>
    )
}