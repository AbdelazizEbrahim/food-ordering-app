'use client'

import { SessionProvider } from "next-auth/react"
export function AppProvider({children}){
    return (
        <SessionProvider>{children}</SessionProvider>
    );
}


