'use client';
import UserForm from "@/app/components/layout/userForm";
import UserTabs from "@/app/components/layout/userTabs";
import { useProfile } from "@/app/components/useProfile";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const {loading, data} = useProfile();
  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    console.log("idd: ", id);
    fetch('/api/profile?_id=' + id)
      .then(res => {
        // console.log("Response object:", res); 
        return res.json();
      })
      .then(user => {
        setUser(user);
        // console.log("Parsed user data:", user); 
      })
      .catch(error => {
        console.error("Fetch error:", error); 
      });
  }, [id]); 

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
  
    console.log("updating data: ", data);
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
  
  

<<<<<<< HEAD
  if (loading) {
    return 'Loading Edit form...';
  }

  if (!data.admin) {
    return 'You are Not an admin';
  }
=======
  // if (loading) {
  //   return 'Loading user profile...';
  // }

  // if (!data.admin) {
  //   return 'Not an admin';
  // }
>>>>>>> a88840aae76b25c17c8f09491e63bcd31a0c8df8

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}