'use client'

import { useEffect, useState } from "react";
import { useProfile } from "../../components/useProfile";
import UserTabs from "../../components/layout/userTabs";
import Link from "next/link";
import Right from "../../components/icons/right";
import Image from "next/image";


export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(menuItems => setMenuItems(menuItems))
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }, []);
    

    if(loading){
        return 'Loading Menu items list ....'
    }
    if(!data.admin){
        return 'You are not an admin'
    }


    return (
         <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link 
                    href={'/menu-items/new'} 
                    className="button flex">
                    Create new menu item 
                    <Right/>
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit Menu Item: </h2>
                <div className="grid grid-cols-3 gap-2">
                {menuItems?.length > 0 && menuItems.map(item => (
                    // eslint-disable-next-line react/jsx-key
                    <Link 
                        className=" rounded-lg p-4 bg-gray-200 flex-col" href={`/menu-items/edit/`+item._id}>
                        <div className="relative">
                            <Image 
                                className='rounded-md object-cover'  // Use object-cover to maintain aspect ratio and cover the container
                                src={item.image} 
                                alt={''} 
                                width={150} 
                                height={150} 
                                style={{ width: '180px', height: '180px' }}  // Ensure fixed dimensions
                            />
                        </div>

                        <div className="text-center">
                            {item.itemName}
                        </div>
                        <div>
                        <p className='text-gray-500 text-sm line-clamp-3 '>{item.description}</p>
                        </div>
                    </Link>
                ))}
                </div>

            </div>

         </section>
    );
}
