'use client'

import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import ShoppingCart from "../icons/ShoppingCart";

export default function Header(){
  const session = useSession();
  console.log(session);
  const status = session.status;
  const userData = session.data?.user;
  const {cartProducts} = useContext(CartContext);
  let userName = userData?.name || userData?.email;

  if (userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }
    return (
        <>
    <header className="flex items-center justify-between">
      
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="">
          AMIFA
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'#about'}>About</Link>
        <Link href={'#contact'}>Contact</Link>
        
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'authenticated' && (
        <>
          <Link href={'/profile'} className="whitespace-nowrap ">
            Hello, {userName}
          </Link>
          <button onClick={() => signOut()}
             className="bg-primary rounded-full text-white px-8 py-2">
            Log out
          </button>

        </>
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
        {cartProducts?.length > 0 && (
          <Link href={'/cart'}>
            <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute top-3 right-48 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
            </span>
            )}
          </Link>
        )}
      </nav>
    </header>
    </>
    )
}