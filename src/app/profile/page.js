'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import UserTabs from '../../components/layout/userTabs';
import UserForm from '../../components/layout/userForm';
import 'aos/dist/aos.css';  // Import AOS styles
import AOS from 'aos';

export default function ProfilePage() {
    const { data: session, status } = useSession();    
    const [user, setUser] = useState(null);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        // Initialize AOS with options
        AOS.init({
            duration: 1000,  // Duration of animation in ms
            once: true,      // Whether animation should happen only once
        });

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
        <section className="mt-8" data-aos="fade-up">
            <UserTabs isAdmin={isAdmin} data-aos="fade-right" />
            <div className="max-w-2xl mx-auto mt-8" data-aos="zoom-in">
                {user ? (
                    <UserForm user={user} onSave={handleProfileUpdate} />  
                ) : (
                    <p>Loading user profile...</p>  
                )}
            </div>
        </section>
    );
}
