'use client'

import { useEffect, useState } from "react";
import { useProfile } from "../components/useProfile";
import UserTabs from "../components/layout/userTabs";
import Link from "next/link";
import Right from "../components/icons/right";


export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    })

    if(loading){
        return 'Loading User data ....'
    }
    if(!data.admin){
        return 'You are not an admin'
    }


    return (
         <section className="mt-8 max-w-md mx-auto">
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
                {menuItems?.length > 0 && menuItems.map(item => (
                    // eslint-disable-next-line react/jsx-key
                    <Link className=" button mb-1" href={`/menu-items/edit/`+item._id}>
                        {item.itemName}
                    </Link>
                ))}
            </div>

         </section>
    );
}
