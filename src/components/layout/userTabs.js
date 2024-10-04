'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function  UserTabs(isAdmin) {
    const pathName = usePathname();
    
    return(
        <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
          <Link 
            className={pathName === '/profile' ? 'active' : ''}
            href={'/profile'}>
            Profile
            </Link>
            {isAdmin.isAdmin &&(
                <>
                  <Link 
                    className={pathName ==='/category' ? 'active' : ''}
                    href={'/category'}>
                    Categories
                    </Link>
                  <Link 
                     className={pathName.includes('/menu-items') ? 'active' : ''}
                     href={'/menu-items'}> 
                     Menu Items
                  </Link>
                  <Link 
                     className={pathName.includes('/users') ? 'active' : ''}
                     href={'/users'}> 
                     Users 
                  </Link>
                </>
            )}
            <Link 
                className={pathName ==='/orders' ? 'active' : ''}
                href={'/orders'}> 
                Order 
            </Link>
        </div>
    )
}