'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function  UserTabs(isAdmin) {
    const pathName = usePathname();

    return(
        <div className="flex mx-auto gap-2 tabs justify-center">
          <Link 
            className={pathName === '/profile' ? 'active' : ''}
            href={'/profile'}>
            Profile
            </Link>
            {isAdmin &&(
                <>
                  <Link 
                    className={pathName ==='/categories' ? 'active' : ''}
                    href={'/categories'}>
                    Categories
                    </Link>
                  <Link 
                     className={pathName ==='/menu-items' ? 'active' : ''}
                     href={'/menu-items'}> 
                     Menu Items
                  </Link>
                  <Link 
                     className={pathName ==='/users' ? 'active' : ''}
                     href={'/users'}> 
                     Users 
                  </Link>
                </>
            )}
        </div>
    )
}