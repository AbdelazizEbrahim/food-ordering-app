// 'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

export default function UserTabs({ isAdmin }) {  
    const pathName = usePathname();

    // Initialize AOS when the component is mounted
    useEffect(() => {
        AOS.init({
            duration: 800,  // Animation duration
            easing: 'ease-in-out', // Easing function
            once: true,  // Whether animation should happen only once
        });
    }, []);

    return(
        <div className="mt-12 flex mx-auto gap-2 tabs justify-center flex-wrap">
            <Link
                className={pathName === '/profile' ? 'active' : ''}
                href={'/profile'}
                data-aos="fade-down"  // AOS animation
            >
                Profile
            </Link>
            {isAdmin && (
                <>
                    <Link
                        className={pathName === '/category' ? 'active' : ''}
                        href={'/category'}
                        data-aos="fade-left"  // AOS animation
                    >
                        Categories
                    </Link>
                    <Link
                        className={pathName.includes('/menu-items') ? 'active' : ''}
                        href={'/menu-items'}
                        data-aos="fade-left"  // AOS animation
                    >
                        Menu Items
                    </Link>
                    <Link
                        className={pathName.includes('/users') ? 'active' : ''}
                        href={'/users'}
                        data-aos="fade-left"  // AOS animation
                    >
                        Users
                    </Link>
                </>
            )}
            <Link
                className={pathName === '/orders' ? 'active' : ''}
                href={'/orders'}
                data-aos="fade-right"  // AOS animation
            >
                Order
            </Link>
        </div>
    )
}
