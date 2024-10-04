'use client';

import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import UserTabs from "@/components/layout/userTabs";
import toast from 'react-hot-toast';
import Link from "next/link";
import Left from "@/components/icons/left";
import { useParams } from "next/navigation";
import MenuItemsForm from "@/components/layout/menuItemForm";
import DeleteButton from "@/components/DeleteButton";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

export default function EditMenuPage() {
    const { id } = useParams();
    const router = useRouter();
    const { loading, data } = useProfile();
    const [load, setLoad] = useState(false);
    const [menuItem, setMenuItem] = useState(null);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a 1000ms animation duration
    }, []);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
          res.json().then(items => {
            const item = items?.find(i => i._id === id);
            setMenuItem(item);
            console.log("Menu item to update: ", item);
          });
        });
    }, [id]);
    
    async function handleDeleteClick() {    
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            });
    
            if (res.ok) {
                resolve();
            } else {
                reject();
            }
        });
    
        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        });
    
        router.push('/menu-items'); 
    }

    async function handleSubmit(event, data) {
        event.preventDefault();
        setLoad(true);    
        data = { ...data, _id: id };
        
        console.log('Data to be sent to the API: ', data);
        
        try {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
    
            setLoad(false);
    
            if (response.ok) {
                const result = await response.json();
                console.log('Menu item saved successfully: ', result);
                
                toast.success('Menu item saved!');
    
                router.push('/menu-items'); 
            } else {
                console.log('Error saving menu item: ', response.statusText);
                toast.error('Error saving menu item');
            }
        } catch (error) {
            console.error('Unexpected error: ', error);
            toast.error('Unexpected error');
            setLoad(false);
        }
    }

    if (loading) {
        return 'Loading menu item edit form...';
    }

    if (!data.admin) {
        return 'You are not an admin';
    }

    return (
        <section className="mt-8" data-aos="fade-in"> {/* AOS applied to the section */}
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8" data-aos="fade-right"> {/* AOS applied to the link */}
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <div data-aos="fade-up"> {/* AOS applied to the form */}
                <MenuItemsForm 
                    onSubmit={handleSubmit} 
                    menuItem={menuItem} 
                />
            </div>
            <div className="max-w-md mx-auto mt-2" data-aos="fade-left"> {/* AOS applied to the delete button */}
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton
                        label="Delete this menu item"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    );
}
