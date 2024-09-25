'use client';

import { useProfile } from "@/app/components/useProfile";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import Left from "@/app/components/icons/left";
import MenuItemsForm from "@/app/components/layout/menuItemForm";
import toast from 'react-hot-toast';
import { useState } from "react";
import { redirect } from "next/navigation";
import UserTabs from "@/app/components/layout/userTabs";

export default function NewMenuItem() {

    const router = useRouter(); 
    const { loading, data } = useProfile();
    const [load, setLoad] = useState(false);
    const [menuItemId, setMenuItemId] = useState(null);

    if (loading) {
        return 'Loading user data...';
    }

    async function handleSubmit(event, formData) {
        setLoad(true);
        event.preventDefault();
        
        
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
    
            setLoad(false);
            if (response.ok) {
                const result = await response.json();
                setMenuItemId(result._id);
                resolve();
            } else {
                reject();
            }
        });
    
        await toast.promise(savingPromise, {
            loading: 'Saving menu item...',
            success: 'Menu item saved!',
            error: 'Error saving menu item',
        });
    
        // Redirect after successful form submission
        router.push('/menu-items'); // Use router.push for navigation
    }

    if(loading){
        return 'Loading Menu items form ....'
    }
    if(!data.admin){
        return 'You are not an admin'
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={data.admin} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                   <Left/>
                   <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemsForm onSubmit={handleSubmit} menuItem={null} />
        </section>
    );
}
