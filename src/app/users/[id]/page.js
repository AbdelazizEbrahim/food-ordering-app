'use client';
import UserForm from "@/components/layout/userForm";
import UserTabs from "@/components/layout/userTabs";
import { useProfile } from "@/components/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    fetch('/api/profile?_id=' + id)
      .then(res => res.json())
      .then(user => {
        setUser(user);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
  
    const { _id, ...dataToUpdate } = data;  
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/profile?_id=${_id}`, {  
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id, ...dataToUpdate }),  
        });
  
        if (res.ok) {
          resolve();
        } else {
          reject(new Error('Failed to save the user'));
        }
      } catch (error) {
        reject(error);
      }
    });
  
    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved successfully',
      error: 'Error saving user',
    });
  }
  
  if (loading) {
    return 'Loading user profile...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl" data-aos="fade-up"> {/* Add AOS animation here */}
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
