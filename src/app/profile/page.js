'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import UserTabs from '../components/layout/userTabs';
import UserForm from '../components/layout/userForm';

export default function ProfilePage() {
    const { data: session, status } = useSession();    
    const [user, setUser] = useState(null);  // Initialize as null
    const [profileUpdated, setProfileUpdated] = useState(false);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        fetch('/api/profile')
            .then(response => response.json())
            .then(data => {
                setUser(data);  
                setIsAdmin(data.admin);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    async function handleProfileUpdate(ev, updatedData) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            
            if (response.ok) {
                setProfileUpdated(true);
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving profile...',
            success: 'Profile saved successfully!',
            error: 'Error updating profile',
        });
    }

    if (status === 'loading') {
        return 'Loading Profile Information... ';
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                {user ? (
                    <UserForm user={user} onSave={handleProfileUpdate} />  
                ) : (
                    <p>Loading user profile...</p>  
                )}
            </div>
        </section>
    );
}
